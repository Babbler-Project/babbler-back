import { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'

export default class AuthController {
  async login({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const service = new AuthService(auth.use('jwt'))
    return await service.login(email, password)
  }

  async register({ request, auth }: HttpContext) {
    const { email, password, roleId } = request.only(['email', 'password', 'roleId'])
    const service = new AuthService(auth.use('jwt'))
    return await service.register(email, password, roleId)
  }

  async me({ auth }: HttpContext) {
    if (!(await auth.check())) {
      throw new Error('Unauthorized')
    }

    const service = new AuthService(auth.use('jwt'))
    return await service.me()
  }

  
}
