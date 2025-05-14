import vine from '@vinejs/vine'

export const createRoomValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(6),
    capacity: vine.number().positive(),
  })
)

export const updateRoomValidator = vine.compile(
  vine.object({
    body: vine.object({
      name: vine.string().trim().minLength(6),
      capacity: vine.number().positive(),
    }),
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const deleteRoomValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const getOneRoomValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)
