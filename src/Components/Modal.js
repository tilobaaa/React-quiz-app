import ReactDOM  from "react-dom";
import classes from './Modal.module.css'

const portalElement = document.getElementById("overlays");

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/>;
  };

  const ModalOverlay = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}> {props.children} </div>
      </div>
    );
  };  

const Modal = (props)=>{
    return(
        <>
        {ReactDOM.createPortal(<Backdrop onClose={props.oncClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal