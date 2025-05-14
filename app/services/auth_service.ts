import User from '#models/user'
import { JwtGuard } from '#auth/gards/jwt.js'
import hash from '@adonisjs/core/services/hash'

export default class AuthService {
  constructor(private jwt: JwtGuard<any>) {}

  async login(email: string, password: string) {
    const user = await User.findBy('email', email)

    if (!user || !(await hash.verify(user.password, password))) {
      throw new Error('Invalid credentials')
    }

    return this.jwt.generate(user)
  }

  async register(email: string, password: string, roleId: number) {
    const user = await User.create({ email, password, roleId })
    return this.jwt.generate(user)
  }

  async me() {
    const user = this.jwt.getUserOrFail()
    await user.load('role')
    return user
  }
}
