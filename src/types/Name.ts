import { Gender } from "./Gender"

export interface Name {
	id: string
	value: string
	translations?: string
	meaning?: string
	gender: Gender
}
