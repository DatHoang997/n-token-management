
import NotFound from '@/module/page/error/notfound'
import AddNewToken from '@/module/page/addNewToken/index'
import Home from '@/module/page/home/index'

export default [
  // {
  //   path: '/category',
  //   page: Category,
  //   auth: true
  // },
  {
    path: '/404',
    page: NotFound
  },
  {
    path: '/new',
    page: AddNewToken,
  },
  {
    path: '/',
    page: Home,
  },
  {
    page: NotFound
  }
]
