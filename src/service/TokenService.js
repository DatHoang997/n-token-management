import BaseService from '../model/BaseService'
import axios from 'axios'
import {thousands} from '@/util/help.js'

let API_URL = process.env.SERVER_URL
const API = {
  POST_SAVE_TOKEN : API_URL + '/token/save_token/',
  GET_TOKEN : API_URL + '/token/get_token/',
  PUT_EDIT_TOKEN : API_URL + '/token/edit_token/',
  GET_WAITING_TOKEN : API_URL + '/token/get_waiting_token/',
  ACCEPT_TOKEN : API_URL + '/token/accept_token/',
  GET_ACCEPTED_TOKEN : API_URL + '/token/get_accepted_token/',
  DELETE_TOKEN : API_URL + '/token/delete_token/',
  POST_SAVE_NETWORK : API_URL + '/token/save_Network/',
  GET_NETWORK : API_URL + '/token/get_network/',
  PUT_EDIT_NETWORK : API_URL + '/token/edit_Network/',
  DELETE_NETWORK : API_URL + '/token/delete_network/',
}

export default class extends BaseService {
  async saveToken(name, network, symbol, decimal, cmcID = '', cgkId = '', apiSymbol = '', chainType = '', address = '', logo = '', formatAddress = '', segWit) {
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
    if (segWit) {
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
      console.log(error)
      return error;
    }
  }

  async getToken () {
    const that = this
    const tokenRedux = this.store.getRedux('token')
    axios.get(API.GET_ACCEPTED_TOKEN)
      .then(function (response) {
        var data = response.data.data
        that.dispatch(tokenRedux.actions.listToken_update(''))
        that.dispatch(tokenRedux.actions.searchListToken_update(''))
        that.dispatch(tokenRedux.actions.listToken_update(data))
        that.dispatch(tokenRedux.actions.searchListToken_update(data))
      })
  }

  async getWaitingToken () {
    const that = this
    const tokenRedux = this.store.getRedux('token')
    axios.get(API.GET_WAITING_TOKEN)
      .then(function (response) {
        var data = response.data.data
        that.dispatch(tokenRedux.actions.listWaitingAccept_update(''))
        that.dispatch(tokenRedux.actions.searchListWaitingAccept_update(''))
        that.dispatch(tokenRedux.actions.listWaitingAccept_update(data))
        that.dispatch(tokenRedux.actions.searchListWaitingAccept_update(data))
      })
  }


  async deleteToken (_id, key, type) {
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

  async editToken(_id, name, network, symbol, decimal, cmcID, cgkId, apiSymbol, chainType, address, logo, formatAddress, segWit, key, type) {
    var that = this
    const tokenRedux = this.store.getRedux('token')
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
    formData.append("segWit", segWit)
    try {
      let response = await axios.put(API.PUT_EDIT_TOKEN, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      if (response.data.status == 1) {
        that.dispatch(tokenRedux.actions.response_update(''))
        that.dispatch(tokenRedux.actions.response_update(true))
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
        }
        that.dispatch(tokenRedux.actions.listToken_update(listToken))
        that.dispatch(tokenRedux.actions.searchListToken_update(searchListToken))
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
        }
        that.dispatch(tokenRedux.actions.listWaitingAccept_update(listWaitingAccept))
        that.dispatch(tokenRedux.actions.searchListWaitingAccept_update(searchListWaitingAccept))
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

  async saveNetwork(network, explorer) {
    let formData = new FormData()
    formData.append("network", network)
    formData.append("explorer", explorer)
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
    const tokenRedux = this.store.getRedux('token')
    axios.get(API.GET_NETWORK)
      .then(function (response) {
        var data = response.data.data
        that.dispatch(tokenRedux.actions.listNetWork_update(''))
        that.dispatch(tokenRedux.actions.searchListNetWork_update(''))
        that.dispatch(tokenRedux.actions.listNetWork_update(data))
        that.dispatch(tokenRedux.actions.searchListNetWork_update(data))
      })
  }

  async editNetwork(_id, network, explorer) {
    var that = this
    const tokenRedux = this.store.getRedux('token')
    let formData = new FormData()
    formData.append("_id", _id)
    formData.append("network", network)
    formData.append("explorer", explorer)
    try {
      let response = await axios.put(API.PUT_EDIT_NETWORK, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      if (response.data.status == 1) {
        that.dispatch(tokenRedux.actions.response_update(''))
        that.dispatch(tokenRedux.actions.response_update(true))
      }
      this.getNetwork()
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteNetwork (_id, key) {
    if (_id) {
      let response = await axios.delete(API.DELETE_NETWORK + _id)
      this.getNetwork()
      return response
    } else {
      return "Error"
    }
  }
}
