export default function Profile() {
  return (
    <div className="profile">
      <div className="profile-photo-container">
        <img className="profile-photo" src="img/profile.jpg"></img>
      </div>
      <div className="profile-summary">
        <p>
          Hi. I'm Steven. I started building websites as a teenager with HTML
          and CSS in Notepad. These days, I like to make web apps mostly with
          JavaScript and React. While I've taken courses like Harvard's CS50x,
          my dev skills are largely self-taught.
        </p>
        <p>
          I like being able to have an idea, obsess over it, and bring it to
          life with code. I learn the most when I begin with no clue how to make
          it happen. But once it does, it's kind of amazing.
        </p>
        <p>
          This site,{" "}
          <a
            href="https://github.com/ragmats/webdevblog/tree/main/src"
            target="_new"
          >
            which I built with React
          </a>
          , is a showcase of my coding projects, experiments, and discussions.
        </p>
      </div>
    </div>
  );
}
