export interface CreateTalkRequestDTO {
  title: string
  description: string
  duration: number
  levelId: number
  typeId: number
}

export interface UpdateTalkRequestDTO {
  body: {
    title: string
    description: string
    duration: number
    levelId: number
    typeId: number
  }
  params: {
    id: number
  }
}
export interface RefusedTalkRequestDTO {
  body: {
    message: string
  }
  params: {
    id: number
  }
}
