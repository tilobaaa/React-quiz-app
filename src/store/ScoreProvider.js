import ScoreContext from "./score-context";

const ScoreProvider = (props) => {
  const scoreValue = {
    score: 0,
  };
  return <ScoreContext.Provider value={scoreValue}>{props.children}</ScoreContext.Provider>;
};

export default ScoreProvider