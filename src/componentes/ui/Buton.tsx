import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: Props) {
  return (
    <button {...props}>
      {children}
    </button>
  );
}
