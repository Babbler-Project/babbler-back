import { test } from '@japa/runner'
import TypeService from '#services/type_service'
import { createType, createManyTypes } from '#factories/type_factory'
import Type from '#models/type'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Type Service', (group) => {
  const service = new TypeService()

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('getAll - it should return all types', async ({ assert }) => {
    await createManyTypes(3)

    const types = await service.getAll()

    assert.lengthOf(types, 3)
    assert.instanceOf(types[0], Type)
  })

  test('getTypeById - it should return a single type', async ({ assert }) => {
    const created = await createType()
    const found = await service.getTypeById(created.id)

    assert.equal(found.id, created.id)
    assert.equal(found.label, created.label)
  })

  test('createType - it should create a new type', async ({ assert }) => {
    const created = await service.createType('My New Type')

    assert.exists(created.id)
    assert.equal(created.label, 'My New Type')
  })

  test('updateType - it should update an existing type', async ({ assert }) => {
    const type = await createType({ label: 'Old Label' })

    const updated = await service.updateType(type.id, 'Updated Label')

    assert.equal(updated.label, 'Updated Label')
    assert.equal(updated.id, type.id)
  })

  test('deleteType - it should remove a type', async ({ assert }) => {
    const type = await createType()

    const deleted = await service.deleteType(type.id)

    assert.equal(deleted.id, type.id)

    const found = await Type.find(type.id)
    assert.isNull(found)
  })
})
