import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import { Film } from '../../types/film';
import { fetchFavorites } from '../../services/dal';
import Message from '../../components/message/message';

const NO_FAVORITE_FILMS = 'Your list of favorite films is empty for now';

function MyList(): JSX.Element {
  const [myList, setMyList] = useState<Film[]>([]);

  useEffect(() => {
    fetchFavorites()
      .then((films) => setMyList(films));
  }, []);

  return (
    <div className="user-page">
      <Header title={'My list'}/>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {
          myList.length === 0 &&
          <Message
            message={NO_FAVORITE_FILMS}
            centered
          />
        }
        <FilmsList films={myList}/>
      </section>
      <Footer/>
    </div>
  );
}

export default MyList;
