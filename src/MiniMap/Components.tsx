import styled from "@emotion/styled";
export const Container = styled.div<{
  isPreview: boolean;
}>`
  position: relative;
  width: ${({ isPreview }) => {
    if (isPreview === true) {
      return "auto";
    } else {
      return "100%";
    }
  }};
  height: ${({ isPreview }) => {
    if (isPreview === true) {
      return "auto";
    } else {
      return "100vh";
    }
  }};
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
export const MiniMapMain = styled.div<{ width: number; height: number }>`
  position: relative;
  z-index: 1;
  /* margin: 10px; */
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  aspect-ratio: 3.556 / 1;
`;

export const MiniMapContainer = styled.div<{ top: number }>`
  position: absolute;
  width: 100%;
  height: 50%;
  top: ${({ top }) => top}px;
`;

export const MiniMapContainerScroll = styled.div`
  overflow: scroll;
  width: 100%;
  height: 100%;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MiniMapViewport = styled.div<{
  width: number;
  height: number;
  left: number;
  top: number;
}>`
  position: absolute;
  box-sizing: border-box;
  z-index: 1;
  cursor: move;
  border: 1px solid red;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
`;
