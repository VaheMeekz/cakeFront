import React from 'react';
import { ErrorMessage, useField } from 'formik';
import css from "./cart.module.css"
const Input = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <input
                className={`${css.input} ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
            />
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    );
};

export default Input;