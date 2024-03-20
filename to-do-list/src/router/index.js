import Vue from 'vue'
import Router from 'vue-router'
import WrapperComponent from '@/components/Wrapper-Component.vue'
import NotesComponent from '@/components/Notes-Component.vue'
import TodosComponent from '@/components/Todos-Component.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WrapperComponent',
      component: WrapperComponent,
    },

    {
      path: '/notes',
      name: 'NotesComponent',
      component: NotesComponent,
    },

    {
      path: '/todos',
      name: 'TodosComponent',
      component: TodosComponent,
    },
  ],
})
