import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { AsyncDispatch } from '../../types/action';
import { logout } from '../../store/thunks';

const mapStateToProps = (state: State) => ({
  authStatus: state.authStatus,
  user: state.user,
});

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  signOut() {
    return dispatch(logout());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type UserProps = ConnectedProps<typeof connector>;

function User(props: UserProps): JSX.Element {
  const { user, signOut } = props;

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
        !user ? <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
          : (
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
