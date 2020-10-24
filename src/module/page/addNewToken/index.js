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
  const [name, setName] = useState(''),
        [network, setNetwork] = useState(''),
        [symbol, setSymbol] = useState(''),
        [decimal, setDecimal] = useState(''),
        [cmcID, setCmcId] = useState(''),
        [cgkId, setCgkId] = useState(''),
        [apiSymbol, setApiSymbol] = useState(''),
        [chainType, setChainType] = useState(''),
        [address, setAddress] = useState(''),
        [logo, setLogo] = useState(''),
        [formatAddress, setFormatAddress] = useState(''),
        [segWit, setSegWit] = useState(''),
        [disableSubmit, setDisableSubmit] = useState(false)

  const tokenService = new TokenService

  const saveToken = async() => {
    setDisableSubmit(true)
    let response = await tokenService.saveToken(name, network, symbol, decimal, cmcID, cgkId, apiSymbol, chainType, address, logo, formatAddress, segWit)
    if (response) {
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
      setFormatAddress('')
      setSegWit('')
    }
  }

  const getSegWit = (checked) => {
    setSegWit(checked)
  }

  return (
    <StandardPage>
      <Row className="center">
        <Col xs={24} sm={24} lg={24}>
          <h1>Add new token</h1>
        </Col>
      </Row>
      <Row className="padding-top-page">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Token name:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setName(e.target.value)}} value={name}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Network :</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setNetwork(e.target.value)}} value={network}/>
        </Col>
      </Row>
      { (network == 'bitcoin' || network == 'litecoin' ||network == 'bitcoin-test' ||network == 'litecoin-test') ?
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
          <p>Decimal:</p>
        </Col>
         <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setDecimal(e.target.value)}} value={decimal}/>
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
          <p>address:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setAddress(e.target.value)}} value={address}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>logo:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setLogo(e.target.value)}} value={logo}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={1} lg={1}></Col>
        <Col xs={9} sm={9} lg={6}>
          <p>Format address:</p>
        </Col>
        <Col xs={13} sm={13} lg={17}>
          <Input onChange={(e) => {setFormatAddress(e.target.value)}} value={formatAddress}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col xs={1} sm={10} lg={7}></Col>
        <Col xs={1} sm={13} lg={17}>
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
