import React from 'react';
import { ErrorMessage, useField } from 'formik';
import css from "./cart.module.css"
const Input = ({ label,...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className={css.inputBox}>
            <label>{label}</label>
            <input
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
            />
            <ErrorMessage component="div" name={field.name} className={css.error} />
        </div>
    );
};

export default Input;