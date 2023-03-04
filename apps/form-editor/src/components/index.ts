import type { App } from "vue";
import With from './With'

export const useLocalComponents = {
  install: (app: App): void => {
    app.component('With', With)
  }
}