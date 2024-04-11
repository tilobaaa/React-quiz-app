import classes from "./Choices.module.css";

const Choices = (props) => {
  const limitChangeHandler = (event) => {
    props.onLimitChange(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    props.onCategoryChange(event.target.value);
  };

  const difficultyChangeHandler = (event) => {
    props.onDifficultyChange(event.target.value);
  };
  return (
    <div>
      <div className={classes.limit}>
        <label>How many questions do you want</label>
        <select value={props.selectedLimit} onChange={limitChangeHandler}>
          <option value={null}>--</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
      <div className={classes.category}>
        <label>What is your prefered category</label>
        <select value={props.selectedCategory} onChange={categoryChangeHandler}>
          <option value={null}>--</option>
          <option value="linux">Linux</option>
          <option value="Networking">Networking</option>
        </select>
      </div>
      <div className={classes.difficulty}>
        <label>How do you like it </label>
        <select
          value={props.selectedDifficulty}
          onChange={difficultyChangeHandler}
        >
          <option value={null}>--</option>  
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
      </div>
    </div>
  );
};

export default Choices;
