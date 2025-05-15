import vine from '@vinejs/vine'
import { RoleId } from '#enums/roles_enums'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
    firstName: vine.string().trim().optional().requiredWhen('roleId', '=', RoleId.SPEAKER),
    lastName: vine.string().trim().optional().requiredWhen('roleId', '=', RoleId.SPEAKER),
    roleId: vine.number().positive(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    body: vine.object({
      email: vine.string().trim().email().optional(),
      password: vine.string().minLength(6).optional(),
      firstName: vine.string().trim().optional(),
      lastName: vine.string().trim().optional(),
      roleId: vine.number().positive().optional(),
    }),
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const deleteUserValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const getOneUserValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)
