import '@japa/assert'
import '@japa/api-client'
import type User from '#models/user'

declare module '@japa/api-client' {
  interface ApiRequest {
    loginAs(user: User): this
  }
}
