import React from "react";
import PropTypes from "prop-types";
import utils from "./utils";

const Dropdown = ({label, isDisplayLabel, placeholder, name, value, onChange, error, options}) => {
    const classNames = utils.getClassNames({
        "form-control": true,
        "form-control-lg": true,
        "is-invalid": !!error

    })
    const fieldId = `dropdown-input-${name}`

    const renderOptions = options.map((option) => {
        return (
            <option value={option.value}>{option.text}</option>
        )
    })

    const initialValue = 0;
    const initialText = `Select ${placeholder || name}`

    return (
        <div className="form-group">
            <div className="mb-3">
                <label className="form-label" htmlFor={fieldId}>
                    {isDisplayLabel && (<span>{label}</span>)}

                </label>
                <select
                    className={classNames}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                >
                    <option value={initialValue}>{initialText}</option>
                    {renderOptions}
                </select>
            </div>

        </div>
    )
}

Dropdown.displayName = 'Dropdown'
Dropdown.propTypes = {
    label: PropTypes.string,
    isDisplayLabel: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        text: PropTypes.string
    }))
}
Dropdown.defaultProps = {
    label: '',
    isDisplayLabel: true,
    error: false,
    options: []
}

export default Dropdown