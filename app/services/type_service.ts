import Type from '#models/type'

export default class TypeService {
  async getAll() {
    return await Type.all()
  }
}
