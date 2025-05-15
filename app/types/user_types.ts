export interface CreateUserRequestDTO {
  email: string
  password: string
  roleId: number
  first_name?: string
  last_name?: string
}

export interface UpdateUserRequestDTO {
  body: {
    email: string
    password: string
    roleId: number
    first_name?: string
    last_name?: string
  }
  params: {
    id: number
  }
}
