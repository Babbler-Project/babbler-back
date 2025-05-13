import type { HttpContext } from '@adonisjs/core/http'

export default class ApiInfoController {
  /**
   * Display API information and version details
   */
  async handle({ response }: HttpContext) {
    return response.status(200).json({
      name: 'babbler-back',
      description: 'Babbler backend service',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      status: 'WIP',
    })
  }
}
