import { css } from "@emotion/react";

export interface ChildPropsI extends React.PropsWithChildren {
  width: number;
  height: number;
  top: number;
  left: number;
}

export const Child: React.FC<ChildPropsI> = (props: ChildPropsI) => {
  const { width, height, top, left, children } = props;

  const styleSheet = {
    root: css`
      position: absolute;
      background: #ccc;
      border: 1px solid black;
      box-sizing: border-box;
      width: ${width}px;
      height: ${height}px;
      top: ${top}px;
      left: ${left}px;
    `,
  };
  return <div css={styleSheet.root}>{children}</div>;
};
