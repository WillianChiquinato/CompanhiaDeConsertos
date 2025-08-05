import "./styles.css";

export default function AlertMessage({ message, type = "error" }) {
  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  );
}
