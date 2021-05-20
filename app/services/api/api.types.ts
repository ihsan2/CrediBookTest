import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string,
  email: string,
  avatar: string,
  gender: string,
  country: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
