import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./style.scss";
import introductionVideo from "../../assets/videos/introduction.mp4";
import { FaPlay } from "react-icons/fa";
import { Fade } from "react-awesome-reveal"; // Import the animation

const ProjectOverview = () => {
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleButtonClickToSubOptions = () => {
    const subOptions = document.getElementById("sub-options");
    if (subOptions) {
      subOptions.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Fade triggerOnce>
      {" "}
      {/* Apply the animation */}
      <div className="project-overview-section">
        <div className="description-container">
          <h3>Check What's Going On!</h3>
          <p>
            Our product champions renewable energy adoption in Victoria,
            targeting eco-aware Greater Melbourne households aged 30-50. We
            educate and empower users towards a sustainable future. With a
            global rise of over 260 GW in renewable energy annually, we're
            committed to making Victoria a leader in sustainable growth.
          </p>
          <button
            className="button-description"
            onClick={handleButtonClickToSubOptions}
          >
            Learn More
          </button>
        </div>
        <div className="video-container" onClick={handlePlayPause}>
          <ReactPlayer
            url={introductionVideo}
            controls={false}
            playing={playing}
            width="100%"
            height="100%"
          />
          {!playing && (
            <div className="play-button">
              <FaPlay />
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default ProjectOverview;
