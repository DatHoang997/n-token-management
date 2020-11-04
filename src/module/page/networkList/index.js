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

const network = () => {
  useAuth()
  const dispatch = useDispatch(),
        dataRedux = store.getRedux('data').actions,
        network = useSelector(state => state.data.listNetWork),
        networkSearch = useSelector(state => state.data.searchListNetWork),
        successResponse = useSelector(state => state.data.response),
        isAdmin = useSelector(state => state.user.isAdmin),
        isEditor = useSelector(state => state.user.isEditor),
        [modalDetailVisible, setModalDetailVisible] = useState(false),
        [err, setErr] = useState('')

  const dataService = new DataService

  useEffect(() => {
    dataService.getNetwork()
  }, [])

  useEffect(() => {
    if (successResponse == true) {
      setModalDetailVisible(false)
      setModalDetailVisible('')
    }
  }, [successResponse])

  const searchNetwork = (e) => {
    const items = Object.values(network).filter((data) => {
      if (e.target.value == '') {
        return data
      }
      else if (data.networks.toLowerCase().includes(e.target.value.toLowerCase())) {
        return data
      }
    })
    dispatch(dataRedux.searchListNetWork_update(''))
    dispatch(dataRedux.searchListNetWork_update(items))
  }

  const networks = Object.values(networkSearch).map((element, key) => {
    return (
      <Row className="margin-top-md token-table padding-top-xs network" key={key}>
        <Col xs={2} md={2} lg={2} className="center">{key + 1}</Col>
        <Col xs={5} md={5} lg={3}>
          <Row>
            <Col span={24}>
              Network:
            </Col>
            <Col span={24}>
              Explorer:
            </Col>
            <Col span={24}>
              isSegWit:
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={12} lg={14}>
          <Row>
            <Col span={24}>
              <p>{element.networks}</p>
            </Col>
            <Col span={24}>
              <p>{element.explorer}</p>
            </Col>
            <Col span={24}>
              <p>{element.isSegWit.toString()}</p>
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
                  title="Delete this network ?"
                  onConfirm={async() => {
                    setErr('')
                    let response = await dataService.deleteNetwork(element.networks)
                    if(response == false) {
                      setErr("there're tokens or Đapps are using this network")
                    }
                  }}
                  okText="yes"
                  cancelText="no"
                >
                  <button className='btn btn-delete'>remove</button>
                </Popconfirm>
              }
              <Modal
                title='Network detail'
                visible={modalDetailVisible === key}
                footer={null}
                onCancel={() => {
                  setErr('')
                   setModalDetailVisible(false)
                }}
              >
                <Edit
                  _id={element._id}
                  type='network'
                  network={element.networks}
                  explorer={element.explorer}
                  segWit={element.isSegWit}
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
          <h1>List of Networks</h1>
          <p className="text-red">{err}</p>
        </Col>
      </Row>
      {/* <Input className="margin-top-md" placeholder="Search" onChange={searchNetwork}/> */}
      {networks}
    </StandardPage>
  )
}

export default network;
