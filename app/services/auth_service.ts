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

    const token = await this.jwt.generate(user)
    await user.load('role')

    return {
      token,
      user,
    }
  }

  async register(userData: User) {
    const user = await User.create(userData)
    const token = await this.jwt.generate(user)
    await user.load('role')

    return {
      token,
      user,
    }
  }

  async me() {
    const user = await this.jwt.getUserOrFail()
    await user.load('role')
    return user
  }
}
