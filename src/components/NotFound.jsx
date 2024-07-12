import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="error">
      <h1>Page not found!?</h1>
      <img
        className="error-image"
        alt="Code cat in hoodie in shock at error found!"
        src={`${import.meta.env.VITE_BASE_URL}img/error.jpg`}
      />
      <h2>
        It's okay. You'll figure it <Link to="/">out</Link>.
      </h2>
    </div>
  );
}
