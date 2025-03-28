import React from "react";
interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label ({children,...props}: Props) {
    return (
        <label className="form-label"{...props}>
        {children}
        </label>
    );
}