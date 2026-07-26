import propTypes from "prop-types";

export function FormContainerInput({ size = "fill", children, placeholder }) {
    return (
        <div
            className={`
        flex
        h-fit
        flex-col
        gap-[0.5vh]
        input-${size}`}
        >
            {children}
        </div>
    );
}

FormContainerInput.propTypes = {
    children: propTypes.node,
    size: propTypes.string,
};
