import React, { useEffect } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import Message from '../../components/message/message';
import { useDispatch, useSelector } from 'react-redux';
import { getIsMyListLoading, getMyList } from '../../store/user/user-selectors';
import { fetchMyList } from '../../store/user/user-thunks';
import Spinner from '../../UI/spinner/Spinner';

const NO_FAVORITE_FILMS = 'Your list of favorite films is empty for now';

function MyList(): JSX.Element {
  const dispatch = useDispatch();
  const myList = useSelector(getMyList);
  const isMyListLoading = useSelector(getIsMyListLoading);

  useEffect(() => {
    dispatch(fetchMyList());
  }, [dispatch]);

  return (
    <div className="user-page">
      <Header userPage>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {
          (!isMyListLoading && myList.length === 0) &&
            <Message
              message={NO_FAVORITE_FILMS}
              centered
            />
        }

        {
          (isMyListLoading && myList.length === 0) ? <Spinner/> :
            <FilmsList films={myList}/>
        }
      </section>
      <Footer/>
    </div>
  );
}

export default MyList;
