import { useEffect } from 'react';
import { FilmId } from '../types/film';

const X_VALUE = 0;
const Y_VALUE = 150;


const useScrollToTitle = (filmId: FilmId): void => {
  useEffect(() => {
    window.scrollTo(X_VALUE, Y_VALUE);
  }, [ filmId ]);
};

export default useScrollToTitle;
