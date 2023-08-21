import styled from "@emotion/styled";
import React from "react";

interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
}

interface IStyledTypography {
  fontSize: number;
}

export const DigitalPostItContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.47;
`;

export const PostitItemListContainer = styled.div<{ src: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const PostItContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1px;
`;

export const RotateButton = styled.div<{ src: string }>`
  position: absolute;
  background-image: url(${({ src }) => src});
  width: 8%;
  height: 29%;
  background-size: contain;
  background-repeat: no-repeat;
  right: 8px;
  bottom: 8px;
  z-index: 1;
`;

export const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexColContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTypography = styled.p<IStyledTypography>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
`;
export const Typography = React.memo((props: PropsI) => {
  const { size, color, ...rest } = props;
  return (
    <StyledTypography
      fontSize={size || 12}
      color={color || "#000000"}
      {...rest}
    />
  );
});
