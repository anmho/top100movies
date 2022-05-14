import styles from "./styles/Button.module.css";

function Button({ label, onButtonClicked, className }) {
  return (
    <button
      onClick={onButtonClicked}
      className={`btn btn-primary ${styles[className]}`}
    >
      {label}
    </button>
  );
}

export default Button;
