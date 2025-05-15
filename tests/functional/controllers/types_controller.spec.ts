import app from '@adonisjs/core/services/app'
import TypeService from '#services/type_service'
import { test } from '@japa/runner'
import Type from '#models/type'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { createOrganizer } from '#tests/factories/user_factory'

test.group('Type controller', (group) => {
  let organizer: User
  group.setup(async () => {
    // Crée un mock du service
    const mockTypeService = {
      getAll: async () =>
        [
          { id: 1, label: 'Mocked A' },
          { id: 2, label: 'Mocked B' },
        ] as Type[],
      getTypeById: async (id: number) => {
        return { id, label: `Mocked ${id}` } as Type
      },
      createType: async (label: string) => {
        return { id: 3, label } as Type
      },
      updateType: async (id: number, label: string) => {
        return { id, label } as Type
      },
      deleteType: async (id: number) => {
        return { id } as Type
      },
    }
    app.container.bind(TypeService, () => mockTypeService)
    organizer = await createOrganizer()
  })
  group.teardown(() => testUtils.db().truncate())

  test('it should return mocked types', async ({ client, assert }) => {
    const response = await client.get('/api/v1/types').loginAs(organizer)

    response.assertStatus(200)
    const body = response.body()

    assert.isArray(body)
    assert.lengthOf(body, 2)

    assert.deepInclude(body, { id: 1, label: 'Mocked A' })
    assert.deepInclude(body, { id: 2, label: 'Mocked B' })
  })
  test('it should return one mocked type', async ({ client, assert }) => {
    const response = await client.get('/api/v1/organizer/types/5').loginAs(organizer)

    response.assertStatus(200)
    const body = response.body()

    assert.deepEqual(body, { id: 5, label: 'Mocked 5' })
  })

  test('it should create a new type', async ({ client, assert }) => {
    const response = await client
      .post('/api/v1/organizer/types')
      .json({
        label: 'New Mocked Type',
      })
      .loginAs(organizer)

    response.assertStatus(201)
    const body = response.body()

    assert.deepEqual(body, { id: 3, label: 'New Mocked Type' })
  })

  test('it should update a type', async ({ client, assert }) => {
    const response = await client
      .put('/api/v1/organizer/types/10')
      .json({
        label: 'Updated Label',
      })
      .loginAs(organizer)

    response.assertStatus(200)
    const body = response.body()

    assert.deepEqual(body, { id: 10, label: 'Updated Label' })
  })

  test('it should delete a type', async ({ client, assert }) => {
    const response = await client.delete('/api/v1/organizer/types/20').loginAs(organizer)

    response.assertStatus(200)
    const body = response.body()

    assert.deepEqual(body, { id: 20 })
  })
})
