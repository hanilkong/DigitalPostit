import styled from "@emotion/styled";
import { PostitStatusT } from "./PostitItemList";
import { error, ongoing2 } from "../common";

type PropsT = {
  selectedMode: PostitStatusT;
  isSelect?: boolean;
  color?: string;
  isPreview: boolean;
};

export const PostItItem = styled.div<PropsT>`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  outline: ${({ isSelect }) => (isSelect === true ? `1px solid ${error}` : 0)};
  border: ${({ isPreview }) =>
    isPreview === true ? 0 : `1px solid ${ongoing2}`};
  width: ${({ isPreview }) => (isPreview === true ? 0.84 : 8.6666667)}em;
  aspect-ratio: 1/1;
  text-align: center;
  background: ${({ selectedMode, color }) =>
    selectedMode === "NONE" ? "rgba(255, 255, 255, 0.2)" : color};
  margin: ${({ isPreview }) => (isPreview === true ? "0.26" : "0.16")}%;
`;
