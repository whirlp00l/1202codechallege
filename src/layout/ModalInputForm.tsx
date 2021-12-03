import React, { useState } from "react";
import { PrimaryButton } from "../components/Button/PrimaryButton";
import { TextInput } from "../components/TextInput/TextInput";
import { Toast } from "../components/Toast/Toast";
import { postData } from "../utils/postData";

const EMAIL_VALIDATOR =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const API_ENDPOINT =
  "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

export const ModalContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [succeed, setSucceed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return succeed ? (
    <h1>Success</h1>
  ) : (
    <React.Fragment>
      {error && (
        <Toast
          title="Request error:"
          message={error}
          onClose={() => {
            setError("");
          }}
        />
      )}
      <form className="bg-white rounded mx-auto sm:max-w-lg space-y-2">
        <TextInput
          label="Full name"
          id="name"
          value={name}
          validator={(value) => {
            if (!value) {
              return undefined;
            }
            return value.length < 3 ? "Please input your full name" : undefined;
          }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextInput
          label="Email"
          id="email"
          value={email}
          validator={(value) => {
            if (!value) {
              return undefined;
            }
            return EMAIL_VALIDATOR.test(value)
              ? undefined
              : "Please input a valid email address";
          }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextInput
          label="Email confirm"
          id="confirmEmail"
          value={confirmEmail}
          validator={(value) => {
            if (!value) {
              return undefined;
            }
            return value !== email
              ? "Please input the same email address with Email input"
              : undefined;
          }}
          onChange={(e) => {
            setConfirmEmail(e.target.value);
          }}
        />
        <PrimaryButton
          className="w-full !mt-4"
          disabled={
            name.length <= 3 ||
            !EMAIL_VALIDATOR.test(email) ||
            confirmEmail !== email ||
            submitting
          }
          onClick={(e) => {
            e.preventDefault();
            setSubmitting(true);
            postData(API_ENDPOINT, { name, email })
              .then(
                () => {
                  setSucceed(true);
                },
                (rejectedResponse) => {
                  setError(rejectedResponse.errorMessage);
                  setSucceed(false);
                }
              )
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {submitting ? "Submitting" : "Submit"}
        </PrimaryButton>
      </form>
    </React.Fragment>
  );
};
