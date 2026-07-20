import css from "./Bracket.module.css";

// One half of the draw goes Round of 32 -> Round of 16 -> QF -> SF (4 rounds,
// 8 leaf matches). Both halves converge on the Final in the middle.
const HALF_ROUNDS = 3;

const LEFT_LABELS = ["Round of 32", "Round of 16", "Quarter-finals", "Semi-finals"];
const RIGHT_LABELS = [...LEFT_LABELS].reverse();
const HEADER_LABELS = [...LEFT_LABELS, "Final", ...RIGHT_LABELS];

function Match() {
  return (
    <div className={css.match}>
      <div className={css.slot}>
        <span className={css.team}>TBD</span>
        <span className={css.score}>-</span>
      </div>
      <div className={css.slot}>
        <span className={css.team}>TBD</span>
        <span className={css.score}>-</span>
      </div>
    </div>
  );
}

function BracketNode({ round, reverse = false }: { round: number; reverse?: boolean }) {
  if (round === 0) {
    return <Match />;
  }

  const children = (
    <div className={css.pairChildren}>
      <BracketNode round={round - 1} reverse={reverse} />
      <BracketNode round={round - 1} reverse={reverse} />
    </div>
  );
  const connector = (
    <div className={reverse ? `${css.connector} ${css.connectorReverse}` : css.connector} />
  );

  return (
    <div className={css.pair}>
      {reverse ? (
        <>
          <Match />
          {connector}
          {children}
        </>
      ) : (
        <>
          {children}
          {connector}
          <Match />
        </>
      )}
    </div>
  );
}

export default function Bracket() {
  return (
    <div className={css.wrapper}>
      <div className={css.headerRow}>
        {HEADER_LABELS.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className={index === 0 ? css.headerCell : `${css.headerCell} ${css.withConnector}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={css.bracket}>
        <BracketNode round={HALF_ROUNDS} />
        <div className={`${css.connector} ${css.connectorStraight}`} />
        <div className={css.centerColumn}>
          <div className={css.championLabel}>🏆 Champion</div>
          <Match />
          <div className={css.thirdPlace}>
            <div className={css.thirdPlaceLabel}>3rd Place Match</div>
            <Match />
          </div>
        </div>
        <div className={`${css.connector} ${css.connectorStraight}`} />
        <BracketNode round={HALF_ROUNDS} reverse />
      </div>
      <p className={css.note}>
        Slots and scores will fill in automatically once group-stage results
        determine each group&apos;s top 2 and the 8 best third-placed teams.
      </p>
    </div>
  );
}
