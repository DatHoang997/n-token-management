import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Input, Row, Col, Switch } from 'antd'
import TokenService from '@/service/TokenService'
import 'antd/dist/antd.css';
import './style.scss'

const stats = () => {
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
        [segWit, setSegWit] = useState(false),
        [disableSubmit, setDisableSubmit] = useState(false)

  const tokenService = new TokenService

  const saveToken = async() => {
    setDisableSubmit(true)
    tokenService.saveToken(name, network, symbol, decimal, cmcID, cgkId, apiSymbol, chainType, address, logo, formatAddress, segWit)
  }

  const getSegWit = (checked) => {
    setSegWit(checked)
  }

  return (
    <StandardPage>
      <Row className="center">
        <Col span={24}>
          <h1>Add new token</h1>
        </Col>
      </Row>
      <Row className="padding-top-page">
        <Col span={1}></Col>
        <Col span={9}>
          <p>Token name:</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setName(e.target.value)}} value={name}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>Network :</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setNetwork(e.target.value)}} value={network}/>
        </Col>
      </Row>
      { (network == 'bitcoin' || network == 'litecoin' ||network == 'bitcoin-test' ||network == 'litecoin-test') ?
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>isSegWit :</p>
          </Col>
          <Col span={13}>
            <Switch checkedChildren="true" unCheckedChildren="false" onChange={getSegWit}/>
          </Col>
        </Row>
      :
        <Row></Row>
      }
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>Symbol:</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setSymbol(e.target.value)}} value={symbol}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>Decimal:</p>
        </Col>
         <Col span={13}>
          <Input onChange={(e) => {setDecimal(e.target.value)}} value={decimal}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>CMC Id :</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setCmcId(e.target.value)}} value={cmcID}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>CoinGecko Id:</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setCgkId(e.target.value)}} value={cgkId}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>Api symbol:</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setApiSymbol(e.target.value)}} value={apiSymbol}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>Chain type:</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setChainType(e.target.value)}} value={chainType}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>address:</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setAddress(e.target.value)}} value={address}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>logo:</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setLogo(e.target.value)}} value={logo}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={9}>
          <p>Format address:</p>
        </Col>
        <Col span={13}>
          <Input onChange={(e) => {setFormatAddress(e.target.value)}} value={formatAddress}/>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={10}></Col>
        <Col span={13}>
          <button className="btn-submit margin-top-md" onClick={saveToken}>
            <span>Add new Token</span>
          </button>
        </Col>
      </Row>
    </StandardPage>
  )
}

export default stats;
