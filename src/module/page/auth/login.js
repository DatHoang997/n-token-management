import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory} from "react-router-dom";
import {Row, Col} from 'antd';
import UserService from "../../../service/UserService";
import TokenService from "../../../service/TokenService";
import {setupWeb3} from "../../../util/auth";
import {useSelector} from "react-redux";
import {LoadingOutlined} from '@ant-design/icons'
import "antd/dist/antd.css";
import './style.scss'

export default () => {
  const history = useHistory(),
        wallet = useSelector(state => state.user.wallet),
        [errorMsg, setErrorMsg] = useState(''),
        [requesting, setRequesting] = useState(false)

  const userService = new UserService,
        tokenService = new TokenService

  const login = async () => {
    setRequesting(true)
    let response = await userService.login()
    setErrorMsg('')
    if (response.status === 1) {
      setRequesting(false)
      localStorage.setItem('jwt', response.data.token)
      history.push('/')
    } else {
      if (response.message) {
        setRequesting(false)
        setErrorMsg(response.message)
      } else {
        setRequesting(false)
        setErrorMsg('false')
      }
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      setupWeb3()
    }
  }, [wallet])

  return (
    <div className="login-background">
      <div className="login-logo-box">
        <img className='logo-img' src="../../../assets/images/ezdefi.svg" alt=""/>
      </div>
      <div className="login-box">
        <div className="login-box--header">
          <h3 className="center hide-on-desktop">('login')</h3>
        </div>
        <div className="login-box--body">
          <button className="login-button" onClick={login}>
            {requesting && <span className="margin-right-sm"> <LoadingOutlined/></span>}
            login
          </button>
          {errorMsg && <p className="center text-red">{errorMsg}</p>}
          <p className="login__dont-have-acc">Don't have account?</p>
          <Link to="/register" className="link-register">Go register</Link>
        </div>
      </div>
    </div>
  );
}
