import React from "react";
import { css } from "@emotion/react";
import MiniMap from "../MiniMap";
import {
  PostitItemList,
  DigitalStickerStatusT,
  PostitDataI,
} from "./PostitItemList";
import { DigitalPostItContainer } from "./Components";
import { initPostitArr } from "../common";

interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  postit: PostitDataI[][];
  isMax?: boolean; // select postit count
  status?: DigitalStickerStatusT;
  onClickHandle?: (data: PostitDataI) => void;
  onResult: (data: PostitDataI[][]) => void;
}

const DigitalPostIt = React.memo((props: PropsI) => {
  const {
    onResult,
    onClickHandle,
    isMax,
    imgSrc,
    postit,
    status = "VIEW",
    ...rest
  } = props;

  const initPostitState: PostitDataI[][] = JSON.parse(
    JSON.stringify(initPostitArr())
  );
  const [mainWidth, setMainWidth] = React.useState(window.innerWidth * 4.8);
  const [mainHeight, setMainHeight] = React.useState(
    (window.innerWidth / 3.555555556) * 4.8
  );
  const [postitData, setPostitData] =
    React.useState<PostitDataI[][]>(initPostitState);

  const styleSheet = {
    digitalMain: css`
      width: ${mainWidth}px;
      height: ${mainHeight}px;
    `,
  };

  React.useEffect(() => {
    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
    };
  }, []);

  React.useEffect(() => {
    setPostitData(postit);
  }, [postit]);

  const init = () => {
    const screenWidth = window.innerWidth * 4.8;
    const screenHeight = (window.innerWidth / 3.555555556) * 4.8;
    setMainWidth(screenWidth);
    setMainHeight(screenHeight);
  };

  const onPostitClickHandle = (data: PostitDataI[][]) => {
    setPostitData(data);
    onResult(data);
  };

  return (
    <DigitalPostItContainer {...rest}>
      <MiniMap
        childComponent={
          <PostitItemList
            postitData={postitData}
            isPreview={true}
            imgSrc={imgSrc}
            status={status}
          />
        }
      >
        <PostitItemList
          css={styleSheet.digitalMain}
          postitData={postitData}
          isPreview={false}
          imgSrc={imgSrc}
          isMax={isMax}
          status={status}
          onClickHandle={onPostitClickHandle}
          onClickItemHandle={onClickHandle}
        />
      </MiniMap>
    </DigitalPostItContainer>
  );
});

export default DigitalPostIt;
