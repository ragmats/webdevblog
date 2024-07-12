export default function Footer() {
  const date = new Date();
  console.log("vite base url from footer", import.meta.env.VITE_BASE_URL);
  return (
    <div className="footer-container">
      <div className="footer-photo-container">
        <img
          className="footer-photo"
          alt="Code cat in hoodie fast asleep at desk."
          src={`${import.meta.env.VITE_BASE_URL}img/asleep.jpg`}
        ></img>
      </div>
      Copyright {date.getFullYear()} Steven Coy
    </div>
  );
}
