import { useState } from "react";
import { PrimaryButton } from "../components/Button/PrimaryButton";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Modal } from "../components/Modal/Modal";
import { ModalContent } from "./ModalContent";

const Page = function () {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Main>
        <h2 className="text-xl font-bold m-auto">
          A better way to enjoy every day
        </h2>
        <p className="font-normal m-auto max-w-3/5">
          There are a large number of entities defined by the ISO, covering most
          languages and symbols for publishing and mathematics. Requiring all
          browsers to support these would be impractical, e.g. how should a dumb
          terminal show such symbols. In some cases there will be accepted ways
          of mapping them to normal characters, e.g. æ as ae and è as e. Perhaps
          the safest recommendation is that where authors need to use a
          specialised character or symbol, they should use ISO entity names
          rather than inventing their own. Browsers should leave unrecognised
          entity names untranslated.
        </p>
        <PrimaryButton
          className="w-48 m-auto mt-6"
          onClick={() => {
            setOpen(true);
          }}
        >
          Subscribe
        </PrimaryButton>
      </Main>
      <Footer />
      <Modal open={open} toggle={toggleModal} title="Subscribe modal panel">
        <ModalContent toggle={toggleModal} />
      </Modal>
    </div>
  );
};

export default Page;
