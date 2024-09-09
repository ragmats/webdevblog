import SectionHeader from "./SectionHeader";

export default function Profile({ theme }) {
  return (
    <>
      <div className="jump-link" id="profile">
        {/* <h2 id="profile">#hi</h2> */}
        <SectionHeader
          remixIconName="RiThumbUpLine"
          headerText="hi"
          theme={theme}
        />
      </div>
      <div className="profile">
        <div className="profile-photo-container">
          <img
            className="profile-photo"
            alt="Code cat in hoodie working hard late at night."
            src={`${import.meta.env.VITE_BASE_URL}img/profile.jpg`}
          ></img>
        </div>
        <div className="profile-summary">
          <p>
            I’m Steven. I am seeking a Front-End Developer position specializing
            in React.
          </p>
          <p>
            I started building websites as a teenager with HTML and CSS in
            Notepad. These days, I like to make web apps mostly with JavaScript
            and React. While I’ve taken courses like Harvard’s CS50x, my dev
            skills are mostly self-taught.
          </p>
          <p>
            I like being able to have an idea, obsess over it, and bring it to
            life with code. I learn the most when I begin with no clue how to
            make it happen. But once it does, it’s an amazing feeling.
          </p>
          <p>
            This site,{" "}
            <a
              href="https://github.com/ragmats/webdevblog/tree/main/src"
              target="_new"
            >
              which I built with React
            </a>
            , is a sandbox for my dev projects, along with some experiments and
            discussions.
          </p>
          <span>
            &#91;&nbsp;
            <a href="mailto:stevencoy@gmail.com">stevencoy@gmail.com</a>,{" "}
            <a href="https://www.linkedin.com/in/stevenlewiscoy/" target="_new">
              LinkedIn
            </a>
            &nbsp;&#93;
          </span>
        </div>
      </div>
    </>
  );
}
