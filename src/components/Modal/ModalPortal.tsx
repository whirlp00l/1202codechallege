import ReactDOM from "react-dom";

interface Props {
  target: string;
}

export const ModalPortal: React.FC<Props> = ({ children, target }) => {
  const el = document.getElementById(target);
  return el && ReactDOM.createPortal(children, el);
};
