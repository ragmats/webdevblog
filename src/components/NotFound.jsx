import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="error">
      <h1>Page not found!?</h1>
      <img className="error-image" src="/img/error.jpg" />
      <h2>
        It's okay. There is always <Link to="/">home</Link>.
      </h2>
    </div>
  );
}
