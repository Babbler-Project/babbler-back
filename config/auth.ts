import { defineConfig } from '@adonisjs/auth'
import env from '#start/env'
import { JwtGuard } from '#auth/gards/jwt'
import User from '#models/user'
import { symbols } from '@adonisjs/auth'

const jwtConfig = {
  secret: env.get('APP_KEY'), 
}

const userProvider = {
  [symbols.PROVIDER_REAL_USER]: User,

  async createUserForGuard(user: User) { 
    return {
      getId() {
        return user.id 
      },
      getOriginal() {
        return user 
      },
    }
  },

  async findById(id: string) {
    const user = await User.find(id)
    if (!user) {
      return null 
    }
    return {
      getId() {
        return user.id
      },
      getOriginal() {
        return user
      },
    }
  },
}

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    },
  },
})

export default authConfig
