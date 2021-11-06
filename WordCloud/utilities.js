//handles font type
function getTextWidth(text, fontSize) {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.textAlign = "center";
  context.font = fontSize + "px Arial";
  return context.measureText(text).width;
}

//Iterate over center-placed rects to make them not to collide on each other.
function placeRectsProperly(svgArea, centerPlacedRects) {
  let tempCenterPlacedRects = [...centerPlacedRects];
  //random words or not
  let properPlacedRects = [];
  for (let i = 0; i < tempCenterPlacedRects.length; i++) {
    const properPlacedRect = trySpiralPathPlacement(
      svgArea,
      tempCenterPlacedRects[i],
      properPlacedRects
    );
    if (properPlacedRect != null) {
      properPlacedRects.push(properPlacedRect);
    }
  }
  return properPlacedRects;
}

//Returns null on fail or Rect Object on success.
function trySpiralPathPlacement(
  svgArea,
  tempCenterPlacedRect,
  properPlacedRects
) {
  //check the rect if it is already located on an available area and place it
  if (
    checkRectWithinArea(svgArea, tempCenterPlacedRect) &&
    !checkCollisions(tempCenterPlacedRect, properPlacedRects)
  ) {
    return tempCenterPlacedRect.clone();
  }
  //Find available space for rect to be placed on a spiral with increasing radius
  const diagonalLength = tempCenterPlacedRect.diagonalLength;
  const maxDistanceRectCanBe = 10 * diagonalLength;
  const rotationOffset = Math.random() * 360;
  const spiralRadiusIncrementEachStep = 0.1;
  const rotationIncrementEachStep = 5;
  let newRect = tempCenterPlacedRect.clone();
  for (
    let currentRadius = diagonalLength * spiralRadiusIncrementEachStep;
    currentRadius < maxDistanceRectCanBe;
    currentRadius += diagonalLength * spiralRadiusIncrementEachStep
  ) {
    for (
      let rotation = 0;
      rotation < 360;
      rotation += rotationIncrementEachStep
    ) {
      const dx =
        Math.cos(rotationOffset + rotation * (Math.PI / 180)) * currentRadius;
      const dy =
        Math.sin(rotationOffset + rotation * (Math.PI / 180)) * currentRadius;
      newRect.centerX = tempCenterPlacedRect.centerX + dx;
      newRect.centerY = tempCenterPlacedRect.centerY + dy;
      newRect.calculateBounds();
      if (
        checkRectWithinArea(svgArea, newRect) &&
        !checkCollisions(newRect, properPlacedRects)
      ) {
        return newRect;
      }
    }
  }
  return null;
}

//CHECKING FUNCTIONS
function checkRectWithinArea(svgArea, rect) {
  return (
    rect.left > svgArea.left &&
    rect.right < svgArea.right &&
    rect.top > svgArea.top &&
    rect.bottom < svgArea.bottom
  );
}
function checkCollisions(rect, properPlacedRects) {
  for (let i = 0; i < properPlacedRects.length; i++) {
    if (
      !(
        properPlacedRects[i].left > rect.right ||
        properPlacedRects[i].right < rect.left ||
        properPlacedRects[i].top > rect.bottom ||
        properPlacedRects[i].bottom < rect.top
      )
    )
      return true;
  }
  return false;
}

export { getTextWidth, placeRectsProperly };
