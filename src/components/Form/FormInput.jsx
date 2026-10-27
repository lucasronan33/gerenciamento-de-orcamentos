import propTypes from "prop-types";
import "./style.css";

export function FormInput({ placeholder, endIcon, ...rest }) {
  if (endIcon) {
    return (
      <div className="form-budget-input-with-icon">
        <input id={rest.id || rest.name} placeholder={placeholder} {...rest} />
        {endIcon}
      </div>
    );
  }

  return (
    <input id={rest.id || rest.name} placeholder={placeholder} {...rest} />
  );
}

FormInput.propTypes = {
  typeInput: propTypes.string,
  placeholder: propTypes.string,
  endIcon: propTypes.node,
};
