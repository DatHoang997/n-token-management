import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Row, Col, Input, Popconfirm, Modal } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import store from '@/store'
import {useSelector, useDispatch} from "react-redux"
import TokenService from '@/service/TokenService'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css';
import './style.scss'

const home = () => {
  useAuth()
  useEditor()
  const tokenRedux = store.getRedux('token').actions,
        token = useSelector(state => state.token.listWaitingAccept),
        tokenSearch = useSelector(state => state.token.searchListWaitingAccept),
        dispatch = useDispatch()

  const isAdmin = useSelector(state => state.user.isAdmin),
        isEditor = useSelector(state => state.user.isEditor)

  const tokenService = new TokenService

  useEffect(() => {
    tokenService.getWaitingToken()
  }, [])

  const searchToken = (e) => {
    const items = Object.values(token).filter((data) => {
      if (e.target.value == '') {
        return data
      }
      else if (data.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return data
      }
    })
    dispatch(tokenRedux.searchListToken_update(''))
    dispatch(tokenRedux.searchListToken_update(items))
  }

  const tokens = Object.values(tokenSearch).map((element, key) => {
    let link = "https://etherscan.io/address/" + element.address
    return (
      <Row className="margin-top-md token-table padding-top-xs" key={key}>
        <Col xs={1} md={1} lg={1} className="center">{key + 1}</Col>
        <Col xs={5} md={5} lg={3} className="center">
          <img className="token-logo" src={element.logo}></img>
        </Col>
        <Col xs={13} md={13} lg={15}>
          <Row>
            <Col xs={10} md={8} lg={4}>Name: </Col>
            <Col xs={14} md={16} lg={20}>{element.name}</Col>
            <Col xs={10} md={8} lg={4}>Network: </Col>
            <Col xs={14} md={16} lg={20}>{element.network}</Col>
            <Col xs={10} md={8} lg={4}>Address: </Col>
            <Col xs={14} md={16} lg={20}><a href={link} target="_blank">{element.address}</a></Col>
          </Row>
        </Col>
        <Col xs={5} md={5} lg={5}>
          <Row className="right-align">
            <Col xs={24} md={24} lg={24}>
              {(isAdmin) &&
                <button className='btn btn-accept'
                onClick={() => {
                  tokenService.acceptToken(element._id, key)
                }}>
                  accept
                </button>
              }
            </Col>
            <Col xs={24} md={24} lg={24} className="padding-top-xs">
              <Popconfirm
                placement="top"
                title="Delete this token ?"
                onConfirm={() => tokenService.deleteToken(element._id, key)}
                okText="yes"
                cancelText="no"
              >
                <button className='btn btn-delete'>remove</button>
              </Popconfirm>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  })

  return (
    <StandardPage>
      <Row className="center">
        <Col xs={24} md={24} lg={24}>
          <h1>List Token</h1>
        </Col>
      </Row>
      <Input className="margin-top-md" placeholder="search" onChange={searchToken}/>
      {tokens}
    </StandardPage>
  )
}

export default home;
