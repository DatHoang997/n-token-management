import BaseRedux from '@/model/BaseRedux'

class UserRedux extends BaseRedux {
  defineTypes () {
    return ['user']
  }

  defineDefaultState () {
    return {
      wallet: '',
      web3: '',
      username: '',
      isAdmin: false,
      isEditor: false,
    }
  }
}

export default new UserRedux()
