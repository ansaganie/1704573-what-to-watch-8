import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import {
  Formik,
  FormikHelpers,
  Form,
  Field
} from 'formik';
import Footer from '../../components/footer/footer';
import { SignInForm } from '../../types/sign-in-form';
import { AsyncDispatch } from '../../types/action';
import { State } from '../../store/root-reducer';
import { login } from '../../store/user/user-thunks';
import { AppRoute, AuthStatus } from '../../constants';

const mapStateToProps = (state: State) => ({
  authStatus: state.user.authStatus,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  signIn(data: SignInForm) {
    return dispatch(login(data));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type SignInProps = ConnectedProps<typeof connector>;

function SignIn(props: SignInProps): JSX.Element {
  const { signIn, authStatus } = props;

  if (authStatus === AuthStatus.Auth) {
    return (
      <Redirect to={AppRoute.Main}/>
    );
  }

  const initialValues: SignInForm = {
    email: '',
    password: '',
  };

  const formSubmitHandler = async (values: SignInForm, { setSubmitting }: FormikHelpers<SignInForm>) => {
    setSubmitting(true);
    await signIn(values);
  };

  const validate = (values: SignInForm) => {
    const errors: { email?: string, password?: string } = {};
    if (!values.email) {
      errors.email = 'Email required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    } else if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.includes(' ')) {
      errors.password = 'Password should not contain space';
    }

    return errors;
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <Formik
          initialValues={initialValues}
          onSubmit={formSubmitHandler}
          validate={validate}
        >
          {({ isSubmitting, errors }) => (
            <Form action="#" className="sign-in__form">
              <div className="sign-in__fields">
                <div className="sign-in__message">
                  <p>{errors.password}</p>
                  <p>{errors.email}</p>
                </div>
                <div className="sign-in__field">
                  <Field
                    className="sign-in__input"
                    placeholder="Email address"
                    name="email"
                    id="email"
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className="sign-in__field">
                  <Field
                    className="sign-in__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button
                  className="sign-in__btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer/>
    </div>
  );
}

export { SignIn };
export default connector(SignIn);
