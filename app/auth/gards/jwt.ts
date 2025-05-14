import jwt from 'jsonwebtoken'
import { symbols, errors } from '@adonisjs/auth'
import type { HttpContext } from '@adonisjs/core/http'
import type { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'

/**
 * Bridge entre le User Provider et le Guard
 */
export type JwtGuardUser<RealUser> = {
  getId(): string | number | BigInt
  getOriginal(): RealUser
}

/**
 * Interface du UserProvider pour le guard JWT
 */
export interface JwtUserProviderContract<RealUser> {
  [symbols.PROVIDER_REAL_USER]: RealUser

  createUserForGuard(user: RealUser): Promise<JwtGuardUser<RealUser>>
  findById(identifier: string | number | BigInt): Promise<JwtGuardUser<RealUser> | null>
}

export type JwtGuardOptions = {
  secret: string
}

export class JwtGuard<UserProvider extends JwtUserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  declare [symbols.GUARD_KNOWN_EVENTS]: {}

  driverName: 'jwt' = 'jwt'
  authenticationAttempted: boolean = false
  isAuthenticated: boolean = false
  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]

  #ctx: HttpContext
  #userProvider: UserProvider
  #options: JwtGuardOptions

  constructor(ctx: HttpContext, userProvider: UserProvider, options: JwtGuardOptions) {
    this.#ctx = ctx
    this.#userProvider = userProvider
    this.#options = options
  }

  /**
   * Générer un JWT pour un utilisateur donné
   */
  async generate(user: UserProvider[typeof symbols.PROVIDER_REAL_USER]) {
    const providerUser = await this.#userProvider.createUserForGuard(user)
    const token = jwt.sign({ userId: providerUser.getId() }, this.#options.secret)

    return {
      type: 'bearer',
      token: token,
    }
  }

  /**
   * Authentifier la requête HTTP et retourner l'utilisateur
   */
  async authenticate(): Promise<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {
    if (this.authenticationAttempted) {
      return this.getUserOrFail()
    }

    this.authenticationAttempted = true

    // Extraire le token du header 'Authorization'
    const authHeader = this.#ctx.request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    // Retirer "Bearer " et garder seulement le token
    const token = authHeader.replace('Bearer ', '').trim()

    let payload: any
    try {
      // Vérification du token
      payload = jwt.verify(token, this.#options.secret)
    } catch {
      throw new errors.E_UNAUTHORIZED_ACCESS('Invalid or expired token', {
        guardDriverName: this.driverName,
      })
    }

    // Vérifier que le payload contient un userId
    if (typeof payload !== 'object' || !('userId' in payload)) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Invalid token payload', {
        guardDriverName: this.driverName,
      })
    }

    // Récupérer l'utilisateur avec le userId extrait du payload
    const providerUser = await this.#userProvider.findById(payload.userId)
    if (!providerUser) {
      throw new errors.E_UNAUTHORIZED_ACCESS('User not found', {
        guardDriverName: this.driverName,
      })
    }

    // Authentifier l'utilisateur et stocker les informations
    this.user = providerUser.getOriginal()
    this.isAuthenticated = true
    return this.user
  }

  /**
   * Authentification silencieuse
   */
  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch {
      return false
    }
  }

  /**
   * Récupère l'utilisateur ou déclenche une erreur
   */
  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
    if (!this.user) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    return this.user
  }

  /**
   * Utilisé pendant les tests avec loginAs()
   */
  async authenticateAsClient(
    user: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  ): Promise<AuthClientResponse> {
    const token = await this.generate(user)
    return {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    }
  }
}
