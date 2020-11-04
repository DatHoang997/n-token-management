import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Row, Col, Input, Popconfirm, Modal } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import store from '@/store'
import {useSelector, useDispatch} from "react-redux"
import DataService from '@/service/DataService'
import UserService from '@/service/UserService'
import EditToken from '../detail/index'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css';
import './style.scss'

const home = () => {
  useAuth()
  const dispatch = useDispatch(),
        dataRedux = store.getRedux('data').actions,
        token = useSelector(state => state.data.listToken),
        tokenSearch = useSelector(state => state.data.searchListToken),
        successResponse = useSelector(state => state.data.response),
        isAdmin = useSelector(state => state.user.isAdmin),
        isEditor = useSelector(state => state.user.isEditor),
        [modalDetailVisible, setModalDetailVisible] = useState(false)

  const dataService = new DataService
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
    dispatch(dataRedux.searchListToken_update(''))
    dispatch(dataRedux.searchListToken_update(items))
  }

  const tokens = Object.values(tokenSearch).map((element, key) => {
    return (
      <Row className="margin-top-md token-table padding-top-xs" key={key}>
        <Col xs={2} md={2} lg={2} className="center">{key + 1}</Col>
        <Col xs={5} md={5} lg={3} className="center">
          <img className="token-logo" src={element.logo}></img>
        </Col>
        <Col xs={12} md={12} lg={14}>
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
                  onConfirm={() => dataService.deleteToken(element._id, 'home')}
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
                  segWit={element.segWit}
                  suffix={element.suffix}
                  keys={key}
                  type="token"
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
          <h1>List of Tokens</h1>
        </Col>
      </Row>
      {/* <Input className="margin-top-md" placeholder="Search Token or Network" onChange={searchToken}/> */}
      {tokens}
    </StandardPage>
  )
}

export default home;
