export type ReviewForm = {
  rating: number,
  comment: string,
}

export type Review = ReviewForm & {
  id: string,
  user: ReviewUser,
  date: Date,
}

export type ReviewUser = {
  id: string,
  name: string,
}

export type FilmReview = {
  [filmId: string]:  Review[]
}
