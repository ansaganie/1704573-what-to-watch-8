import { useEffect } from 'react';

const useScrollToTitle = (filmId: string): void => {
  useEffect(() => {
    window.scrollTo(0, 150);
  }, [ filmId ]);
};

export default useScrollToTitle;
