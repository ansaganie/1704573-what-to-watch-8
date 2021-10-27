export type Review = {
  id: string,
  user: User,
  rating: number,
  comment: string,
  date: Date,
}

type User = {
  id: string,
  name: string,
}
