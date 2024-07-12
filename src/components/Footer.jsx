export default function Footer() {
  const date = new Date();
  return (
    <div className="footer-container">
      <div className="footer-photo-container">
        <img
          className="footer-photo"
          alt="Code cat in hoodie fast asleep at desk."
          src="/img/asleep.jpg"
        ></img>
      </div>
      Copyright {date.getFullYear()} Steven Coy
    </div>
  );
}
