import router from '@adonisjs/core/services/router'
const TalkController = () => import('#controllers/talks_controller')

export default function talkRoutes() {
  router.resource('talks', TalkController).apiOnly()
}
