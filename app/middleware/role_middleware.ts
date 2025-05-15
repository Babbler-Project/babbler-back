import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

/**
 * Middleware pour vérifier que l'utilisateur possède le bon rôle
 */
export default class RoleMiddleware {
  /**
   * Vérifier le rôle d'utilisateur avec ID (ou noms si nécessaire)
   * Exemple d'options : { roles: [2, 3] } ou { roles: ['speaker', 'organizer'] }
   */
  async handle(ctx: HttpContext, next: NextFn, options: { roles: (number | string)[] }) {
    // Authentifier l'utilisateur
    await ctx.auth.authenticate()

    const user = ctx.auth.user! as User

    // Charger la relation 'role' de l'utilisateur si ce n'est pas déjà fait
    if (!user.role) {
      await user.load('role')
    }

    const userRoleId = user.roleId
    const userRoleName = user.role.role // Si tu utilises des noms au lieu d'ID

    // Vérifier si le rôle de l'utilisateur correspond à l'un des rôles autorisés
    if (!options.roles.includes(userRoleId) && !options.roles.includes(userRoleName)) {
      return ctx.response.unauthorized({ message: 'Access denied, insufficient permissions.' })
    }

    // Si l'utilisateur a le bon rôle, on laisse passer la requête
    await next()
  }
}
