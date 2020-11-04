import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Row, Col, Input, Popconfirm, Modal } from 'antd'
import store from '@/store'
import {useSelector, useDispatch} from "react-redux"
import DataService from '@/service/DataService'
import UserService from '@/service/UserService'
import Edit from '../detail/index'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css';
import './style.scss'

const dapp = () => {
  useAuth()
  const dispatch = useDispatch(),
        dataRedux = store.getRedux('data').actions,
        Dapp = useSelector(state => state.data.listDapp),
        DappSearch = useSelector(state => state.data.searchListDapp),
        successResponse = useSelector(state => state.data.response),
        isAdmin = useSelector(state => state.user.isAdmin),
        isEditor = useSelector(state => state.user.isEditor),
        [modalDetailVisible, setModalDetailVisible] = useState(false)

        const dataService = new DataService

  useEffect(() => {
    dataService.getDapp()
  }, [])

  useEffect(() => {
    if (successResponse == true) {
      setModalDetailVisible(false)
      setModalDetailVisible('')
    }
  }, [successResponse])

  const searchDapp = (e) => {
    const items = Object.values(Dapp).filter((data) => {
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
    dispatch(dataRedux.searchListDapp_update(''))
    dispatch(dataRedux.searchListDapp_update(items))
  }

  const dapps = Object.values(DappSearch).map((element, key) => {
    return (
      <Row className="margin-top-md token-table padding-top-xs network" key={key}>
        <Col xs={2} md={2} lg={2} className="center">{key + 1}</Col>
        <Col xs={5} md={5} lg={3}>
          <Row>
            <Col span={24}>
              Name:
            </Col>
            <Col span={24}>
              Title:
            </Col>
            <Col span={24}>
              Url:
            </Col>
            <Col span={24}>
              Image:
            </Col>
            <Col span={24}>
              Network:
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={12} lg={14}>
          <Row>
            <Col span={24}>
              <p>{element.name}</p>
            </Col>
            <Col span={24}>
              <p>{element.title}</p>
            </Col>
            <Col span={24}>
              <p>{element.url}</p>
            </Col>
            <Col span={24}>
              <p>{element.img}</p>
            </Col>
            <Col span={24}>
              <p>{element.network}</p>
            </Col>
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
                  title="Delete this Đapp ?"
                  onConfirm={() => dataService.deleteDapp(element._id)}
                  okText="yes"
                  cancelText="no"
                >
                  <button className='btn btn-delete'>remove</button>
                </Popconfirm>
              }
              <Modal  title='Đapp detail'
                      visible={modalDetailVisible === key}
                      footer={null}
                      onCancel={() => setModalDetailVisible(false)}>
                <Edit
                  _id={element._id}
                  type='dapp'
                  dapp={element.name}
                  title={element.title}
                  url={element.url}
                  img={element.img}
                  keys={key}
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
          <h1>List of Đapp</h1>
        </Col>
      </Row>
      {/* <Input className="margin-top-md" placeholder="Search Đapp or Network" onChange={searchDapp}/> */}
      {dapps}
    </StandardPage>
  )
}

export default dapp;
