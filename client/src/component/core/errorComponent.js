import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({errors}) => {
    const errorMessages = Object.keys(errors).map(key => <p>{errors[key]}</p>)

    return (
        <div className="alert alert-danger text-center" role="alert">
            {errorMessages}
        </div>
    );
}

ErrorComponent.displayName = 'ErrorComponent'
ErrorComponent.propTypes = {
    errors: PropTypes.object
}
ErrorComponent.defaultProps = {
    errors: {}
}

export default ErrorComponent