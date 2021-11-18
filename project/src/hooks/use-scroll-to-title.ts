import { useEffect } from 'react';
import { FilmId } from '../types/film';

const useScrollToTitle = (filmId: FilmId): void => {
  useEffect(() => {
    window.scrollTo(0, 150);
  }, [ filmId ]);
};

export default useScrollToTitle;
