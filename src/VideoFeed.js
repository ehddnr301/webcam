import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Video = styled.video`
  transform: scaleX(-1);
`;

export function VideoFeed() {
  const videoEl = useRef(null);

  useEffect(() => {
    if (!videoEl) {
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      let video = videoEl.current;
      video.srcObject = stream;
      video.play();
    });
  }, [videoEl]);

  return <Video ref={videoEl} />;
}
