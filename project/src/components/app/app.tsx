import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../main/main';
import { Film } from '../../types/film';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import FilmPage from '../film-page/film-page';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import { AppRoute } from '../../constants';

type AppProps = {
  films: Film[],
  promoFilm: Film,
}

function App({ films, promoFilm }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main films={films} promoFilm={promoFilm}/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn/>
        </Route>
        <Route path={AppRoute.MyList} exact>
          <MyList myList={films}/>
        </Route>
        <Route path={AppRoute.FilmPage} exact>
          <FilmPage film={promoFilm} relatedFilms={films.slice(0, 4)}/>
        </Route>
        <Route path={AppRoute.AddReview} exact>
          <AddReview film={promoFilm}/>
        </Route>
        <Route path={AppRoute.Player} exact>
          <Player film={promoFilm}/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
