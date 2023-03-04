import type { App, Plugin } from "vue"
import type { Router, RouteRecordRaw } from "vue-router"

let localRouter: Router
const registered = new Set<string>()
const moduleRegistery: ((router?: Router) => ModuleOption)[] = []

type ModuleOption = {
  name: string,
  routes: RouteRecordRaw[] | ((router: Router) => RouteRecordRaw[]),
  components?: Record<string, any>[]
  plugins?: { install(): void }[]
}

export type DefineModulesOption = ModuleOption | ((router?: Router) => ModuleOption)

export const defineModule = (option: DefineModulesOption) => {
  if (registered.has(option.name)) return;// throw new Error(`Module ${option.name} already registered`
  console.log(`🍓 Module: ${option.name} registerd`);
  registered.add(option.name)
  if (typeof option === 'function') {
    let opt = option(localRouter)
    moduleRegistery.push(() => opt)
    addToRouter(opt);
  } else {
    moduleRegistery.push(() => option)
    addToRouter(option);
  }
}

export const registerModuleRoutes = (router: Router) => localRouter = router

function addToRouter(option: ModuleOption) {
  if (typeof option.routes === 'function') {
    option.routes(localRouter).forEach(localRouter.addRoute)
  } else {
    option.routes.forEach(localRouter.addRoute)
  }
}


export const useModules: Plugin<{ router: Router }> = {
  install: (app: App, { router }): void => {
    moduleRegistery.forEach(m => {
      let opt: DefineModulesOption = m(router)
      //console.log(`🍓 Module: ${opt.name} registerd`);

      // if (typeof opt.routes === 'function')
      //   opt.routes(router).forEach(router.addRoute)
      // else
      //   opt.routes.forEach(router.addRoute)

      opt.plugins?.forEach(app.use)

      if (opt.components) {
        Object
          .entries(opt.components)
          .forEach(([key, comp]) => app.component(key, comp))
      }
    })

  }
}