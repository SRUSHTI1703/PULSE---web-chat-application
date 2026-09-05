import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import history from '../Utilities/history';
import { useLogin } from '../Services/authenticationService';

const Login = props => {
    const login = useLogin();

    return (
        <div className="auth-card">
            <div className="auth-heading">
                <h1>Welcome back</h1>
                <p>Sign in to continue your conversations.</p>
            </div>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()
                        .required('Username is required')
                        .max(40, 'Username is too long'),

                    password: Yup.string()
                        .required('Password is required')
                        .max(100, 'Password is too long')
                        .min(6, 'Password too short'),
                })}
                onSubmit={(
                    { username, password },
                    { setStatus, setSubmitting }
                ) => {
                    setStatus();

                    login(username, password).then(
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
                                {status.message || 'Unable to sign in. Please check your credentials.'}
                            </div>
                        )}

                        <div className="auth-form-group">
                            <label className="auth-label">
                                USERNAME
                            </label>

                            <input
                                className="auth-input"
                                name="username"
                                placeholder="Enter your username"
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
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                            />

                            {touched.password && errors.password && (
                                <div className="auth-error">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                )}
            </Formik>

            <div className="auth-switch">
                Don't have an account?

                <button
                    type="button"
                    onClick={() => props.handleClick('register')}
                >
                    Create one
                </button>
            </div>
        </div>
    );
};

export default Login;