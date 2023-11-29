import React, { ReactNode } from "react";

interface FormProps {
  style?: any;
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form = ({ onSubmit, children, ...restProps }: FormProps) => {
  return (
    <React.Fragment>
      <form onSubmit={onSubmit} {...restProps} style={{ width: "100%" }}>
        {children}
      </form>
    </React.Fragment>
  );
};

export default Form;