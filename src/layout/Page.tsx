import { useState } from "react";
import { PrimaryButton } from "../components/Button/PrimaryButton";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Modal } from "../components/Modal/Modal";
import { ModalContent } from "./ModalInputForm";

const App = function () {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Main>
        <h1 className="text-xl font-bold m-auto">
          A better way to enjoy every day
        </h1>
        <PrimaryButton
          className="w-48 m-auto mt-6"
          onClick={() => {
            setOpen(true);
          }}
        >
          AAA
        </PrimaryButton>
      </Main>
      <Footer />
      <Modal
        open={open}
        toggle={() => {
          setOpen((prevOpen) => !prevOpen);
        }}
      >
        <ModalContent />
      </Modal>
    </div>
  );
};

export default App;
