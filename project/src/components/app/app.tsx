import Main from "../main/main";
import {FilmCard} from "../../types/film-card";

type AppProps = {
  smallFilmCards: FilmCard[],
}

function App({ smallFilmCards }: AppProps): JSX.Element {
  return <Main smallFilmCards={smallFilmCards} />;
}

export default App;
