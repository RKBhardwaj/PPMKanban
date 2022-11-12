import React from "react";
import PropTypes from "prop-types";
import utils  from "./utils";

const TextInput = ({ label, isDisplayLabel, placeholder, name, value, onChange, error, isRequired, isDisabled  }) => {
    const classNames = utils.getClassNames({
        "form-control": true,
        "form-control-lg": true,
        "is-invalid": !!error

    })
    const fieldId = `text-input-${name}`
    return (
        <div className="form-group">
            <label htmlFor={fieldId}>
                {isDisplayLabel && (<span>{label}</span>)}
                <input
                    type="text"
                    id={fieldId}
                    className={classNames}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={isRequired}
                    disabled={isDisabled}
                />
            </label>
        </div>
    )
}

TextInput.displayName = 'TextInput'
TextInput.propTypes = {
    label: PropTypes.string,
    isDisplayLabel: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    isRequired: PropTypes.bool,
    isDisabled: PropTypes.bool,
}
TextInput.defaultProps = {
    label: '',
    isDisplayLabel: true,
    error: false,
    isRequired: false,
    isDisabled: false
}

export default TextInput