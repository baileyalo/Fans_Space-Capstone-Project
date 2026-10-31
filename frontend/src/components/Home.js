import React from "react";

export default function Home() {
  return (
    <div className="page-card home">
      <h2 className="page-title">Fans Space</h2>
      <p>
        A sports fan dApp: teams issue tokens, fans buy after KYC, vote in polls, and transfer tokens to other
        holders.
      </p>
      <div className="video-row">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/rgewGwATU-s"
          title="Fans Space overview"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
