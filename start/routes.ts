import router from '@adonisjs/core/services/router'
const HealthCheckController = () => import('#controllers/health_check_controller')
const RootController = () => import('#controllers/root_controller')
const ApiInfoController = () => import('#controllers/api_info_controller')
import talkRoutes from '../routes/talk.js'
const TypeController = () => import('#controllers/types_controller')

router.get('/', [RootController])
router.get('/health', [HealthCheckController])

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [ApiInfoController])
        router
          .group(() => {
            router.get('/types', [TypeController, 'index'])
            router.post('/types', [TypeController, 'store'])
            router.get('/types/:id', [TypeController, 'show'])
            router.put('/types/:id', [TypeController, 'update'])
            router.delete('/types/:id', [TypeController, 'destroy'])
          })
          .prefix('organizers')
        talkRoutes()
      })
      .prefix('v1')
  })
  .prefix('api')
