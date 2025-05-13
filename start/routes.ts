import router from '@adonisjs/core/services/router'
const HealthCheckController = () => import('#controllers/health_check_controller')
const RootController = () => import('#controllers/root_controller')
const ApiInfoController = () => import('#controllers/api_info_controller')
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
            router.put('/types/:id', [TypeController, 'update'])
          })
          .prefix('organizers')
      })
      .prefix('v1')
  })
  .prefix('api')
