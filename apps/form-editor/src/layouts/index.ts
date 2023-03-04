import type { App } from "vue";
import DefaultLayout from './Default.vue'

export const useLayouts = {
  install: (app: App): void => {
    app.component('DefaultLayout', DefaultLayout)
  }
}