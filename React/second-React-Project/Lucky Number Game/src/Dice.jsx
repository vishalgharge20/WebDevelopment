import Die from "./Die";
import "./Dice.css";

export default function Dice({ dice, color = "slateblue" }) {
  return (
    <div className="Dice">
      {dice.map((val, i) => (
        <Die key={i} val={val} color={color} />
      ))}
    </div>
  );
}