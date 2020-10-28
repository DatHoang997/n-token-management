import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Input, Row, Col, Switch, message, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import TokenService from '@/service/TokenService'
import { useAuth, useAdmin, useEditor  } from '../../../hooks/auth'
import 'antd/dist/antd.css';
import './style.scss'

const { Option } = Select;


const editToken = (props) => {
  useAuth()
  const networkId = useSelector(state => state.token.listNetWork),
        [_id, set_id] = useState(props._id && props._id != undefined ? props._id : ''),
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
        [segWit, setSegWit] = useState(props.segWit && props.segWit != undefined ? props.segWit : ''),
        [explorer, setExplorer] = useState(props.explorer && props.explorer != undefined ? props.explorer : ''),
        [disableSubmit, setDisableSubmit] = useState(false),
        [disableEdit, setDisableEdit] = useState(true)

  const tokenService = new TokenService

  const isAdmin = useSelector(state => state.user.isAdmin)

  const editToken = async() => {
    setDisableSubmit(true)
    let response = await tokenService.editToken(_id, name, network, symbol, decimal, cmcId, cgkId, apiSymbol, chainType, address, logo, formatAddress, segWit, props.keys, props.type)
    if (response) {
      setDisableEdit(true)
      setDisableSubmit(false)
      message.success('Update Token success!')
    }
  }

  const editNetwork = async() => {
      setDisableEdit(true)
      setDisableSubmit(true)
    let response = await tokenService.editNetwork(_id, network, explorer)
    if (response) {
      setDisableSubmit(false)
      message.success('Update Network success!')
    }
  }

  const edit = async() => {
    if(disableEdit == true) setDisableEdit(false)
    if(disableEdit == false) setDisableEdit(true)
  }

  const getSegWit = (checked) => {
    setSegWit(checked)
  }

  const handleChange = (e) => {
    setNetwork(e)
  }
console.log(props.type)
  return (
    <Row>
      <Col span={24}>
        { isAdmin &&
          <Row className="right-align">
            <Col span={24}>
              <button className="btn-edit" onClick={edit}>
                <span>Edit</span>
              </button>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-page">
            <Col span={1}></Col>
            <Col span={9}>
              <p>Token name:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setName(e.target.value)}} value={name} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
        <Row className="padding-top-md">
          <Col span={1}></Col>
          <Col span={9}>
            <p>Network :</p>
          </Col>
          <Col span={13}>
            <Select className="search-token" placeholder="Network" onChange={handleChange} disabled={disableEdit} value={network}>
              {Object.values(networkId).map((element) => {
                  if (element.networks) return <Option key={element._id} value={element.networks}>{element.networks}</Option>
                  else return
              })}
            </Select>
          </Col>
        </Row>
        }
        { ((network == 'bitcoin' || network == 'litecoin' ||network == 'bitcoin-test' ||network == 'litecoin-test') && name) ?
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
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>Symbol:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setSymbol(e.target.value)}} value={symbol} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>Decimal:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setDecimal(e.target.value)}} value={decimal} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>CMC Id:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setCmcId(e.target.value)}} value={cmcId} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>CoinGecko Id:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setCgkId(e.target.value)}} value={cgkId} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>Api symbol:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setApiSymbol(e.target.value)}} value={apiSymbol} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>Chain type:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setChainType(e.target.value)}} value={chainType} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>address:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setAddress(e.target.value)}} value={address} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>logo:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setLogo(e.target.value)}} value={logo} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { props.name &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>Format address:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setFormatAddress(e.target.value)}} value={formatAddress} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { (props.type == 'network') &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>Network:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setNetwork(e.target.value)}} value={network} disabled={disableEdit}/>
            </Col>
          </Row>
        }
        { (props.type == 'network') &&
          <Row className="padding-top-md">
            <Col span={1}></Col>
            <Col span={9}>
              <p>Explorer:</p>
            </Col>
            <Col span={13}>
              <Input onChange={(e) => {setExplorer(e.target.value)}} value={explorer} disabled={disableEdit}/>
            </Col>
          </Row>
        }
      </Col>
      <Col span={24}>
        { (disableEdit == false) &&
          <Row>
            { name &&
              <Col span={24} className="padding-top-md center">
                <button className="btn-submit margin-top-md" onClick={editToken} disabled={disableSubmit}>
                {disableSubmit && <span className="margin-right-sm"> <LoadingOutlined/></span>}
                  <span>Submit</span>
                </button>
              </Col>
            }
            { (props.type == 'network') &&
              <Col span={24} className="padding-top-md center">
                <button className="btn-submit margin-top-md" onClick={editNetwork} disabled={disableSubmit}>
                {disableSubmit && <span className="margin-right-sm"> <LoadingOutlined/></span>}
                  <span>Submit</span>
                </button>
              </Col>
            }
          </Row>
        }
      </Col>
    </Row>
  )
}

export default editToken;
