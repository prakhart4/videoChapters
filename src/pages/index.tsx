import videojs from "video.js";
import "video.js/dist/video-js.css";
import React, { useMemo } from "react";

export default function Home() {
  const videoRef = React.useRef<any>(null);

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

      const player = videojs(video, options, () => {
        console.log("Player is ready");
      });

      return () => {
        console.log("cleanup");
        if (player && !player.isDisposed()) {
          player.dispose();
        }
      };
    }
  }, [options]);

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
