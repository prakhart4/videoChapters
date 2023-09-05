import { Inter } from "next/font/google";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import React, { useMemo } from "react";
import Player from "video.js/dist/types/player";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const videoRef = React.useRef<any>(null);
  const playerRef: React.MutableRefObject<Player | null> = React.useRef(null);

  const options = useMemo(
    () => ({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      userActions: {
        hotkeys: true,
      },
      sources: [
        {
          src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          type: "video/mp4",
        },
      ],
    }),
    []
  );

  React.useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      playerRef.current = videojs(video, options, () => {
        console.log("Player is ready");
      });
    }
  }, [options, playerRef]);

  return (
    <>
      <br />
      <h2>Chapters demo</h2>
      <br />
      <div style={{ width: "70vw", margin: "auto" }}>
        <video ref={videoRef} className="video video-js">
          <track kind="chapters" src={"./storyboard.vtt"} />
        </video>
      </div>
    </>
  );
}
