import React from "react";
import "./InfoBlocks.scss";

const InfoBlocks = () => {
  const blocksData = [
    {
      title: "Did You Know?",
      content: "Transportation is a major source of carbon emissions.",
      illustration: "assets/images/slider1.png",
    },
    {
      title: "Trees & Carbon",
      content:
        "For every tree cut down, approximately 48 pounds of carbon dioxide is released into the atmosphere.",
      illustration: "assets/images/slider1.png",
    },
    {
      title: "Trees & Carbon",
      content:
        "For every tree cut down, approximately 48 pounds of carbon dioxide is released into the atmosphere.",
      illustration: "assets/images/slider1.png",
    },
    {
      title: "Trees & Carbon",
      content:
        "For every tree cut down, approximately 48 pounds of carbon dioxide is released into the atmosphere.",
      illustration: "assets/images/slider1.png",
    },
    {
      title: "Trees & Carbon",
      content:
        "For every tree cut down, approximately 48 pounds of carbon dioxide is released into the atmosphere.",
      illustration: "assets/images/slider1.png",
    },
    {
      title: "Trees & Carbon",
      content:
        "For every tree cut down, approximately 48 pounds of carbon dioxide is released into the atmosphere.",
      illustration: "assets/images/slider1.png",
    },
    // ... Add the rest of the blocks here
  ];

  return (
    <div className="info-blocks">
      {blocksData.map((block, idx) => (
        <div className={`block ${idx % 2 === 0 ? "left" : "right"}`} key={idx}>
          <div className="text-section">
            <h2>{block.title}</h2>
            <p>{block.content}</p>
          </div>
          <img
            src={block.illustration}
            alt={block.title}
            className="illustration"
          />
        </div>
      ))}
    </div>
  );
};

export default InfoBlocks;
