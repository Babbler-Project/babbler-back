import Talk from '#models/talk'
import {
  CreateTalkRequestDTO,
  RefusedTalkRequestDTO,
  UpdateTalkRequestDTO,
} from '#types/talk_types'

export default class TalkMapper {
  static fromCreateDTO(dto: CreateTalkRequestDTO): Talk {
    const talk = new Talk()
    talk.title = dto.title
    talk.description = dto.description
    talk.duration = dto.duration
    return talk
  }

  static fromUpdateDTO(dto: UpdateTalkRequestDTO): Talk {
    const talk = new Talk()
    talk.id = dto.params.id
    talk.title = dto.body.title
    talk.description = dto.body.description
    talk.duration = dto.body.duration
    return talk
  }

  static fromRefusedDTO(dto: RefusedTalkRequestDTO): Talk {
    const talk = new Talk()
    talk.id = dto.params.id
    talk.messageFeedback = dto.body.message
    return talk
  }
}
