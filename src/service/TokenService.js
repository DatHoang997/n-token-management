import BaseService from '../model/BaseService'
import axios from 'axios'
import {thousands} from '@/util/help.js'

let API_URL = process.env.SERVER_URL
const API = {
  POST_SAVE_TOKEN : API_URL + '/token/save_token/',
  GET_TOKEN : API_URL + '/token/get_token/',
  PUT_EDIT_TOKEN : API_URL + '/token/edit_token/',
}

export default class extends BaseService {
  async saveToken(name, network, symbol, decimal, cmcID, cgkId, apiSymbol, chainType, address, logo, formatAddress, segWit) {
    var that = this
    const tokenRedux = this.store.getRedux('token')
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
    formData.append("segWit", segWit)
    try {
       await axios.post(API.POST_SAVE_TOKEN, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      ).then (function (response) {
        let listToken = that.store.getState().token.listToken
        let searchListToken = that.store.getState().token.searchListToken
        console.log('listToken', listToken)
        that.dispatch(tokenRedux.actions.listToken_update(listToken))
        that.dispatch(tokenRedux.actions.searchListToken_update(searchListToken))
        console.log('response', response)
        return response;
      })
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async getToken () {
    const that = this
    const tokenRedux = this.store.getRedux('token')
    axios.get(API.GET_TOKEN)
      .then(function (response) {
        var data = response.data.data
        console.log(data)
        that.dispatch(tokenRedux.actions.listToken_update(data))
        that.dispatch(tokenRedux.actions.searchListToken_update(data))
      })
  }

  async deleteToken (_id, key) {
    let that = this
    const tokenRedux = this.store.getRedux('token')
    if (_id) {
      console.log('in')
      await axios.delete(API.DELETE_TOKEN + _id)
      .then(function (response) {
        let listToken = that.store.getState().token.listToken
        let searchListToken = that.store.getState().token.searchListToken
        delete listToken[key]
        delete searchListToken[key]
        console.log(searchListToken)
        that.dispatch(tokenRedux.actions.listToken_update(listToken))
        that.dispatch(tokenRedux.actions.searchListToken_update(searchListToken))
        return response;
      })
    } else {
      return "Error"
    }
  }

  async editToken(_id, name, network, symbol, decimal, cmcID, cgkId, apiSymbol, chainType, address, logo, formatAddress, segWit, key) {
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
      await axios.put(API.PUT_EDIT_TOKEN, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      ).then(function (response) {
        let listToken = that.store.getState().token.listToken
        let searchListToken = that.store.getState().token.searchListToken
        listToken[key] = {
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
        searchListToken[key] = {
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
        console.log(searchListToken)
        that.dispatch(tokenRedux.actions.listToken_update(listToken))
        that.dispatch(tokenRedux.actions.searchListToken_update(searchListToken))
        console.log('response', response)
        return response;
      })
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async PocPriceUSD () {
    let that = this
    const pocStatsRedux = this.store.getRedux('pocStats')
    axios.get(API.USD_POC_PRICE)
      .then(function (response) {
        var data = response.data.data.price
        if (data != 0) {
          let dot = data.indexOf('.')
          let dataLength = data.slice(0, dot).length
          let float = parseFloat(data).toPrecision(dataLength+2).toString()
          that.dispatch(pocStatsRedux.actions.pocPriceUSD_update(thousands(float, 2)))
        } else {
          that.dispatch(pocStatsRedux.actions.pocPriceUSD_update('0'))
        }
      })
  }

  async setRole(role, wallet) {
    let formData = new FormData();
    formData.append("role", role);
    formData.append("wallet", wallet);
    try {
      let response = await axios.post(API.SET_ROLE, formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      console.log(response)
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
}
