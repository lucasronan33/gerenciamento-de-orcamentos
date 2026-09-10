import propTypes from "prop-types";

export function FormLabel({ text, required = false, ...rest }) {
  return (
    <label
      {...rest}
      className="
            w-full
            flex
            gap-3
            text-sm
            font-bold
            "
    >
      {text}
      {required && (
        <span
          className="
        text-rejected-dark
        "
        >
          *
        </span>
      )}
    </label>
  );
}

FormLabel.propTypes = {
  htmlFor: propTypes.string,
  text: propTypes.string,
};
