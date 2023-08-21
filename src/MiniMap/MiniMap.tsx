import React from "react";
import {
  Container,
  MiniMapContainer,
  MiniMapContainerScroll,
  MiniMapMain,
  MiniMapViewport,
} from ".";
import { throttle } from "./common";

interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  childComponent?: React.ReactNode;
  isPreviewMode?: boolean;
}

let viewPortWidth = 0;
let viewPortHeight = 0;
let viewPortLeft = 0;
let viewPortTop = 0;
let viewPortXCoord = 0;
let viewPortYCoord = 0;
let downState = false;

const MiniMap: React.FC<PropsI> = (props: PropsI) => {
  const {
    width: widthProps,
    isPreviewMode,
    childComponent,
    children,
    ...rest
  } = props;

  const [width, setWidth] = React.useState(200);
  const [height, setHeight] = React.useState(200);
  const resize = throttle(() => synchronize, 100);
  const [viewport, setViewport] = React.useState<React.ReactNode | null>(null);

  const miniMapRef = React.useRef<HTMLDivElement | null>(null);
  const contentsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    window.addEventListener("resize", resize);
    init();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", init);
    synchronize();
    return () => {
      window.addEventListener("resize", init);
    };
  }, [width, height]);

  const reDraw = () => {
    setViewport(
      <MiniMapViewport
        width={viewPortWidth}
        height={viewPortHeight}
        left={viewPortLeft}
        top={viewPortTop}
      />
    );
  };

  const move = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (downState === false) return;
    let moveEvent;
    if (contentsRef && contentsRef.current) {
      const contentsContainer = contentsRef.current;
      e.preventDefault();
      if (e.type.match(/touch/)) {
        const { touches } = e as React.TouchEvent<HTMLDivElement>;
        if (touches.length > 1) {
          return;
        }
        moveEvent = touches[0];
      } else {
        moveEvent = e as React.MouseEvent<HTMLDivElement>;
      }

      let dx = moveEvent.clientX - viewPortXCoord;
      let dy = moveEvent.clientY - viewPortYCoord;
      if (viewPortLeft + dx < 0) {
        dx = -viewPortLeft;
      }
      if (viewPortTop + dy < 0) {
        dy = -viewPortTop;
      }
      if (viewPortLeft + viewPortWidth + dx > width) {
        dx = width - viewPortLeft - viewPortWidth;
      }
      if (viewPortTop + viewPortHeight + dy > height) {
        dy = height - viewPortTop - viewPortHeight;
      }

      viewPortXCoord += dx;
      viewPortYCoord += dy;

      viewPortLeft += dx;
      viewPortTop += dy;

      // Sanity checks:
      viewPortLeft = viewPortLeft < 0 ? 0 : viewPortLeft;
      viewPortTop = viewPortTop < 0 ? 0 : viewPortTop;

      const coefX = width / contentsContainer.scrollWidth;
      const coefY = height / contentsContainer.scrollHeight;
      const left = viewPortLeft / coefX;
      const top = viewPortTop / coefY;

      contentsContainer.scrollLeft = Math.round(left);
      contentsContainer.scrollTop = Math.round(top);
      reDraw();
    }
  };

  const up = () => {
    downState = false;
  };

  const down = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (miniMapRef && miniMapRef.current) {
      const pos = miniMapRef.current.getBoundingClientRect();

      viewPortXCoord = Math.round(pos.left + viewPortLeft + viewPortWidth / 2);
      viewPortYCoord = Math.round(pos.top + viewPortTop + viewPortHeight / 2);

      downState = true;
      move(e);
    }
  };

  const init = () => {
    if (contentsRef && contentsRef.current) {
      if (widthProps === undefined) {
        const calcWidth = Math.floor(window.innerWidth * 0.95 * 1000) / 1000;
        const calcHeight =
          Math.floor((window.innerWidth / 3.555555556) * 0.95 * 1000) / 1000;
        setWidth(calcWidth);
        setHeight(calcHeight);
      } else {
        setWidth(Math.floor(widthProps * 0.95 * 1000) / 1000);
        setHeight(Math.floor((widthProps / 3.555555556) * 0.95 * 1000) / 1000);
      }
    }
  };

  const synchronize = () => {
    if (contentsRef && contentsRef.current) {
      const contentsContainer = contentsRef.current;
      const rect = contentsContainer.getBoundingClientRect();
      const dims = [rect.width, rect.height];
      const scroll = [
        contentsContainer.scrollLeft,
        contentsContainer.scrollTop,
      ];
      const scaleX = width / contentsContainer.scrollWidth;

      const scaleY = height / contentsContainer.scrollHeight;
      const lW = dims[0] * scaleX;
      const lH = dims[1] * scaleY;
      const lX = scroll[0] * scaleX;
      const lY = scroll[1] * scaleY;

      // Ternary operation includes sanity check
      viewPortWidth = Math.round(lW) > width ? width : Math.round(lW);
      viewPortHeight = Math.round(lH) > height ? height : Math.round(lH);
      viewPortLeft = Math.round(lX);
      viewPortTop = Math.round(lY);
      reDraw();
    }
  };

  return (
    <Container
      className="mini-map"
      isPreview={isPreviewMode || false}
      {...rest}
    >
      <MiniMapMain
        width={width}
        height={height}
        ref={miniMapRef}
        onMouseDown={down}
        onTouchStart={down}
        onTouchMove={move}
        onMouseMove={move}
        onTouchEnd={up}
        onMouseUp={up}
      >
        {isPreviewMode !== true && viewport}
        {childComponent}
      </MiniMapMain>
      <MiniMapContainer top={24 + height}>
        <MiniMapContainerScroll
          onScroll={() => synchronize()}
          ref={contentsRef}
        >
          {children}
        </MiniMapContainerScroll>
      </MiniMapContainer>
    </Container>
  );
};

export default MiniMap;
