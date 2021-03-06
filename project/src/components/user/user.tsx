import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthStatus } from '../../constants';
import { logout } from '../../store/user/user-thunks';
import { AsyncDispatch, State } from '../../store/store';
import { getAuthStatus, getUser } from '../../store/user/user-selectors';

const mapStateToProps = (state: State) => ({
  authStatus: getAuthStatus(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  signOut() {
    dispatch(logout());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type UserProps = ConnectedProps<typeof connector>;

function User(props: UserProps): JSX.Element {
  const { authStatus, user, signOut } = props;
  const history = useHistory();

  const signOutClickHandler = () => {
    signOut();
  };

  const avatarClickHandler = () => {
    history.push(AppRoute.MyList);
  };

  return (
    <div className="user-block">
      {
        authStatus === AuthStatus.NoAuth &&
        history.location.pathname !== AppRoute.SignIn && (
          <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
        )
      }
      {
        user && (
          <>
            <li className="user-block__item">
              <div
                className="user-block__avatar"
                onClick={avatarClickHandler}
              >
                <img src={user.avatarUrl} alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <div
                className="user-block__link"
                onClick={signOutClickHandler}
              >
                Sign out
              </div>
            </li>
          </>
        )
      }
    </div>
  );
}

export { User };
export default connector(User);
