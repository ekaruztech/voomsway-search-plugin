import React from "react";
import Select from "react-select";

const SelectInputField = props => {
  const {
    options,
    name,
    label,
    placeholder,
    disabled,
    isSearchable,
    error,
    value,
    onChange,
    wrapperDivClass,
    ...restProps
  } = props;

  const handleSelectChange = selectedOption => {
    onChange(name, selectedOption);
  };

  return (
    <div className={wrapperDivClass}>
      {label && <label className="vm-form-label">{label}</label>}
      <div>
        <Select
          isClearable={true}
          openMenuOnClick={true}
          hideSelectedOptions={true}
          placeholder={placeholder}
          className="selectbox-container"
          classNamePrefix="react-select"
          name={name}
          isSearchable={isSearchable || false}
          options={options}
          value={value}
          onChange={handleSelectChange}
          isDisabled={disabled}
          {...restProps}
        />
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default SelectInputField;
