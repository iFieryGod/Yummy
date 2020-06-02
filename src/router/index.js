import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/admin/users.vue'
import UsersRemove from '../views/admin/usersRemove.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import TaskAll from '../views/tasks/TaskAll.vue'
import TaskCreate from '../views/tasks/TaskCreate.vue'
import TaskEdit from '../views/tasks/TaskEdit.vue'
import TaskEditUser from '../views/tasks/TaskEditUser.vue'
import TaskRemove from '../views/tasks/TaskRemove.vue'

const isLoggedIn = true

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
    component: Login, 
    beforeEnter: (to, from, next) => {
      if(!isLoggedIn) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register, 
    beforeEnter: (to, from, next) => {
      if(!isLoggedIn) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/task',
    name: 'TaskAll',
    component: TaskAll, 
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/task/new',
    name: 'TaskCreate',
    component: TaskCreate, 
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/task/:id',
    name: 'TaskEdit',
    component: TaskEdit, 
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/task/remove/:id',
    name: 'Remove',
    component: TaskRemove, 
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users, 
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/users/:id',
    name: 'TaskEditUser',
    component: TaskEditUser, 
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/users/remove/:id',
    name: 'TaskRemoveUser',
    component: UsersRemove,
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next();
      } else{
        next('/login');
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
