import React from "react";
import "../styles/PullDownInfo.css";

const PullDownInfo = React.memo(({infoMessage}) => (
        <h3 className="pull-down-info">{infoMessage}</h3>
    )
);

export default PullDownInfo;