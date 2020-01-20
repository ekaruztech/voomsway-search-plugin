import React from 'react';
import Select from 'react-select';

const SelectInputField = props => {
  const {
    options,
    name,
    label,
    disabled,
    isSearchable,
    error,
    value,
    onChange,
    wrapperDivClass,
    iconName,
    ...restProps
  } = props;

  const handleSelectChange = selectedOption => {
    onChange(name, selectedOption);
  };

  const renderIcon = iconName => (
    <img className="label-icon" src={`./assets/icons/${iconName}.svg`} alt="calendar icon" />
  );

  return (
    <div className="selectbox-container">
      {label && (
        <label className="vm-form-label">
          {iconName && renderIcon(iconName)}
          {label}
        </label>
      )}
      <Select
        isClearable={true}
        openMenuOnClick={true}
        hideSelectedOptions={true}
        placeholder="Choose..."
        className="selectbox"
        classNamePrefix="react-select"
        name={name}
        isSearchable={isSearchable || false}
        options={options}
        value={value}
        onChange={handleSelectChange}
        isDisabled={disabled}
        {...restProps}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default SelectInputField;
