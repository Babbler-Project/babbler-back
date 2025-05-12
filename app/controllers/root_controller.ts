import type { HttpContext } from '@adonisjs/core/http'

export default class RootController {
  /**
   * Display the root information
   */
  async handle({ response }: HttpContext) {
    return response.status(200).json({
      name: 'babbler-back',
      description: 'Babbler backend service',
      versions: [
        { version: 'v1', url: '/api/v1', status: 'current' },
        // Future versions can be added here
      ],
      timestamp: new Date().toISOString(),
      status: 'WIP',
      documentation: 'https://gofast-cdn.atlassian.net/wiki/x/DgGcAQ',
    })
  }
}
