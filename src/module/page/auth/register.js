import React, {useEffect, useState} from 'react';
import {Input, message}             from 'antd';
import {Link, useHistory}           from "react-router-dom";
import {useSelector}                from "react-redux";
import {LoadingOutlined}            from '@ant-design/icons'
import {setupWeb3}                  from "../../../util/auth";
import UserService                  from "../../../service/UserService";
import {getAllCookie}               from '../../../util/cookie'
import "antd/dist/antd.css";
import './style.scss';

export default (props) => {
  const history = useHistory()

  const wallet                                = useSelector(state => state.user.wallet),
        userService                           = new UserService(),
        [username, setUsername]               = useState(''),
        [usernameErr, setUsernameErr]         = useState(''),
        [emailErr, setEmailErr]               = useState(''),
        [registering, setRegistering]         = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      setupWeb3()
    }
  }, [wallet])

  const register = async () => {
    setRegistering(true)
    let response = await userService.register(username)
    setUsernameErr('')
    setEmailErr('')
    if (response.status === 0) {
      for (let i in response.data) {
        if (response.data[i].param === 'username') setUsernameErr(response.data[i].msg)
        else  message.error(response.data[i].msg)
      }
      if (!response.data) message.error('something_error')
    } else if (response.status === 1) {
      localStorage.setItem('jwt', response.data.token)
      message.success('Register successful')
      history.push('/')
    }
  }

  return (
    <div className="register-background">
      <div className="register-logo-box">
        <img className='logo-img' src="../../../assets/images/ezdefi.svg" alt=""/>
      </div>
      <div className="register-box">
        <div className="register-box--header">
          <h3 className="text-primary-green center">register</h3>
        </div>
        <div className="register-box--body">
          <div className="register-input">
            <Input style={{border: usernameErr && '1px solid red'}} size="large" placeholder='username'
                   value={username} onChange={(e) => setUsername(e.target.value)}/>
            {usernameErr && <p className="text-red center">{usernameErr}</p>}
          </div>
          <p className="register-description login__dont-have-acc center">
            {wallet && wallet.slice(0, 5) + '...' + wallet.slice(-5) + ' '}
          </p>
          <button className="register-button" onClick={register} disabled={registering}>
            {registering && <span className="margin-right-sm"><LoadingOutlined/></span>}
            register
          </button>
          <Link className="link-register" to="/login"> Go login</Link>
        </div>
      </div>
    </div>
  );
}
