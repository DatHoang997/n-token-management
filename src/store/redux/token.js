import BaseRedux from '@/model/BaseRedux'

class tokenRedux extends BaseRedux {
  defineTypes () {
    return ['token']
  }

  defineDefaultState () {
    return {
      listToken: [],
      searchListToken: [],
      listWaitingAccept: [],
      searchListWaitingAccept : [],
    }
  }
}

export default new tokenRedux()
