import { getTextWidth, placeRectsProperly } from "./utilities";
import { tagList } from "./wordsDB";
import { Rect } from "./wcclass";
import SvgTexts from "./SvgTexts";
import styled from "styled-components";
const CloudSvg = () => {
  const svgArea = new Rect(300, 300, 600, 600); //args(centerX,centerY,width,height)
  svgArea.calculateBounds();
  let centerPlacedRects = tagList.map((word, index) => {
    const fontSize = 12 + Math.floor(Math.pow((100 - index) / 100, 4) * 72);
    const wordWidth = getTextWidth(word, fontSize);
    let centerPlacedRect = new Rect(300, 300, wordWidth + 5, fontSize + 5);
    centerPlacedRect.calculateBounds();
    centerPlacedRect.setNewProperty("fontSize", fontSize);
    centerPlacedRect.setNewProperty("text", word);
    return centerPlacedRect;
  });
  const properPlacedRects = placeRectsProperly(svgArea, centerPlacedRects);

  return (
    <Wrapper>
      <svg className="svg" width="600" height="600">
        <SvgTexts properPlacedRects={properPlacedRects} />
      </svg>
    </Wrapper>
  );
};

export default CloudSvg;

const Wrapper = styled.div`
  position: relative;
  border: 1px solid red;
  display: inline-block;
  .svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;
