import router from '@adonisjs/core/services/router'
const HealthCheckController = () => import('#controllers/health_check_controller')
const RootController = () => import('#controllers/root_controller')
const ApiInfoController = () => import('#controllers/api_info_controller')
const TalksController = () => import('#controllers/talks_controller')
const TypesController = () => import('#controllers/types_controller')
const RoomsController = () => import('#controllers/rooms_controller')
const PlanningsController = () => import('#controllers/plannings_controller')
const AuthController = () => import('#controllers/auth_controller')
import RoleMiddleware from '#middleware/role_middleware'

import { RoleId } from '#enums/roles_enums'
import { middleware } from './kernel.js'

router.get('/', [RootController])
router.get('/health', [HealthCheckController])

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [ApiInfoController])
        router.get('/types', [TypesController, 'index'])
        router.get('/plannings', [PlanningsController, 'index'])
        router
          .group(() => {
            router.post('/register', [AuthController, 'register'])
            router.post('/login', [AuthController, 'login'])
            router.get('/me', [AuthController, 'me']).use(middleware.auth())
          })
          .prefix('auth')
        router
          .group(() => {
            router.post('/types', [TypesController, 'store'])
            router.get('/types/:id', [TypesController, 'show'])
            router.put('/types/:id', [TypesController, 'update'])
            router.delete('/types/:id', [TypesController, 'destroy'])
            router.get('/rooms', [RoomsController, 'index'])
            router.post('/rooms', [RoomsController, 'store'])
            router.get('/rooms/:id', [RoomsController, 'show'])
            router.put('/rooms/:id', [RoomsController, 'update'])
            router.delete('/rooms/:id', [RoomsController, 'destroy'])
            router.get('/talks', [TalksController, 'pending'])
            router.get('/talks/:id', [TalksController, 'show'])
            router.put('/talks/:id/refused', [TalksController, 'refused'])
            router.post('/plannings', [PlanningsController, 'store'])
          })
          .prefix('organizer')
          .use(async (ctx, next) => {
            const roleMiddleware = new RoleMiddleware()
            await roleMiddleware.handle(ctx, next, { roles: [RoleId.ORGANIZER] })
          })
        router
          .group(() => {
            router.get('/talks', [TalksController, 'index'])
            router.post('/talks', [TalksController, 'store'])
            router.get('/talks/:id', [TalksController, 'show'])
            router.put('/talks/:id', [TalksController, 'update'])
            router.delete('/talks/:id', [TalksController, 'destroy'])
          })
          .prefix('speaker')
          .use(async (ctx, next) => {
            const roleMiddleware = new RoleMiddleware()
            await roleMiddleware.handle(ctx, next, { roles: [RoleId.SPEAKER] })
          })
      })
      .prefix('v1')
  })
  .prefix('api')
