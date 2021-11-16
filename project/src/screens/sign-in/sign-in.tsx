import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import {
  Formik,
  FormikHelpers,
  Form,
  Field
} from 'formik';
import { SignInForm } from '../../types/sign-in-form';
import { login } from '../../store/user/user-thunks';
import { AppRoute, AuthStatus } from '../../constants';
import { AsyncDispatch, State } from '../../store/store';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

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
    } else if (!/^.*(?=.{2,})(?=.*\d)(?=.*[a-zA-Z]).*$/i.test(values.password)) {
      errors.password = 'Password should contain minimum 2 characters, one number and one letter';
    } else if (values.password.includes(' ')) {
      errors.password = 'Password should not contain space';
    }

    return errors;
  };

  return (
    <div className="user-page">
      <Header userPage>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>
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
                <div
                  className={`sign-in__field ${errors.email && 'sign-in__field--error'}`}
                >
                  <Field
                    className="sign-in__input"
                    placeholder="Email address"
                    name="email"
                    id="email"
                  />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div
                  className={`sign-in__field ${errors.password && 'sign-in__field--error'}`}
                >
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
                  disabled={ isSubmitting || !!errors.email || !!errors.password }
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
