import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Row, Col, Input, Popconfirm, Modal } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import store from '@/store'
import {useSelector, useDispatch} from "react-redux"
import TokenService from '@/service/TokenService'
import UserService from '@/service/UserService'
import EditToken from '../detail/index'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css';
import './style.scss'

const home = () => {
  useAuth()
  const dispatch = useDispatch(),
        tokenRedux = store.getRedux('token').actions,
        token = useSelector(state => state.token.listToken),
        tokenSearch = useSelector(state => state.token.searchListToken),
        successResponse = useSelector(state => state.token.response),
        isAdmin = useSelector(state => state.user.isAdmin),
        isEditor = useSelector(state => state.user.isEditor),
        [modalDetailVisible, setModalDetailVisible] = useState(false)

  const tokenService = new TokenService
  useEffect(() => {
    if (successResponse == true) {
      setModalDetailVisible(false)
      // setModalDetailVisible('')
    }
  }, [successResponse])

  const searchToken = (e) => {
    const items = Object.values(token).filter((data) => {
      if (e.target.value == '') {
        return data
      }
      else if (data.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return data
      }
      else if (data.network.toLowerCase().includes(e.target.value.toLowerCase())) {
        return data
      }
    })
    dispatch(tokenRedux.searchListToken_update(''))
    dispatch(tokenRedux.searchListToken_update(items))
  }

  const tokens = Object.values(tokenSearch).map((element, key) => {
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
            <Col xs={14} md={16} lg={20}><a href={element.explorer} target="_blank">{element.address}</a></Col>
          </Row>
        </Col>
        <Col xs={5} md={5} lg={5}>
          <Row className="right-align">
            <Col xs={24} md={24} lg={24}>
              {(isAdmin || isEditor) &&
                <button className='btn btn-info'
                  onClick={() => {
                    setModalDetailVisible(key)
                  }}>
                  detail
                </button>
              }
            </Col>
            <Col xs={24} md={24} lg={24} className="padding-top-xs">
              {(isAdmin || isEditor) &&
                <Popconfirm
                  placement="top"
                  title="Delete this token ?"
                  onConfirm={() => tokenService.deleteToken(element._id, key, 'home')}
                  okText="yes"
                  cancelText="no"
                >
                  <button className='btn btn-delete'>remove</button>
                </Popconfirm>
              }
              <Modal  title='Token detail'
                      visible={modalDetailVisible === key}
                      footer={null}
                      onCancel={() => setModalDetailVisible(false)}>
                <EditToken
                  _id={element._id}
                  name={element.name}
                  network={element.network}
                  symbol={element.symbol}
                  decimal={element.decimal}
                  cmcId={element.cmcId}
                  cgkId={element.cgkId}
                  apiSymbol={element.apiSymbol}
                  chainType={element.chainType}
                  address={element.address}
                  logo={element.logo}
                  formatAddress={element.format_address}
                  segWit={element.segWit}
                  keys={key}
                  type="home"
                  hideModal={() => setModalDetailVisible(false)}/>
              </Modal>
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
