import User from '#models/user'
import { CreateUserRequestDTO, UpdateUserRequestDTO } from '#types/user_types'

export default class UserMapper {
  static fromCreateDTO(dto: CreateUserRequestDTO): User {
    const user = new User()
    user.email = dto.email
    user.password = dto.password
    user.roleId = dto.roleId
    user.firstName = dto.first_name
    user.lastName = dto.last_name
    return user
  }

  static fromUpdateDTO(dto: UpdateUserRequestDTO): User {
    const user = new User()
    user.id = dto.params.id
    user.email = dto.body.email
    user.password = dto.body.password
    user.roleId = dto.body.roleId
    user.firstName = dto.body.first_name
    user.lastName = dto.body.last_name
    return user
  }
}
