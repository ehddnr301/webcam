import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  border: 1px solid #f39c12;
  border-radius: 20px;
`;

const Video = styled.video`
  transform: scaleX(-1);
  width: 60%;
  height: 80%;
  padding: 10px;
  margin-right: 10px;
`;

const TextBox = styled.div`
  color: #f39c12;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:not(:last-child) {
    margin-bottom: 15px;
  }
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

  return (
    <>
      <Container>
        <Video ref={videoEl} />
        <TextBox>
          <div>마스크상태</div>
          <div>착용</div>
          <div>미착용</div>
        </TextBox>
      </Container>
    </>
  );
}
