import vine from '@vinejs/vine'

/**
 * Validates the talk's creation action
 */
export const createTalkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape(),
    speaker: vine.number().positive(),
    duration: vine.string().trim(), // Validation en tant que chaîne
    manageFeedback: vine.string().trim(),
    statusId: vine.number().positive(),
    levelId: vine.number().positive()
  })
)

/**
 * Validates the talk's update action
 */
export const updateTalkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape(),
    speaker: vine.number().positive(),
    duration: vine.string().trim(), // Validation en tant que chaîne
    manageFeedback: vine.string().trim(),
    statusId: vine.number().positive(),
    levelId: vine.number().positive()
  })
)
