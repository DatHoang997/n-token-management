
import NotFound from '@/module/page/error/notfound'
import PermissionDenied from '@/module/page/error/PermissionDenied/'
import AddNewToken from '@/module/page/addNewToken/index'
import Home from '@/module/page/home/index'
import Accept from '@/module/page/acceptToken/index'
import Login from '@/module/page/auth/login'
import Register from '@/module/page/auth/register'

export default [
  // {
  //   path: '/category',
  //   page: Category,
  //   auth: true
  // },
  {
    path: '/403',
    page: PermissionDenied
  },
  {
    path: '/404',
    page: NotFound
  },
  {
    path: '/new',
    page: AddNewToken,
    auth: true,
    editor: true,
    admin: true
  },
  {
    path: '/accept',
    page: Accept,
    auth: true,
    admin: true
  },
  {
    path: '/',
    page: Home,
    auth: true,
  },
  {
    path: '/login',
    page: Login,
  },
  {
    path: '/register',
    page: Register,
  },
  {
    page: NotFound
  }
]
