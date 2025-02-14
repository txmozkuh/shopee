type Role = 'User' | 'Admin'

export interface User {
  _id: string
  roles: Role[]
  email: string
  name?: string
  date_of_birth?: string //iso 8610
  address?: string
  phone?: string
  avatar?: string
  createAt: string
  updateAt: string
  __v: number
}

export type UpdateUserBody = Omit<User, 'id' | 'roles' | 'createAt' | 'updateAt' | 'email'> & {
  password?: string
  new_password?: string
}
