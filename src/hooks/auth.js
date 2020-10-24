import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import store from '@/store'
import UserService from '@/service/UserService'
import {setupWeb3} from '../util/auth'

export function useAuth () {
  const userService = new UserService()
  const history = useHistory()
  const wallet = useSelector(state => state.user.wallet)
  const userRedux = store.getRedux('user')

  useEffect(() => {
    async function verifyToken() {
      let data = await userService.verifyToken()
      console.log('TTTTTTTTTTTTTTTT', data)
      if (data) {
        store.dispatch(userRedux.actions.username_update(data.username))
      }
      if (!data || (data && wallet && wallet.toLowerCase() !== data.wallet_address.toLowerCase())) {
        localStorage.removeItem('jwt')
        history.push('/login')
      }
    }
    verifyToken()
  }, [wallet])

  useEffect(() => {
    setupWeb3()
  }, [])
}

export function useAdmin () {
  const userService = new UserService()
  const history = useHistory()
  const wallet = useSelector(state => state.user.wallet)
  const userRedux = store.getRedux('user')

  useEffect(() => {
    async function verifyAdmin() {
      let data = await userService.checkAdmin()
      console.log('lololo1111111111111111111111', data)
      if (data) {
        store.dispatch(userRedux.actions.isAdmin_update(true))
      }
      if (!data || (data && wallet && wallet.toLowerCase() !== data.wallet_address.toLowerCase())) {
        history.push('/403')
      }
    }
    verifyAdmin()
  }, [wallet])
}

export function useEditor () {
  const userService = new UserService()
  const history = useHistory()
  const wallet = useSelector(state => state.user.wallet)
  const userRedux = store.getRedux('user')

  useEffect(() => {
    async function verifyAdmin() {
      let data = await userService.checkEditor()
      let data1 = await userService.checkAdmin()
      console.log('lololo22222222222222222', data)
      if (data || data1) {
        store.dispatch(userRedux.actions.isEditor_update(true))
        store.dispatch(userRedux.actions.isEditor_update(true))
      }
      if (!data1 || (data1 && wallet && wallet.toLowerCase() !== data1.wallet_address.toLowerCase())) {
        if (!data || (data && wallet && wallet.toLowerCase() !== data.wallet_address.toLowerCase())) {
          history.push('/403')
        }
      }
    }
    verifyAdmin()
  }, [wallet])
}
