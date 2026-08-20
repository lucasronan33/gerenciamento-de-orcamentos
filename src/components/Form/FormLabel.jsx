import propTypes from "prop-types";

export function FormLabel({ text, ...rest }) {
  return (
    <label
      {...rest}
      className="
            w-full
            text-2xl
            font-bold
            "
    >
      {text}
    </label>
  );
}

FormLabel.propTypes = {
  htmlFor: propTypes.string,
  text: propTypes.string,
};
