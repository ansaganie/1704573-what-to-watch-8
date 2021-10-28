export type ReviewForm = {
  rating: number,
  comment: string,
}

export type Review = ReviewForm & {
  id: string,
  user: User,
  date: Date,
}

type User = {
  id: string,
  name: string,
}
