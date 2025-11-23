import React from "react";
import "../styles/Spinner.css";

const Spinner = React.memo(({message = "Loading..."}) => (
        <div className="spinner-container">
            <div className="spinner"></div>
            <div className="spinner-message">{message}</div>
        </div>
    )
);

export default Spinner;