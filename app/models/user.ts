import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'

// Mixin pour l'authentification et la gestion du mot de passe
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'], // Utilisation de l'email comme identifiant unique
  passwordColumnName: 'password', // Colonne pour le mot de passe
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare roleId: number

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Configuration pour l'authentification par tokens
  static accessTokens = DbAccessTokensProvider.forModel(User)
}
