import vine from '@vinejs/vine'

export const createTalkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape(),
    speakerId: vine.number().positive(),
    duration: vine.number().positive().max(180),
    levelId: vine.number().positive(),
    typeId: vine.number().positive(),
  })
)

export const updateTalkValidator = vine.compile(
  vine.object({
    body: vine.object({
      title: vine.string().trim().minLength(6),
      description: vine.string().trim().escape(),
      duration: vine.number().positive().max(180),
      levelId: vine.number().positive(),
      typeId: vine.number().positive(),
    }),
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const refusedTalkValidator = vine.compile(
  vine.object({
    body: vine.object({
      message: vine.string().trim().minLength(6),
    }),
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const deleteTalkValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)

export const getOneTalkValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)
