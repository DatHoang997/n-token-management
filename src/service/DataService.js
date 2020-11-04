import BaseService from '../model/BaseService'
import axios from 'axios'
import {thousands} from '@/util/help.js'

let API_URL = process.env.SERVER_URL
const API = {
  POST_SAVE_TOKEN : API_URL + '/tokens/save_token/',
  GET_TOKEN : API_URL + '/tokens/get_token/',
  PUT_EDIT_TOKEN : API_URL + '/tokens/edit_token/',
  GET_WAITING_TOKEN : API_URL + '/tokens/get_waiting_token/',
  ACCEPT_TOKEN : API_URL + '/tokens/accept_token/',
  GET_ACCEPTED_TOKEN : API_URL + '/tokens/get_accepted_token/',
  DELETE_TOKEN : API_URL + '/tokens/delete_token/',
  POST_SAVE_NETWORK : API_URL + '/tokens/save_network/',
  GET_NETWORK : API_URL + '/tokens/get_network/',
  PUT_EDIT_NETWORK : API_URL + '/tokens/edit_network/',
  DELETE_NETWORK : API_URL + '/tokens/delete_network/',
  POST_SAVE_DAPP : API_URL + '/tokens/save_dapp/',
  GET_DAPP : API_URL + '/tokens/get_dapp/',
  PUT_EDIT_DAPP : API_URL + '/tokens/edit_dapp/',
  DELETE_DAPP : API_URL + '/tokens/delete_dapp/',
}

export default class extends BaseService {
  async saveToken(name, network, symbol, decimal, cmcID = '', cgkId = '', apiSymbol = '', chainType = '', address = '', logo = '', formatAddress = '', segWit, suffix = '') {
    let formData = new FormData()
    formData.append("name", name)
    formData.append("network", network)
    formData.append("symbol", symbol)
    formData.append("decimal", decimal)
    formData.append("cmcId", cmcID)
    formData.append("cgkId", cgkId)
    formData.append("apiSymbol", apiSymbol)
    formData.append("chainType", chainType)
    formData.append("address", address)
    formData.append("logo", logo)
    formData.append("format_address", formatAddress)
    formData.append("suffix", suffix)
    if (segWit == true || segWit == false) {
      formData.append("segWit", segWit)
    }
    try {
      let response = await axios.post(API.POST_SAVE_TOKEN, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      if (response.data.status == 1) {
        return response;
      } else {
        return false
      }
    } catch (error) {
      return error;
    }
  }

  async getToken () {
    const that = this
    const dataRedux = this.store.getRedux('data')
    axios.get(API.GET_ACCEPTED_TOKEN)
      .then(function (response) {
        var data = response.data.data
        console.log('data',data)
        that.dispatch(dataRedux.actions.listToken_update(''))
        that.dispatch(dataRedux.actions.searchListToken_update(''))
        that.dispatch(dataRedux.actions.listToken_update(data))
        that.dispatch(dataRedux.actions.searchListToken_update(data))
      })
  }

  async getWaitingToken () {
    const that = this
    const dataRedux = this.store.getRedux('data')
    axios.get(API.GET_WAITING_TOKEN)
      .then(function (response) {
        var data = response.data.data
        that.dispatch(dataRedux.actions.listWaitingAccept_update(''))
        that.dispatch(dataRedux.actions.searchListWaitingAccept_update(''))
        that.dispatch(dataRedux.actions.listWaitingAccept_update(data))
        that.dispatch(dataRedux.actions.searchListWaitingAccept_update(data))
      })
  }


  async deleteToken (_id, type) {
    if (type == 'home') {
      if (_id) {
        let response = await axios.delete(API.DELETE_TOKEN + _id)
        this.getToken()
        return response;
      } else {
        return "Error"
      }
    } else if (type == 'accept') {
      if (_id) {
        let response = await axios.delete(API.DELETE_TOKEN + _id)
        this.getWaitingToken()
        return response;
      } else {
        return "Error"
      }
    }
  }

  async editToken(_id, name, network, symbol, decimal, cmcID, cgkId, apiSymbol, chainType, address, logo, formatAddress, segWit, suffix, type) {
    var that = this
    const dataRedux = this.store.getRedux('data')
    let formData = new FormData()
    formData.append("_id", _id)
    formData.append("name", name)
    formData.append("network", network)
    formData.append("symbol", symbol)
    formData.append("decimal", decimal)
    formData.append("cmcId", cmcID)
    formData.append("cgkId", cgkId)
    formData.append("apiSymbol", apiSymbol)
    formData.append("chainType", chainType)
    formData.append("address", address)
    formData.append("logo", logo)
    formData.append("format_address", formatAddress)
    formData.append("suffix", suffix)
    formData.append("segWit", segWit)
    try {
      console.log('try')
      let response = await axios.put(API.PUT_EDIT_TOKEN, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      console.log('response', response)
      if (response.data.status == 1) {
        that.dispatch(dataRedux.actions.response_update(''))
        that.dispatch(dataRedux.actions.response_update(true))
      }
      if (type == 'home') {
        let listToken = that.store.getState().token.listToken
        let searchListToken = that.store.getState().token.searchListToken
        listToken[key] = {
          name: name,
          network: network,
          symbol: symbol,
          decimal: decimal,
          cmcId: cmcId,
          cgkId: cgkId,
          apiSymbol: apiSymbol,
          chainType: chainType,
          address: address,
          logo: logo,
          format_address: formatAddress,
          segWit: segWit,
          suffix: suffix
        }
        searchListToken[key] = {
          name: name,
          network: network,
          symbol: symbol,
          decimal: decimal,
          cmcId: cmcId,
          cgkId: cgkId,
          apiSymbol: apiSymbol,
          chainType: chainType,
          address: address,
          logo: logo,
          format_address: formatAddress,
          segWit: segWit,
          suffix: suffix
        }
        that.dispatch(dataRedux.actions.listToken_update(listToken))
        that.dispatch(dataRedux.actions.searchListToken_update(searchListToken))
        return response;
      }else if (type == 'accept') {
        let listWaitingAccept = that.store.getState().token.listWaitingAccept
        let searchListWaitingAccept = that.store.getState().token.searchListWaitingAccept
        listWaitingAccept[key] = {
          name: name,
          network: network,
          symbol: symbol,
          decimal: decimal,
          cmcIdL: cmcID,
          cgkId: cgkId,
          apiSymbol: apiSymbol,
          chainType: chainType,
          address: address,
          logo: logo,
          format_address: formatAddress,
          segWit: segWit,
          suffix: suffix
        }
        searchListWaitingAccept[key] = {
          name: name,
          network: network,
          symbol: symbol,
          decimal: decimal,
          cmcIdL: cmcID,
          cgkId: cgkId,
          apiSymbol: apiSymbol,
          chainType: chainType,
          address: address,
          logo: logo,
          format_address: formatAddress,
          segWit: segWit,
          suffix: suffix
        }
        that.dispatch(dataRedux.actions.listWaitingAccept_update(listWaitingAccept))
        that.dispatch(dataRedux.actions.searchListWaitingAccept_update(searchListWaitingAccept))
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async acceptToken (_id) {
    let formData = new FormData()
    formData.append("_id", _id)
    let response = await axios.put(API.ACCEPT_TOKEN, formData,
      {
        headers: {"Content-Type": "multipart/form-data"}
      }
    )
    this.getWaitingToken()
    this.getToken()
    return response
  }

  async saveNetwork(network, explorer, segWit) {
    let formData = new FormData()
    formData.append("network", network)
    formData.append("explorer", explorer)
    formData.append("segWit", segWit)
    try {
      let response = await axios.post(API.POST_SAVE_NETWORK, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      return response;
    } catch (error) {
      return error;
    }
  }

  async getNetwork () {
    const that = this
    const dataRedux = this.store.getRedux('data')
    axios.get(API.GET_NETWORK)
      .then(function (response) {
        var data = response.data.data
        that.dispatch(dataRedux.actions.listNetWork_update(''))
        that.dispatch(dataRedux.actions.searchListNetWork_update(''))
        that.dispatch(dataRedux.actions.listNetWork_update(data))
        that.dispatch(dataRedux.actions.searchListNetWork_update(data))
      })
  }

  async editNetwork(_id, network, explorer, segWit) {
    var that = this
    const dataRedux = this.store.getRedux('data')
    let formData = new FormData()
    formData.append("_id", _id)
    formData.append("network", network)
    formData.append("explorer", explorer)
    formData.append("segWit", segWit)
    try {
      let response = await axios.put(API.PUT_EDIT_NETWORK, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      if (response.data.status == 1) {
        that.dispatch(dataRedux.actions.response_update(''))
        that.dispatch(dataRedux.actions.response_update(true))
      }
      this.getNetwork()
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteNetwork (name) {
    if (name) {
      let response = await axios.delete(API.DELETE_NETWORK + name)
      if (response.data.message == false) {
        return false
      }
      this.getNetwork()
      return response
    } else {
      return "Error"
    }
  }

  async saveDapp(name, title, url, img, network) {
    console.log('save', name)
    let formData = new FormData()
    formData.append("name", name)
    formData.append("title", title)
    formData.append("url", url)
    formData.append("img", img)
    formData.append("network", network)
    try {
      let response = await axios.post(API.POST_SAVE_DAPP, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      return response;
    } catch (error) {
      return error;
    }
  }

  async getDapp () {
    const that = this
    const dataRedux = this.store.getRedux('data')
    axios.get(API.GET_DAPP)
      .then(function (response) {
        var data = response.data.data
        that.dispatch(dataRedux.actions.listDapp_update(''))
        that.dispatch(dataRedux.actions.searchListDapp_update(''))
        that.dispatch(dataRedux.actions.listDapp_update(data))
        that.dispatch(dataRedux.actions.searchListDapp_update(data))
      })
  }

  async editDapp(_id, name, title, url, img, network) {
    var that = this
    const dataRedux = this.store.getRedux('data')
    let formData = new FormData()
    formData.append("_id", _id)
    formData.append("name", name)
    formData.append("title", title)
    formData.append("url", url)
    formData.append("img", img)
    formData.append("network", network)
    try {
      let response = await axios.put(API.PUT_EDIT_DAPP, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      if (response.data.status == 1) {
        that.dispatch(dataRedux.actions.response_update(''))
        that.dispatch(dataRedux.actions.response_update(true))
      }
      this.getDapp()
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteDapp (_id) {
    if (_id) {
      let response = await axios.delete(API.DELETE_DAPP + _id)
      this.getDapp()
      return response
    } else {
      return "Error"
    }
  }
}
