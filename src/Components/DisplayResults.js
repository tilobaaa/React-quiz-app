import Modal from "./Modal";
import classes from './DisplayResults.module.css'

const DisplayResults = (props) => {
  const {limit, score} = props
  return (
    <Modal className={classes.overall} onClose={props.onClose}>
      <div className={classes.scorep}>{`YOUR SCORE IS ${score}/${limit}`}
      <button className={classes[`score-btn`]} onClick={props.onClose}>Close</button>
      </div>

    </Modal>
  );
};

export default DisplayResults;
