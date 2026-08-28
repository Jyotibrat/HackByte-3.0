import { ReactCompareSlider } from "react-compare-slider";

export default function Comparison({ itemOne, itemTwo }) {
  return (
    <ReactCompareSlider
      className="not-prose w-full rounded-lg"
      itemOne={itemOne}
      itemTwo={itemTwo}
    />
  );
}
