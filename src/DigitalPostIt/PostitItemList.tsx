/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";

import { jsx, css } from "@emotion/react";
import { PostItItem } from "./PostItItem";
import {
  PostitItemListContainer,
  RotateButton,
  PostItContainer,
  FlexColContainer,
  FlexRowContainer,
  Typography,
} from "./Components";
import { gray6, initPostit, postitBlue, primaryOrange, white } from "../common";

export type PostitStatusT = "NONE" | "ALREADY" | "SELECTED";
export type DigitalStickerStatusT = "SELECT" | "UPDATE" | "VIEW";
interface SelectI {
  row: number;
  col: number;
}
export interface PostitDataI {
  row: number;
  col: number;
  id: string;
  mediaArt: string;
  selectMode: PostitStatusT;
  index: number;
  postitColor: string;
  description: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}
interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
  row?: number;
  col?: number;
  imgSrc: string;
  isMax?: boolean; // is select postit
  status?: DigitalStickerStatusT;
  isPreview: boolean; // 프리뷰 모드 적용
  rotate?: string; // rotate 버튼 모드 src가 있으면 렌더링
  postitData: PostitDataI[][];
  select?: SelectI | SelectI[];
  // isSelectMode?: boolean // 선택화면 모드인지
  onClickHandle?: (data: PostitDataI[][]) => void;
  onClickItemHandle?: (data: PostitDataI) => void;
  onRotateHandle?: () => void;
}

const styleSheet = {
  align: css`
    width: 100%;
    height: 100%;
    justify-content: space-around;
  `,
};

export const PostitItemList: React.FC<PropsI> = React.memo((props: PropsI) => {
  const {
    row,
    col,
    status,
    isPreview,
    select,
    isMax,
    rotate,
    postitData,
    imgSrc,
    onClickHandle,
    onClickItemHandle,
    onRotateHandle,
    ...rest
  } = props;
  const [indexArr, setIndexArr] = React.useState<number[]>([]);

  const selectData = () => {
    if (select === undefined) {
      return [];
    }
    if (Array.isArray(select)) {
      return select;
    } else {
      return [select];
    }
  };

  const isSelectPostit = (rowIndex: number, colIndex: number) => {
    const isSelect =
      selectData().find(
        (item) => item.row === rowIndex && item.col === colIndex
      ) !== undefined;
    return isSelect;
  };

  // 모드 별 포스트잇 컬러
  const postitColor = (color: string, postitStatus: PostitStatusT) => {
    if (status === "SELECT") {
      if (postitStatus === "SELECTED") {
        return primaryOrange;
      } else if (postitStatus === "ALREADY") {
        return gray6;
      }
    } else if (status === "UPDATE") {
      if (postitStatus === "ALREADY") {
        return gray6;
      }
      return color;
    }
    return color;
  };

  const onPostItSelectHandle = (rowIndex: number, colIndex: number) => {
    const item = postitData[rowIndex][colIndex];
    const tempData: PostitDataI[][] = JSON.parse(JSON.stringify(postitData));
    const tempArr: number[] = JSON.parse(JSON.stringify(indexArr));
    const index = tempArr.findIndex((value) => value === 0);
    if (onClickItemHandle) {
      onClickItemHandle(item);
    } else {
      if (item.selectMode === "ALREADY") {
        return;
      } else if (item.selectMode === "NONE") {
        let dataIndex = 0;
        if (index === -1) {
          tempArr.push(tempArr.length + 1);
          dataIndex = tempArr.length;
        } else {
          tempArr[index] = index + 1;
          dataIndex = index + 1;
        }
        setIndexArr(tempArr);
        tempData[rowIndex][colIndex] = {
          row: rowIndex,
          col: colIndex,
          id: item.id,
          mediaArt: item.mediaArt,
          selectMode: "SELECTED",
          index: dataIndex,
          description: "",
          postitColor: postitBlue,
          createdAt: item.createdAt,
          createdBy: item.createdBy,
          updatedAt: item.updatedAt,
        };
        if (onClickHandle) {
          onClickHandle(tempData);
        }
      } else {
        tempArr[item.index - 1] = 0;
        setIndexArr(tempArr);
        tempData[rowIndex][colIndex] = initPostit(rowIndex, colIndex);
        if (onClickHandle) {
          onClickHandle(tempData);
        }
      }
    }
  };

  const onClickMaximizeHandle = () => {
    if (onRotateHandle) {
      onRotateHandle();
    }
  };

  return (
    <PostitItemListContainer
      className="postit-item-list"
      src={imgSrc}
      {...rest}
    >
      {rotate && <RotateButton onClick={onClickMaximizeHandle} src={rotate} />}
      <PostItContainer>
        <FlexColContainer css={styleSheet.align}>
          {postitData.map((rowItem, rowIndex) => (
            <FlexRowContainer key={rowIndex} css={styleSheet.align}>
              {rowItem.map((colItem, colIndex) => (
                <PostItItem
                  key={colIndex}
                  isSelect={isSelectPostit(rowIndex, colIndex)}
                  onClick={() => onPostItSelectHandle(rowIndex, colIndex)}
                  seletedMode={colItem.selectMode}
                  isPreview={isPreview}
                  color={postitColor(colItem.postitColor, colItem.selectMode)}
                >
                  {isPreview === false &&
                    colItem.index !== 0 &&
                    colItem.selectMode === "SELECTED" && (
                      <Typography color={white}>{colItem.index}</Typography>
                    )}
                </PostItItem>
              ))}
            </FlexRowContainer>
          ))}
        </FlexColContainer>
      </PostItContainer>
    </PostitItemListContainer>
  );
});

PostitItemList.defaultProps = {
  select: [],
};
