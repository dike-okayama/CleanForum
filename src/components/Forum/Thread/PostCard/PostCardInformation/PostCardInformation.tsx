import { useSpring, animated } from "@react-spring/web";
import style from "./PostCardInformation.module.css";
import { Predictions } from "../../../types";

const colorMap: { [label: string]: string } = {
  identity_attack: "#FF0000",
  insult: "#000000",
  obscene: "#800080",
  severe_toxicity: "#FF4500",
  sexual_explicit: "#FF69B4",
  threat: "#00008B",
  toxicity: "#006400",
};

interface PostCardInformationProps {
  info: Predictions;
}

export default function PostCardInformation({
  info,
}: PostCardInformationProps) {
  return (
    <div className={style.postCardInfoContainer}>
      {info.map((prediction, index) => {
        const percent =
          Number(prediction.results[0].probabilities["1"].toFixed(2)) * 100;
        const label = prediction.label;
        const gridArea = {
          0: "1 / 1 / 2 / 2",
          1: "1 / 2 / 2 / 3",
          2: "2 / 1 / 3 / 2",
          3: "2 / 2 / 3 / 3",
          4: "3 / 1 / 4 / 2",
          5: "3 / 2 / 4 / 3",
          6: "4 / 1 / 5 / 3",
        }[index];
        return (
          <AnimatedBar
            key={label}
            label={label}
            percent={percent}
            gridArea={gridArea as string}
          />
        );
      })}
    </div>
  );
}

interface AnimatedBarProps {
  percent: number;
  label: string;
  gridArea: string;
}

const AnimatedBar = ({ percent, label, gridArea }: AnimatedBarProps) => {
  const props = useSpring({
    from: { width: "0%" },
    to: { width: `${percent}%` },
  });

  return (
    <div style={{ gridArea: gridArea }} className={style.animationContainer}>
      <span className={style.label}>{label.replace("_", " ")}</span>
      <div className={style.probabilityContainer}>
        <div className={style.animationBarContainer}>
          <animated.div
            style={{
              ...props,
              background: colorMap[label],
            }}
            className={style.animationBar}
          />
        </div>
        <span className={style.percent}>{percent}%</span>
      </div>
    </div>
  );
};
