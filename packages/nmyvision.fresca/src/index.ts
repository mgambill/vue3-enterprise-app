import type { App, Plugin } from "vue"
import type { Router, RouteRecordRaw } from "vue-router"

const moduleRegistery: ((router?: Router) => ModuleOption)[] = []

type ModuleOption = {
  name: string,
  routes: RouteRecordRaw[] | ((router: Router) => RouteRecordRaw[]),
  components?: Record<string, any>[]
  plugins?: { install(): void }[]
}
export type DefineModulesOption = ModuleOption | ((router?: Router) => ModuleOption)

export const defineModule = (option: DefineModulesOption) => {
  if (typeof option === 'function')
    moduleRegistery.push(option)
  else
    moduleRegistery.push(() => option)
}


export const useModules: Plugin<Router> = {
  install: (app: App, router): void => {
    moduleRegistery.forEach(m => {
      let opt: DefineModulesOption = m(router)
      //console.log(`🍓 Module: ${opt.name} registerd`);

      if (typeof opt.routes === 'function')
        opt.routes(router).forEach(router.addRoute)
      else
        opt.routes.forEach(router.addRoute)

      opt.plugins?.forEach(app.use)

      if (opt.components) {
        Object
          .entries(opt.components)
          .forEach(([key, comp]) => app.component(key, comp))
      }
    })

  }
}