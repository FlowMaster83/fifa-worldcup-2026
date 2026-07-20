import css from "./Bracket.module.css";

const ROUND_LABELS = [
  "Round of 32",
  "Round of 16",
  "Quarter-finals",
  "Semi-finals",
  "Final",
  "Champion",
];

const ROUNDS = 5; // Round of 32 -> Round of 16 -> QF -> SF -> Final

function Match() {
  return (
    <div className={css.match}>
      <div className={css.slot}>TBD</div>
      <div className={css.slot}>TBD</div>
    </div>
  );
}

function BracketNode({ round }: { round: number }) {
  if (round === 0) {
    return <Match />;
  }

  return (
    <div className={css.pair}>
      <div className={css.pairChildren}>
        <BracketNode round={round - 1} />
        <BracketNode round={round - 1} />
      </div>
      <div className={css.connector} />
      <Match />
    </div>
  );
}

export default function Bracket() {
  return (
    <div className={css.wrapper}>
      <div className={css.headerRow}>
        {ROUND_LABELS.map((label, index) => (
          <div
            key={label}
            className={index === 0 ? css.headerCell : `${css.headerCell} ${css.withConnector}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={css.bracket}>
        <BracketNode round={ROUNDS - 1} />
        <div className={css.connector} />
        <div className={css.championBox}>🏆 Champion</div>
      </div>
      <p className={css.note}>
        Slots will fill in automatically once group-stage results determine
        each group&apos;s top 2 and the 8 best third-placed teams.
      </p>
    </div>
  );
}
