import vine from '@vinejs/vine'

export const getPlanningDuringPeriod = vine.compile(
  vine.object({
    queries: vine.object({
      startDate: vine.string(),
      endDate: vine.string(),
    }),
  })
)
export const createPlanningValidator = vine.compile(
  vine.object({
    startDateTime: vine.date().transform((date) => new Date(date)),
    endDateTime: vine.date().transform((date) => new Date(date)),
    roomId: vine.number().positive(),
    talkId: vine.number().positive(),
  })
)
