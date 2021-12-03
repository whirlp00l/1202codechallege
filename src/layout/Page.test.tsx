import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "./Page";
import { axe } from "jest-axe";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

test("test page layout", async () => {
  const { container } = render(<Page></Page>);
  expect(screen.getByText("Brocolli & Co")).toBeInTheDocument();
  expect(screen.getByText("2021 Brocolli & Co")).toBeInTheDocument();
  expect(screen.getByText("Subscribe")).toBeInTheDocument();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("test modal open/close", async () => {
  const { container } = render(<Page></Page>);
  userEvent.click(screen.getByText("Subscribe"));
  expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Email confirm")).toBeInTheDocument();

  const results = await axe(container);
  expect(results).toHaveNoViolations();

  userEvent.click(screen.getByRole("dialog"));
  expect(screen.queryByText("Full name")).not.toBeInTheDocument();
  expect(screen.queryByText("Email")).not.toBeInTheDocument();
  expect(screen.queryByText("Email confirm")).not.toBeInTheDocument();
});
