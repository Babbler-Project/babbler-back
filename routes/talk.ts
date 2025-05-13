import router from '@adonisjs/core/services/router'
const TalkController = () => import('#controllers/talk_controller')

export default function talkRoutes() {
  router.resource('talks', TalkController).apiOnly()
}
