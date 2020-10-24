import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Input, Row, Col, Switch, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import TokenService from '@/service/TokenService'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css';
import './style.scss'

const editToken = (props) => {
  useAuth()
  const [_id, set_id] = useState(props._id && props._id != undefined ? props._id : ''),
        [name, setName] = useState(props.name && props.name != undefined ? props.name : ''),
        [network, setNetwork] = useState(props.network && props.network != undefined ? props.network : ''),
        [symbol, setSymbol] = useState(props.symbol && props.symbol != undefined ? props.symbol : ''),
        [decimal, setDecimal] = useState(props.decimal && props.decimal != undefined ? props.decimal : ''),
        [cmcId, setCmcId] = useState(props.cmcId && props.cmcId != undefined ? props.cmcId : ''),
        [cgkId, setCgkId] = useState(props.cgkId && props.cgkId != undefined ? props.cgkId : ''),
        [apiSymbol, setApiSymbol] = useState(props.apiSymbol && props.apiSymbol != undefined ? props.apiSymbol : ''),
        [chainType, setChainType] = useState(props.chainType && props.chainType != undefined ? props.chainType : ''),
        [address, setAddress] = useState(props.address && props.address != undefined ? props.address : ''),
        [logo, setLogo] = useState(props.logo && props.logo != undefined ? props.logo : ''),
        [formatAddress, setFormatAddress] = useState(props.formatAddress && props.formatAddress != undefined ? props.formatAddress : ''),
        [keys, setKeys] = useState(props.keys && props.keys != undefined ? props.keys : ''),
        [segWit, setSegWit] = useState(props.segWit && props.segWit != undefined ? props.segWit : ''),
        [disableSubmit, setDisableSubmit] = useState(false),
        [disableEdit, setDisableEdit] = useState(true)

  const tokenService = new TokenService

  const isAdmin = useSelector(state => state.user.isAdmin),
        isEditor = useSelector(state => state.user.isEditor)

  const editToken = async() => {
    setDisableSubmit(true)
    let response = await tokenService.editToken(_id, name, network, symbol, decimal, cmcId, cgkId, apiSymbol, chainType, address, logo, formatAddress, segWit, keys)
    if (response) {
      setDisableSubmit(false)
      message.success('Update Token success!')
    }
  }

  const edit = async() => {
    if(disableEdit == true) setDisableEdit(false)
    if(disableEdit == false) setDisableEdit(true)
  }

  const getSegWit = (checked) => {
    setSegWit(checked)
  }

  return (
    <Row>
      <Col span={24}>
        { isAdmin &&
          <Row className="right-align">
            <Col span={24}>
              <button className="btn-edit margin-top-md" onClick={edit}>
                <span>Edit</span>
              </button>
            </Col>
          </Row>
        }
        <Row className="padding-top-page">
          <Col span={1}></Col>
          <Col span={9}>
            <p>Token name:</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setName(e.target.value)}} value={name} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>Network :</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setNetwork(e.target.value)}} value={network} disabled={disableEdit}/>
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
            <Input onChange={(e) => {setSymbol(e.target.value)}} value={symbol} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>Decimal:</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setDecimal(e.target.value)}} value={decimal} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>CMC Id :</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setCmcId(e.target.value)}} value={cmcId} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>CoinGecko Id:</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setCgkId(e.target.value)}} value={cgkId} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>Api symbol:</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setApiSymbol(e.target.value)}} value={apiSymbol} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>Chain type:</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setChainType(e.target.value)}} value={chainType} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>address:</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setAddress(e.target.value)}} value={address} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>logo:</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setLogo(e.target.value)}} value={logo} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>Format address:</p>
          </Col>
          <Col span={13}>
            <Input onChange={(e) => {setFormatAddress(e.target.value)}} value={formatAddress} disabled={disableEdit}/>
          </Col>
        </Row>
        <Row className="padding-top-md">
          <Col span={10}></Col>
          <Col span={13}>
            <button className="btn-submit margin-top-md" onClick={editToken} disabled={disableSubmit}>
            {disableSubmit && <span className="margin-right-sm"> <LoadingOutlined/></span>}
              <span>Submit</span>
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default editToken;
