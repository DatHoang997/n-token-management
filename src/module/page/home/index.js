import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Row, Col, Input, Popconfirm } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import store from '@/store'
import {useSelector, useDispatch} from "react-redux"
import TokenService from '@/service/TokenService'
import 'antd/dist/antd.css';
import './style.scss'

const stats = () => {
  const tokenRedux = store.getRedux('token').actions,
        token = useSelector(state => state.token.listToken),
        tokenSearch = useSelector(state => state.token.searchListToken),
        dispatch = useDispatch()

  const tokenService = new TokenService

  console.log(token)

  useEffect(() => {
    tokenService.getToken()
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
    return (
      <Row className="margin-top-md token-table padding-top-xs" key={key}>
        <Col span={1} className="center">{key + 1}</Col>
        <Col span={4}>{element.logo}</Col>
        <Col span={14}>
          <Row>
            <Col span={4}>Name: </Col>
            <Col span={20}>{element.name}</Col>
            <Col span={4}>Network: </Col>
            <Col span={20}>{element.network}</Col>
          </Row>
        </Col>
        <Col span={5}>
          <Row className="right-align">
            <Col span={24}>
              <button className='btn btn-edit'>detail</button>
            </Col>
            <Col span={24}>
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
        <Col span={24}>
          <h1>List Token</h1>
        </Col>
      </Row>
      <Input className="margin-top-md" placeholder="search" onChange={searchToken}/>
     {tokens}
    </StandardPage>
  )
}

export default stats;
