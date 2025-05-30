import vine from '@vinejs/vine'

export const createTypeValidator = vine.compile(
  vine.object({
    label: vine.string().trim().minLength(6),
  })
)

export const updateTypeValidator = vine.compile(
  vine.object({
    label: vine.string().trim().minLength(6),
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const deleteTypeValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const getOneTypeValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)
