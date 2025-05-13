import Type from '#models/type'

export default class TypeService {
  async getAll() {
    return await Type.all()
  }

  async create(label: string) {
    const type = new Type()
    type.label = label
    return await type.save()
  }
}
