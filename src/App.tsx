import { PostitDataI } from "./DigitalPostIt";
import DigitalPostIt from "./DigitalPostIt/DigitalPostIt";
import { initPostitArr } from "./common";

function App() {
  return (
    <>
      <div>
        <DigitalPostIt
          imgSrc=""
          postit={initPostitArr()}
          onResult={(data: PostitDataI[][]) => {
            console.log("🚀 ~ data", data);
          }}
        />
      </div>
    </>
  );
}

export default App;
