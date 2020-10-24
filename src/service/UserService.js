import BaseService from '../model/BaseService'
import Web3        from 'web3'
import axios       from 'axios'
import {setupWeb3} from "../util/auth";
import {NetIds}    from "../constant";

let API_URL = process.env.SERVER_URL
const API = {
  REGISTER : API_URL + '/auth/register',
  LOGIN : API_URL + '/auth/login',
  VERIFY_TOKEN : API_URL + '/auth/verify-token/',
  CHECK_ADMIN : API_URL + '/auth/check-admin/',
  CHECK_EDITOR : API_URL + '/auth/check-editor/',
}

export default class extends BaseService {
  async register(username) {
    const storeUser = this.store.getState().user
    const wallet = storeUser.wallet
    const web3 = storeUser.web3

    if ((web3.currentProvider.networkVersion && web3.currentProvider.networkVersion != NetIds.production) ||
      (web3.currentProvider.net_version && web3.currentProvider.net_version() && web3.currentProvider.net_version() != NetIds.production)
    ) {
      return {status: 0, message: 'You must choose Nexty network to register'}
    }

    try {
      var message = new Date().getTime() + '.' + wallet + '.ezDeFi.token'
      var signature = await web3.eth.personal.sign(message, wallet)
    } catch (e) {
      return {status: 0, message: 'Some thing error, please check your ezdefi extension version'}
    }

    try {
      var response = await axios.post(API.REGISTER,
        {
          username,
          message  : message,
          signature: signature
        })
      return response.data
    } catch (error) {
      return error;
    }
  }

  async login() {
    await setupWeb3()
    const storeUser = this.store.getState().user
    const wallet = storeUser.wallet
    const web3 = new Web3(window.ethereum)
    if ((web3.currentProvider.networkVersion && web3.currentProvider.networkVersion != NetIds.production) ||
      (web3.currentProvider.net_version && web3.currentProvider.net_version() && web3.currentProvider.net_version() != NetIds.production)
    ) {
      return {status: 0, message: 'You must choose Nexty network to login'}
    }

    try {
      var message = new Date().getTime() + '.' + wallet + '.ezDeFi.token'
      var signature = await web3.eth.personal.sign(message, wallet)
    } catch (e) {
      return {status: 0, message: 'Some thing error, please check your ezdefi extension version'}
    }

    try {
      var response = await axios.post(API.LOGIN,
        {
          message  : message,
          signature: signature
        })
      return response.data
    } catch (error) {
      return error.response.data;
    }
  }

  async verifyToken() {
    try {
      var response = await axios.post(API.VERIFY_TOKEN)
      return response.data.data
    } catch (e) {
      return false
    }
  }

  async checkAdmin() {
    const that = this
    const userRedux = this.store.getRedux('user')
    var response = await axios.get(API.CHECK_ADMIN)
    if (response.data.data) {
      that.dispatch(userRedux.actions.isAdmin_update(true))
    }
    return response.data.data
  }

  async checkEditor() {
    const that = this
    const userRedux = this.store.getRedux('user')
    var response = await axios.get(API.CHECK_EDITOR)
    if (response.data.data) {
      that.dispatch(userRedux.actions.isEditor_update(true))
    }
    return response.data.data
  }
}
