import Main from '../main/main';
import { Film } from '../../types/film';

type AppProps = {
  smallFilmCards: Film[],
  promoFilm: Film,
}

function App({ smallFilmCards, promoFilm }: AppProps): JSX.Element {
  return (
    <Main
      smallFilmCards={smallFilmCards}
      promoFilm={promoFilm}
    />
  );
}

export default App;
