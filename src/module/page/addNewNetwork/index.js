import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Input, Row, Col, Switch, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import TokenService from '@/service/TokenService'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css';
import './style.scss'

const newToken = () => {
  useAuth()
  useEditor()
  const [network, setNetwork] = useState(''),
        [explorer, setExplorer] = useState(''),
        [disableSubmit, setDisableSubmit] = useState(false),
        [err, setErr] = useState('')

  const tokenService = new TokenService

  const saveToken = async() => {
    setDisableSubmit(true)
    if (network == '' || explorer == '') {
      setErr('insert all require fields')
      setDisableSubmit(false)
      return
    }
    let response = await tokenService.saveNetwork(network, explorer)
    console.log(response)
    if (response.data.status == 1) {
      setDisableSubmit(false)
      message.success('Add Network success!')
      setNetwork('')
      setExplorer('')
    }
  }

  return (
    <StandardPage>
      <Row className="center">
        <Col xs={24} sm={24} lg={24}>
          <h1>Add new Network</h1>
          <p className="text-red">{err}</p>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Network :*</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setNetwork(e.target.value)}} value={network}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Explorer :*</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setExplorer(e.target.value)}} value={explorer} placeholder="https://explorer.nexty.io/"/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={10} lg={7}></Col>
        <Col xs={1} sm={13} lg={17} className="center">
          <button className="btn-submit margin-top-md" onClick={saveToken} disabled={disableSubmit}>
          {disableSubmit && <span className="margin-right-sm"> <LoadingOutlined/></span>}
            <span>Add new Token</span>
          </button>
        </Col>
      </Row>
    </StandardPage>
  )
}

export default newToken;
