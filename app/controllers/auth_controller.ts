import type { HttpContext } from '@adonisjs/core/http'
import UserMapper from '#mappers/user_mapper'
import { CreateUserRequestDTO } from '#types/user_types'
import { createUserValidator } from '#validators/user_validator'
import AuthService from '#services/auth_service'
import { ErrorHandlerService } from '#services/error_handler_service'

export default class AuthController {
  private readonly errorHandler: ErrorHandlerService

  constructor() {
    this.errorHandler = new ErrorHandlerService()
  }

  async login({ request, auth, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const service = new AuthService(auth.use('jwt'))
      return await service.login(email, password)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'login')
    }
  }

  async register({ request, auth, response }: HttpContext) {
    try {
      const data = request.all()
      const requestDTO: CreateUserRequestDTO = await createUserValidator.validate(data)
      const user = UserMapper.fromCreateDTO(requestDTO)
      const service = new AuthService(auth.use('jwt'))
      return await service.register(user)
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'register')
    }
  }

  async me({ auth, request, response }: HttpContext) {
    try {
      if (!(await auth.check())) {
        throw new Error('Unauthorized')
      }

      const service = new AuthService(auth.use('jwt'))
      return await service.me()
    } catch (error) {
      this.errorHandler.handle(error, { request, response }, 'fetch user data')
    }
  }
}
