import React from "react";
import { VideoFeed } from "./VideoFeed";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const Reset = createGlobalStyle`
   ${reset};
   * {
        box-sizing:border-box;
    }
    body{
      background-color:black;
    }
`;

function App() {
  return (
    <>
      <Reset />
      <div className="App">
        <VideoFeed />
      </div>
    </>
  );
}

export default App;
