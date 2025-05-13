import { test } from '@japa/runner'

test.group('Api info controller', () => {
  test('it should return health response', async ({ assert, client }) => {
    const response = await client.get('/api/v1')
    response.assertStatus(200)

    assert.properties(response.body(), ['name', 'description', 'version', 'timestamp', 'status'])

    assert.equal(response.body().name, 'babbler-back')
    assert.equal(response.body().description, 'Babbler backend service')
    assert.equal(response.body().version, '1.0.0')
    assert.equal(response.body().status, 'WIP')

    assert.doesNotThrow(() => new Date(response.body().timestamp))
  })
})
