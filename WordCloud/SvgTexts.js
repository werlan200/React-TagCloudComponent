const SvgTexts = ({ properPlacedRects }) => {
  return (
    <>
      {properPlacedRects.map((rect, index) => {
        const {
          centerX,
          centerY,
          properties: { fontSize, text },
        } = rect;

        return (
          <text
            key={index}
            fontSize={fontSize}
            fontFamily={"Arial"}
            textAnchor={"middle"}
            fill={"black"}
            transform={`translate(${Math.floor(centerX)},${Math.floor(
              centerY + fontSize / 4
            )})`}
          >
            {text}
          </text>
        );
      })}
    </>
  );
};
export default SvgTexts;
