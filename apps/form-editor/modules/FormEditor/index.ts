import { defineModule } from '@nmyvision/fresca'
import IndexView from './views/Index.vue'

export default defineModule({
  name: 'form-editor',
  routes: [
    {
      path: '/editor',
      name: 'form-editor-index',
      component: IndexView
    }
  ]
})