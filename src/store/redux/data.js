import BaseRedux from '@/model/BaseRedux'

class dataRedux extends BaseRedux {
  defineTypes () {
    return ['data']
  }

  defineDefaultState () {
    return {
      listToken: [],
      searchListToken: [],
      listWaitingAccept: [],
      searchListWaitingAccept : [],
      listNetWork: [],
      searchListNetWork: [],
      searchListDapp: [],
      listDapp: [],
      response : false,
    }
  }
}

export default new dataRedux()
