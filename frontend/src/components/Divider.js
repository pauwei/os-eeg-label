import React from "react";
import "../styles/divider.css";

const Divider = (props) => {
    const { title } =  props;

    return (
        <div className="strike">
            <span>{title}</span>
        </div>
    );
}

export default Divider;