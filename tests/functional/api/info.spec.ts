import { test } from '@japa/runner'

test.group('Api info', () => {
  test('should return health response', async ({ assert, client }) => {
    // Effectuer une requête GET vers l'endpoint de l'API info
    const response = await client.get('/api/v1')

    // Vérifier le code de statut HTTP
    response.assertStatus(200)

    // Vérifier la structure de la réponse
    assert.properties(response.body(), ['name', 'description', 'version', 'timestamp', 'status'])

    // Vérifier les valeurs spécifiques
    assert.equal(response.body().name, 'babbler-back')
    assert.equal(response.body().description, 'Babbler backend service')
    assert.equal(response.body().version, '1.0.0')
    assert.equal(response.body().status, 'WIP')

    // Vérifier que timestamp est une date ISO valide
    assert.doesNotThrow(() => new Date(response.body().timestamp))
  })
})
