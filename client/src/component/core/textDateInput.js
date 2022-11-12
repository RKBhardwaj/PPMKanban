import React from "react";
import PropTypes from "prop-types";
import utils from "./utils";

const TextDateInput = ({ label, isDisplayLabel, placeholder, name, value, onChange, error }) => {
    const classNames = utils.getClassNames({
        "form-control": true,
        "form-control-lg": true,
        "is-invalid": !!error

    })
    const fieldId = `date-field-${name}`
    return (
        <div className="form-group">
            <label htmlFor={fieldId}>
                { isDisplayLabel && (<span>{label}</span>) }
                <input
                    id={fieldId}
                    type="date"
                    placeholder={placeholder}
                    className={classNames}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    )
}

TextDateInput.displayName = 'TextDateInput'
TextDateInput.propTypes = {
    label: PropTypes.string,
    isDisplayLabel: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool
}
TextDateInput.defaultProps = {
    label: '',
    isDisplayLabel: true,
    error: false
}

export default TextDateInput