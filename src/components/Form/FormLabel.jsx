import propTypes from "prop-types";

export function FormLabel({ htmlFor, text }) {
    if (!htmlFor) {
        return (
            <span
                className="
            w-full
            text-2xl
            font-bold
            "
            >
                {text}
            </span>
        );
    }

    return (
        <label
            htmlFor={htmlFor}
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
