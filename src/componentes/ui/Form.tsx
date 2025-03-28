import React from "react";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form({ children, className = "", ...props }: Props) {
  return (
    <form className={`form ${className}`} {...props}>
      {children}
    </form>
  );
}
