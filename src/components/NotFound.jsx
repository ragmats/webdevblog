import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="error">
      <h1>Page not found!?</h1>
      <img className="error-image" src="/img/error.jpg" />
      <h2>
        It's okay. You'll figure it <Link to="/">out</Link>.
      </h2>
    </div>
  );
}
