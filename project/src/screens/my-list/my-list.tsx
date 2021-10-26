import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import { connect, ConnectedProps } from 'react-redux';
import { AsyncDispatch } from '../../types/action';
import { Film } from '../../types/film';
import { fetchFavorites } from '../../store/thunks';

const mapDispatchToProps = (dispatch: AsyncDispatch) => ({
  getFavoriteFilms() {
    return dispatch(fetchFavorites());
  },
});

const connector = connect(null, mapDispatchToProps);

type MyListProps = ConnectedProps<typeof connector>

function MyList(props: MyListProps): JSX.Element {
  const { getFavoriteFilms } = props;

  const [myList, setMyList] = useState<Film[]>([]);

  useEffect(() => {
    getFavoriteFilms()
      .then((films) => setMyList(films));
  }, [getFavoriteFilms]);

  return (
    <div className="user-page">
      <Header title={'My list'}/>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={myList}/>
      </section>
      <Footer/>
    </div>
  );
}

export { MyList };
export default connector(MyList);
