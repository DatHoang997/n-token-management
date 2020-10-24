import React, { useEffect, useState } from 'react'
import { Row, Col, Menu } from 'antd'
import {useSelector, useDispatch} from "react-redux"
import { PlusCircleOutlined, HomeOutlined, CheckCircleOutlined, LogoutOutlined } from '@ant-design/icons'
import {Link, useParams, useLocation, useHistory} from "react-router-dom";
import TokenService from '@/service/TokenService'
import UserService from '@/service/UserService'
import './style.scss'
import 'antd/dist/antd.css';

const { SubMenu } = Menu;

const HeaderComponent = () => {
  const history = useHistory()

  const tokenService = new TokenService,
        userService = new UserService

  const isAdmin = useSelector(state => state.user.isAdmin),
        isEditor = useSelector(state => state.user.isEditor)

  useEffect(() => {
    tokenService.getToken()
    userService.checkAdmin()
    userService.checkEditor()
  }, [])

  const logout = () => {
    localStorage.removeItem('jwt')
    history.push('/login')
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {(isAdmin || isEditor) &&
        <Menu.Item key="2" icon={<PlusCircleOutlined />}>
          <Link to="/new">Add new Token</Link>
        </Menu.Item>
      }
      {(isAdmin || isEditor) &&
        <Menu.Item key="3" icon={<CheckCircleOutlined />}>
          <Link to="/accept">Accept Token</Link>
        </Menu.Item>
      }
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => logout()}>
        <span>logout</span>
      </Menu.Item>
    </Menu>
  )
}

export default HeaderComponent;
