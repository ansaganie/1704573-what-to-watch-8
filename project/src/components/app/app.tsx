import Main from '../main/main';
import { Film } from '../../types/film';

type AppProps = {
  films: Film[],
  promoFilm: Film,
}

function App({ films, promoFilm }: AppProps): JSX.Element {
  return (
    <Main
      films={films}
      promoFilm={promoFilm}
    />
  );
}

export default App;
