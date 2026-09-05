import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import history from '../Utilities/history';
import { useRegister } from '../Services/authenticationService';

const Register = props => {
    const register = useRegister();

    return (
        <div className="auth-card">
            <div className="auth-heading">
                <h1>Create your account</h1>
                <p>Join the conversation and start connecting.</p>
            </div>

            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    password: '',
                    password2: '',
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Name is required')
                        .max(40, 'Name is too long'),

                    username: Yup.string()
                        .required('Username is required')
                        .max(40, 'Username is too long'),

                    password: Yup.string()
                        .required('Password is required')
                        .max(100, 'Password is too long')
                        .min(
                            6,
                            'Password should be at least 6 characters long'
                        ),

                    password2: Yup.string().oneOf(
                        [Yup.ref('password'), null],
                        'Passwords do not match'
                    ),
                })}
                onSubmit={(
                    { name, username, password, password2 },
                    { setStatus, setSubmitting }
                ) => {
                    setStatus();

                    register(
                        name,
                        username,
                        password,
                        password2
                    ).then(
                        () => {
                            const { from } =
                                history.location.state || {
                                    from: { pathname: '/chat' },
                                };

                            history.push(from);
                        },
                        error => {
                            setSubmitting(false);
                            setStatus(error);
                        }
                    );
                }}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                    status,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        {status && (
                            <div className="auth-server-error">
                                {status.message || 'Unable to create your account.'}
                            </div>
                        )}

                        <div className="auth-form-group">
                            <label className="auth-label">
                                FULL NAME
                            </label>

                            <input
                                className="auth-input"
                                name="name"
                                placeholder="Your name"
                                value={values.name}
                                onChange={handleChange}
                            />

                            {touched.name && errors.name && (
                                <div className="auth-error">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">
                                USERNAME
                            </label>

                            <input
                                className="auth-input"
                                name="username"
                                placeholder="Choose a username"
                                value={values.username}
                                onChange={handleChange}
                            />

                            {touched.username && errors.username && (
                                <div className="auth-error">
                                    {errors.username}
                                </div>
                            )}
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">
                                PASSWORD
                            </label>

                            <input
                                className="auth-input"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={values.password}
                                onChange={handleChange}
                            />

                            {touched.password && errors.password && (
                                <div className="auth-error">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">
                                CONFIRM PASSWORD
                            </label>

                            <input
                                className="auth-input"
                                name="password2"
                                type="password"
                                placeholder="Repeat your password"
                                value={values.password2}
                                onChange={handleChange}
                            />

                            {touched.password2 && errors.password2 && (
                                <div className="auth-error">
                                    {errors.password2}
                                </div>
                            )}
                        </div>

                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Creating account...'
                                : 'Create account'}
                        </button>
                    </form>
                )}
            </Formik>

            <div className="auth-switch">
                Already have an account?

                <button
                    type="button"
                    onClick={() => props.handleClick('login')}
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default Register;