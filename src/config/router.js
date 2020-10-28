
import NotFound from '@/module/page/error/notfound'
import PermissionDenied from '@/module/page/error/PermissionDenied/'
import AddNewToken from '@/module/page/addNewToken/index'
import AddNewNetWork from '@/module/page/addNewNetwork/index'
import Home from '@/module/page/home/index'
import NetworkList from '@/module/page/networkList/index'
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
    path: '/newToken',
    page: AddNewToken,
    editor: true,
    admin: true
  },
  {
    path: '/newNetwork',
    page: AddNewNetWork,
    admin: true
  },
  {
    path: '/networkList',
    page: NetworkList,
  },
  {
    path: '/accept',
    page: Accept,
    admin: true
  },
  {
    path: '/',
    page: Home,
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
