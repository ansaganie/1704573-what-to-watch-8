export enum Genres {
  AllGenres = 'all-genres',
  Comedies = 'comedies',
  Crime = 'crime',
  Documentary = 'documentary',
  Dramas = 'dramas',
  Horror = 'horror',
  KidsAndFamily = 'kids-and-family',
  Romance = 'romance',
  SciFi = 'sci-fi',
  Thrillers = 'thrillers',
}

export type Genre = {
  id: string,
  title: string,
  value: Genres,
};
