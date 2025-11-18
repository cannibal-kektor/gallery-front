import "../styles/Spinner.css";

const Spinner = ({message = "Loading..."}) => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <div className="spinner-message">{message}</div>
        </div>
    );
};

export default Spinner;