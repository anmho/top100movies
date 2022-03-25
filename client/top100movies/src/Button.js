function Button({ label, onButtonClicked, margin }) {
  return (
    <button
      onClick={onButtonClicked}
      className={`btn btn-primary ${margin}`}
    >
      {label}
    </button>
  );
}

export default Button;
