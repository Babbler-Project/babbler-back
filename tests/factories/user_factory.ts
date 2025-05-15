import Role from '#models/role'
import User from '#models/user'
import { RoleId } from '#enums/roles_enums'

export async function createOrganizer(overrides: Partial<User> = {}) {
  const organizerRole = await Role.firstOrCreate({ id: RoleId.ORGANIZER }, { role: 'Organizer' })

  return await User.create({
    email: 'organizer@test.com',
    password: 'password',
    roleId: organizerRole.id,
    ...overrides,
  })
}

// Tu peux ajouter d’autres helpers aussi :
export async function createSpeaker(overrides: Partial<User> = {}) {
  const speakerRole = await Role.firstOrCreate({ id: RoleId.SPEAKER }, { role: 'Speaker' })

  return User.create({
    email: 'speaker@test.com',
    password: 'password',
    roleId: speakerRole.id,
    ...overrides,
  })
}

export async function createUser(overrides: Partial<User> = {}) {
  const userRole = await Role.firstOrCreate({ id: RoleId.USER }, { role: 'User' })

  return await User.create({
    email: 'user@test.com',
    password: 'password',
    roleId: userRole.id,
    ...overrides,
  })
}
