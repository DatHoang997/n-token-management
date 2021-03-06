import React, { useEffect, useState } from 'react'
import { Row, Col, Menu } from 'antd'
import {useSelector, useDispatch} from "react-redux"
import { PlusCircleOutlined, HomeOutlined, CheckCircleOutlined, LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons'
import {Link, useParams, useLocation, useHistory} from "react-router-dom";
import DataService from '@/service/DataService'
import UserService from '@/service/UserService'
import './style.scss'
import 'antd/dist/antd.css';

const HeaderComponent = () => {
  const history = useHistory()

  const dataService = new DataService,
        userService = new UserService

  const isAdmin = useSelector(state => state.user.isAdmin),
        isEditor = useSelector(state => state.user.isEditor)

  useEffect(() => {
    dataService.getToken()
    userService.checkAdmin()
    userService.checkEditor()
    dataService.getNetwork()
  }, [])

  const logout = () => {
    localStorage.removeItem('jwt')
    history.push('/login')
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item key="1" icon={<UnorderedListOutlined />}>
        <Link to="/">Token List</Link>
      </Menu.Item>
      {(isAdmin || isEditor) &&
        <Menu.Item key="3" icon={<CheckCircleOutlined />}>
          <Link to="/accept">Accept Token</Link>
        </Menu.Item>
      }
      {(isAdmin || isEditor) &&
        <Menu.Item key="2" icon={<PlusCircleOutlined />}>
          <Link to="/new-token">Add new Token</Link>
        </Menu.Item>
      }
      <Menu.Item key="5" icon={<UnorderedListOutlined />}>
        <Link to="/network-list">Network List</Link>
      </Menu.Item>
      {(isAdmin) &&
        <Menu.Item key="4" icon={<PlusCircleOutlined />}>
          <Link to="/new-network">Add new Network</Link>
        </Menu.Item>
      }
      {(isAdmin || isEditor) &&
        <Menu.Item key="6" icon={<UnorderedListOutlined />}>
          <Link to="/Dapp-list">Dapp List</Link>
        </Menu.Item>
      }
      {(isAdmin || isEditor) &&
        <Menu.Item key="7" icon={<PlusCircleOutlined />}>
          <Link to="/new-Dapp">Add new Dapp</Link>
        </Menu.Item>
      }
      <Menu.Item key="8" icon={<LogoutOutlined />} onClick={() => logout()}>
        <span>Log Out</span>
      </Menu.Item>
    </Menu>
  )
}

export default HeaderComponent;
