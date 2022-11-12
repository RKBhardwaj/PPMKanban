import React from "react";
import PropTypes from "prop-types";
import utils from "./utils";

const Button = ({children, type, isDisabled, onClick, isPrimary}) => {
    const classNames = utils.getClassNames({
        'btn' : true,
        'btn-primary' : isPrimary,
        'btn-secondary': !isPrimary
    })
    return (
        <button
            type={type}
            className={classNames}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

Button.displayName = 'Button'
Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
    isPrimary: PropTypes.bool,
    onClick: PropTypes.func,
}
Button.defaultProps = {
    type: 'button',
    isDisabled: false,
    isPrimary: true
}

export default Button