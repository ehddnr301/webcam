// export function VideoFeed() {
//   const videoEl = useRef(null);

//   useEffect(() => {
//     if (!videoEl) {
//       return;
//     }
//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//       let video = videoEl.current;
//       video.srcObject = stream;
//       video.play();
//     });
//   }, [videoEl]);

//   return (
//     <>
//       <Container>
//         <Video ref={videoEl} />
//         <TextBox>
//           <div>마스크상태</div>
//           <div>착용</div>
//           <div>미착용</div>
//         </TextBox>
//       </Container>
//     </>
//   );
// }
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as faceApi from "face-api.js";

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

const Canvas = styled.canvas``;

export function VideoFeed() {
  const [initial, setInitial] = useState(false);
  const canvasRef = useRef();
  const videoEl = useRef(null);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      let video = videoEl.current;
      videoEl.current.srcObject = stream;
      video.play();
    });
  };
  const handleVideo = async () => {
    setInterval(async () => {
      const detections = await faceApi
        .detectAllFaces(videoEl.current, new faceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detections);
    }, 500);
  };

  useEffect(() => {
    const loadModels = async () => {
      console.log("models");
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitial(true);
      Promise.all([
        faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    };

    loadModels();

    // if (!videoEl) {
    //   return;
    // }
    // navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    //   let video = videoEl.current;
    //   video.srcObject = stream;
    //   video.play();
    // });
    // }, [videoEl]);
  }, []);

  return (
    <>
      <Container>
        <Video ref={videoEl} autoPlay muted onPlay={handleVideo} />
        <Canvas ref={canvasRef} />
        <TextBox>
          <div>마스크상태</div>
          <div>착용</div>
          <div>미착용</div>
        </TextBox>
      </Container>
    </>
  );
}
