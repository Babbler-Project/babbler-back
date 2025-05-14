import { JwtGuard } from '#auth/gards/jwt.js'

export default class AuthService {
  constructor(private jwt: JwtGuard<any>) {}

  async checkRole() {
    const user = this.jwt.getUserOrFail()
    await user.load('role')
    return user
  }
}
