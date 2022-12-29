import React from "react";
import PropTypes from "prop-types";
import utils from "./utils";

const Button = ({children, type, isDisabled, onClick, isPrimary, isLink}) => {
    const classNames = utils.getClassNames({
        'btn' : true,
        'btn-primary' : isPrimary && !isLink,
        'btn-secondary': !isPrimary && !isLink,
        'btn-link p-0': isLink
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
    isLink: PropTypes.bool
}
Button.defaultProps = {
    type: 'button',
    isDisabled: false,
    isPrimary: true,
    isLink: false
}

export default Button