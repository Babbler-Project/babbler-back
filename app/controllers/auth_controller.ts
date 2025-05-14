import { HttpContext } from '@adonisjs/core/http'
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
      const { email, password, roleId } = request.only(['email', 'password', 'roleId'])
      const service = new AuthService(auth.use('jwt'))
      return await service.register(email, password, roleId)
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
