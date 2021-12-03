import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ModalContent } from "./ModalContent";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post(
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
    (req, res, ctx) => {
      return res(ctx.json({ greeting: "hello there" }));
    }
  )
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test("test modal content layout", async () => {
  const toggleFn = jest.fn();
  const { container } = render(<ModalContent toggle={toggleFn}></ModalContent>);
  expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Email confirm")).toBeInTheDocument();
  expect(screen.getByText("Submit")).toBeInTheDocument();
  expect(screen.getByText("Submit")).toHaveProperty("disabled");

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("test modal input vaidation", async () => {
  const toggleFn = jest.fn();
  const { container } = render(<ModalContent toggle={toggleFn}></ModalContent>);
  userEvent.type(screen.getByLabelText("Full name"), "ab");
  expect(
    await screen.findByText("Name must be more than 3 letters")
  ).toBeInTheDocument();

  userEvent.type(screen.getByLabelText("Email"), "invalid email");
  expect(
    await screen.findByText("Please input a valid email address")
  ).toBeInTheDocument();

  expect(
    (
      await screen.findByText("Submit", undefined, { timeout: 1000 })
    ).getAttribute("disabled")
  ).toBe("");
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("test modal input vaidation pass", async () => {
  const toggleFn = jest.fn();
  const { container } = render(<ModalContent toggle={toggleFn}></ModalContent>);
  userEvent.type(screen.getByLabelText("Full name"), "abcde");
  userEvent.type(screen.getByLabelText("Email"), "validemail@email.com");
  userEvent.type(
    screen.getByLabelText("Email confirm"),
    "validemail@email.com"
  );

  expect(
    (
      await screen.findByText("Submit", undefined, { timeout: 1000 })
    ).getAttribute("disabled")
  ).not.toBe("");

  userEvent.type(
    screen.getByLabelText("Email confirm"),
    "validemail@email.com"
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("test fetch success", async () => {
  const toggleFn = jest.fn();
  const { container } = render(<ModalContent toggle={toggleFn}></ModalContent>);
  userEvent.type(screen.getByLabelText("Full name"), "abcde");
  userEvent.type(screen.getByLabelText("Email"), "validemail@email.com");
  userEvent.type(
    screen.getByLabelText("Email confirm"),
    "validemail@email.com"
  );

  userEvent.click(screen.getByText("Submit"));

  await waitFor(() =>
    expect(screen.getByText("Submission Success")).toBeInTheDocument()
  );

  userEvent.click(screen.getByText("Dismiss"));
  expect(toggleFn).toBeCalled();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("test fetch failure", async () => {
  server.use(
    rest.post(
      "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
      (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ errorMessage: "Server Error Testing" })
        );
      }
    )
  );

  const toggleFn = jest.fn();
  const { container } = render(<ModalContent toggle={toggleFn}></ModalContent>);
  userEvent.type(screen.getByLabelText("Full name"), "abcde");
  userEvent.type(screen.getByLabelText("Email"), "validemail@email.com");
  userEvent.type(
    screen.getByLabelText("Email confirm"),
    "validemail@email.com"
  );

  userEvent.click(screen.getByText("Submit"));

  await waitFor(() => expect(screen.queryByRole("alert")).toBeInTheDocument());
  expect(screen.getByText("Server Error Testing")).toBeInTheDocument();
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
