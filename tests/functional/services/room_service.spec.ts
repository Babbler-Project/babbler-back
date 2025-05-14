import { test } from '@japa/runner'
import { createRoom, createManyRooms } from '#factories/room_factory'
import RoomService from '#services/room_service'
import Room from '#models/room'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('room service', (group) => {
  const service = new RoomService()

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('getAll - it should return all rooms', async ({ assert }) => {
    await createManyRooms(4)

    const rooms = await service.getAll()

    assert.lengthOf(rooms, 4)
    assert.instanceOf(rooms[0], Room)
  })

  test('getRoomById - it should return a single rooms', async ({ assert }) => {
    const created = await createRoom()
    const found = await service.getRoomById(created.id)

    assert.equal(found.id, created.id)
    assert.equal(found.name, created.name)
    assert.equal(found.capacity, created.capacity)
  })

  test('createRoom - it should create a new room', async ({ assert }) => {
    const created = await service.createRoom({ name: 'My New Room', capacity: 20 })

    assert.exists(created.id)
    assert.equal(created.name, 'My New Room')
    assert.equal(created.capacity, 20)
  })

  test('updateRoom - it should update an existing room', async ({ assert }) => {
    const room = await createRoom({ name: 'Old room' })

    const updated = await service.updateRoom(room.id, { name: 'Updated Name', capacity: 30 })

    assert.equal(updated.name, 'Updated Name')
    assert.equal(updated.id, room.id)
    assert.equal(updated.capacity, 30)
  })

  test('deleteRoom - it should remove a room', async ({ assert }) => {
    const room = await createRoom()

    const deleted = await service.deleteRoom(room.id)

    assert.equal(deleted.id, room.id)

    const found = await Room.find(room.id)
    assert.isNull(found)
  })
})
