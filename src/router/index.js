import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/admin/users.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import TaskAll from '../views/tasks/TaskAll.vue'
import TaskCreate from '../views/tasks/TaskCreate.vue'
import TaskEdit from '../views/tasks/TaskEdit.vue'
import TaskEditUser from '../views/tasks/TaskEditUser.vue'
import TaskRemove from '../views/tasks/TaskRemove.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/task',
    name: 'TaskAll',
    component: TaskAll
  },
  {
    path: '/task/new',
    name: 'TaskCreate',
    component: TaskCreate
  },
  {
    path: '/task/:id',
    name: 'TaskEdit',
    component: TaskEdit
  },
  {
    path: '/task/remove',
    name: 'Remove',
    component: TaskRemove
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:id',
    name: 'TaskEditUser',
    component: TaskEditUser
  },
  {
    path: '*',
    redirect: '/'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
