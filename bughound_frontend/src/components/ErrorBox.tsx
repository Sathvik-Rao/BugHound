interface PropsErrorBox {
  errorMessage: string;
  handleErrorMessageClose: () => void;
}
const ErrorBox = ({ errorMessage, handleErrorMessageClose }: PropsErrorBox) => {
  return (
    <div
      className="alert alert-danger d-flex justify-content-between align-items-center"
      role="alert"
    >
      <div>{errorMessage}</div>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={handleErrorMessageClose}
      ></button>
    </div>
  );
};

export default ErrorBox;
