import React, { useEffect, useState } from 'react'
import { Row, Col, Menu } from 'antd'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import {Link, useParams, useLocation, useHistory} from "react-router-dom";
import I18N from '@/I18N'
import './style.scss'
import 'antd/dist/antd.css';

const { SubMenu } = Menu;

const HeaderComponent = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="1" icon={<MailOutlined />}>
        <Link to="/">home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<MailOutlined />}>
      <Link to="/new">Add new Token</Link>
      </Menu.Item>
    </Menu>
  )
}

export default HeaderComponent;
