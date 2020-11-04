import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import {useSelector, useDispatch} from "react-redux"
import { Input, Row, Col, message, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import DataService from '@/service/DataService'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css';
import './style.scss'

const { Option } = Select;

const newDapp = () => {
  useAuth()
  useAdmin()
  const networkId = useSelector(state => state.data.listNetWork),
        [name, setName] = useState(''),
        [title, setTitle] = useState(''),
        [url, setUrl] = useState(''),
        [img, setImg] = useState(''),
        [network, setNetwork] = useState(''),
        [disableSubmit, setDisableSubmit] = useState(false),
        [err, setErr] = useState('')

  const dataService = new DataService

  const saveDapp = async() => {
    setDisableSubmit(true)
    if (name == '' || title == '' || url == '' || img == '') {
      setErr('insert all require fields')
      setDisableSubmit(false)
      return
    }
    let response = await dataService.saveDapp(name, title, url, img, network)
    if (response.data.status == 1) {
      setDisableSubmit(false)
      message.success('Add Đapp success!')
      setName('')
      setTitle('')
      setUrl('')
      setImg('')
      setNetwork('')
    }
  }

  const getNetwork = (e) => {
    setNetwork(e)
  }

  return (
    <StandardPage>
      <Row className="center">
        <Col xs={24} sm={24} lg={24}>
          <h1>Add new Đapp</h1>
          <p className="text-red">{err}</p>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Name :*</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setName(e.target.value)}} value={name}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Title :*</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setTitle(e.target.value)}} value={title}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Url :*</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setUrl(e.target.value)}} value={url}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Image :*</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setImg(e.target.value)}} value={img}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Network :*</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Select className="search-token" placeholder="Network" onChange={getNetwork} value={network}>
            {Object.values(networkId).map((element) => {
              if (element.networks) return <Option key={element._id} value={element.networks}>{element.networks}</Option>
              else return
            })}
          </Select>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={10} lg={7}></Col>
        <Col xs={1} sm={13} lg={17} className="center">
          <button className="btn-submit margin-top-md" onClick={saveDapp} disabled={disableSubmit}>
          {disableSubmit && <span className="margin-right-sm"> <LoadingOutlined/></span>}
            <span>Add new Đapp</span>
          </button>
        </Col>
      </Row>
    </StandardPage>
  )
}

export default newDapp;
