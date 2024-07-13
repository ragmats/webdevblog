import { Link } from "react-router-dom";
export default function CubeHeader() {
  return (
    <div className="title-container">
      <div className="cube-container">
        <div className="face face-top">
          Steven Coy
          <br />
          Web Developer
        </div>
        <div className="face face-left">
          Web Apps, Components, Games, Design, Front-End
        </div>
        <div className="face face-front">
          JavaScript, HTML, CSS, React, Next.js, Python, Django, Flask, Git
        </div>
        <div className="face face-back"></div>
        <div className="face face-right"></div>
        <div className="face face-bottom"></div>
      </div>
    </div>
  );
}
