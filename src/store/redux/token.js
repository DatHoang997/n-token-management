import BaseRedux from '@/model/BaseRedux'

class tokenRedux extends BaseRedux {
  defineTypes () {
    return ['token']
  }

  defineDefaultState () {
    return {
      listToken: [],
      searchListToken: [],
    }
  }
}

export default new tokenRedux()
