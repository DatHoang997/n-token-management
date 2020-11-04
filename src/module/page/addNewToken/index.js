import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import {useSelector, useDispatch} from "react-redux"
import { Input, Row, Col, Switch, message, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import DataService from '@/service/DataService'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css'
import './style.scss'

const { Option } = Select;

const newToken = () => {
  useAuth()
  useEditor()
  const networkId = useSelector(state => state.data.listNetWork),
        [name, setName] = useState(''),
        [network, setNetwork] = useState(''),
        [symbol, setSymbol] = useState(''),
        [decimal, setDecimal] = useState(''),
        [cmcID, setCmcId] = useState(''),
        [cgkId, setCgkId] = useState(''),
        [apiSymbol, setApiSymbol] = useState(''),
        [chainType, setChainType] = useState(''),
        [address, setAddress] = useState(''),
        [logo, setLogo] = useState(''),
        [segWit, setSegWit] = useState(''),
        [suffix, setSuffix] = useState(''),
        [IsSegWit, setIsSegWit] = useState(false),
        [disableSubmit, setDisableSubmit] = useState(false),
        [err, setErr] = useState('')

  const dataService = new DataService

  const regexp = {
    NUM: /^\d*\.?\d*$/
  }

  const saveToken = async() => {
    setDisableSubmit(true)
    if (name == '' || network == '' || decimal == '') {
      setErr('insert all require fields')
      setDisableSubmit(false)
      return
    }
    let response = await dataService.saveToken(name, network, symbol, decimal, cmcID, cgkId, apiSymbol, chainType, address, logo, segWit, suffix)
    if (response.data.status == 1) {
      setDisableSubmit(false)
      message.success('Add Token success!')
      setName('')
      setNetwork('')
      setSymbol('')
      setDecimal('')
      setCmcId('')
      setCgkId('')
      setApiSymbol('')
      setChainType('')
      setAddress('')
      setLogo('')
      setSegWit('')
      setSuffix('')
      setIsSegWit(false)
    } else {
      setErr('loi')
    }
  }

  const getDecimal = (e) => {
    setDisableSubmit(false)
    if (regexp.NUM.test(e.target.value) || e.target.value == '') {
      setDecimal(e.target.value)
      setErr('')
    } else {
      setErr('Decimal must be number')
    }
  }

  const getSegWit = (checked) => {
    setSegWit(checked)
  }

  const getNetwork = (e) => {
    let dot = e.indexOf('.')
    let seg = e.slice(0, dot)
    let net = e.slice(dot+1)
    setNetwork(net)
    if (seg == 'true') {
      setIsSegWit(true)
      setSegWit(false)
    } else {
      setIsSegWit(false)
    }
  }

  return (
    <StandardPage>
      <Row className="center">
        <Col xs={24} sm={24} lg={24}>
          <h1>Add new token</h1>
          <p className="text-red">{err}</p>
        </Col>
      </Row>
      <Row className="padding-top-page">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Token name: *</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setName(e.target.value)}} value={name}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Network : *</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Select className="search-token" placeholder="Network" onChange={getNetwork} value={network}>
            {Object.values(networkId).map((element) => {
              if (element.networks) return <Option key={element._id} value={element.isSegWit + '.' + element.networks}>{element.networks}</Option>
              else return
            })}
          </Select>
        </Col>
      </Row>
      { (IsSegWit == true) ?
        <Row className="padding-top-md">
          <Col xs={1} sm={1} lg={1}></Col>
          <Col xs={9} sm={9} lg={6}>
            <p>isSegWit :</p>
          </Col>
          <Col xs={13} sm={13} lg={17}>
            <Switch checkedChildren="true" unCheckedChildren="false" onChange={getSegWit}/>
          </Col>
        </Row>
        :
        <Row></Row>
      }
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Symbol:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setSymbol(e.target.value)}} value={symbol}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Decimal: *</p>
        </Col>
         <Col xs={13} sm={13} lg={17}>
          <Input onChange={getDecimal} value={decimal}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>CMC Id :</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setCmcId(e.target.value)}} value={cmcID}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>CoinGecko Id:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setCgkId(e.target.value)}} value={cgkId}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Api symbol:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setApiSymbol(e.target.value)}} value={apiSymbol}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Chain type:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setChainType(e.target.value)}} value={chainType}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Address:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setAddress(e.target.value)}} value={address}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Logo:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setLogo(e.target.value)}} value={logo}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Suffix:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setSuffix(e.target.value)}} value={suffix}/>
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
