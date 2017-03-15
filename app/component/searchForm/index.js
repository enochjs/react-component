
import React, { Component } from 'react'
import { Button, Form, Input, Row, Col, Select } from 'antd';

import { chunk } from 'lodash'
import SearchChosen from '../searchChosen'
import MultiSelect from '../multiSelect'
import RangePicker from '../rangePicker'
import CityCascader from '../cityCascader'
import './index.css'

const InputGroup = Input.Group
const FormItem = Form.Item
const Option = Select.Option

@Form.create({
  onFieldsChange(props, items) {
    props.cacheSearch(items);
  },
  mapPropsToFields(props) {
    const fields = {}
    props.searchList.map((item) => {
      if (typeof (item.key) !== 'string') {
        for (let i = 0; i < item.key.length; i++) {
          fields[item.key[i]] = props.search[item.key[i]];
        }
      } else {
        fields[item.key] = props.search[item.key]
      }
    })
    return fields
  },
})

export default class SearchForm extends Component {

  onSubmit = (e) => {
    e.preventDefault()
    const query = this.props.form.getFieldsValue()
    Object.keys(query).map((key) => {
      query[key] === undefined && delete (query[key])
    })
    this.props.onSubmit(query)
  }
  getFormsValue() {
    return this.props.form.getFieldsValue()
  }
  getSearchItem(item) {
    switch (item.type) {
    case 'select': return this.getSelect(item)
    case 'text': return this.getText(item)
    case 'groupNumber': return this.getGroupNumber(item)
    case 'rangePicker': return this.getRangePicker(item)
    case 'searchChosen': return this.getSearchChosen(item)
    case 'multiSelect': return this.getMultiSelect(item)
    case 'cityCascader': return this.getCityCascader(item)
    case 'wideSelect': return this.getWideSelect(item)
    case 'callReason': return this.getSelectReason(item)
    case 'defaultMultiSelect': return this.getDefaultMultiSelect(item)
    case 'rewardSelect': return this.getRewardSelect(item)
    default: this.getText(item); break;
    }
    return [];
  }
  getText(item) {
    const { getFieldProps } = this.props.form
    return <Input {...getFieldProps(item.key)} />
  }
  getSelect(item) {
    const { getFieldProps } = this.props.form
    // antd的Option value只支持string类型，把value转成string类型并且在
    // onChange时判断value是否为纯数字，是的话转回数字形式。 --hky
    return (<Select
      size="default"
      allowClear={Boolean(true)}
      {...getFieldProps(item.key, {
        onChange: (value) => {
          item.onChange && (/^\d+$/.test(value) ?
            item.onChange(parseInt(value, 10)) : item.onChange(value)) } })}
      placeholder={item.placeholder}
    >
      {item.options.map((option, index) =>
        <Option key={index}
          value={option[item.value].toString()}
        >{option[item.text]}</Option>)}
    </Select>)
  }
  getWideSelect(item) {
    const { getFieldProps } = this.props.form
    return (
      <div className="city-cascader-pop">
        <Select
          allowClear={Boolean(true)}
          getPopupContainer={() => document.querySelector('.city-cascader-pop')}
          dropdownMatchSelectWidth={false}
          {...getFieldProps(item.key, {
            onChange: (value) => {
              item.onChange && (/^\d+$/.test(value) ?
                item.onChange(parseInt(value, 10)) : item.onChange(value)) } })}
          placeholder={item.placeholder}
        >
          {item.options.map((option, index) =>
            <Option key={index}
              value={option[item.value].toString()}
            >{option[item.text]}</Option>)}
        </Select>
      </div>
    )
  }
  getGroupNumber(item) {
    const { getFieldProps } = this.props.form
    // const length = item.key.length
    return (
      <InputGroup>
        {
          item.key.map((key, index) => (
            <Col span={24 / parseInt(item.key.length, 10)} key={index} >
              <Input type="number" {...getFieldProps(key)} />
            </Col>
            )
          )
        }
      </InputGroup>)
  }
  getDefaultMultiSelect(item) {
    const { getFieldProps } = this.props.form
    let children = []
    const itemArr = item.text.split(',')
    item.options.map((option, index) => {
      children.push(
        <Option
          key={index}
          value={option[item.value].toString()}
        >
          {
            itemArr.length === 2 ? option[itemArr[0]] + option[itemArr[1]] : option[item.text]
          }
        </Option>
      )
    })
    return (
      <Select
        multiple
        {...getFieldProps(item.key)}
        style={{ width: '100%' }}
        placeholder="请选择"
      >
        {children}
      </Select>
    )
  }

  getSearchChosen(item) {
    const { getFieldProps, setFieldsValue /* getFieldsValue*/ } = this.props.form
    return (
      <SearchChosen
        {...getFieldProps(item.key)}
        keyName={item.key}
        searchType={item.searchType}
        cityId={item.cityId}
        onFieldsChange={setFieldsValue}
        fieldsValue={this.props.search}
      />)
  }
  getRangePicker(item) {
    const { getFieldProps, setFieldsValue } = this.props.form
    const start = getFieldProps(item.key[0])
    const end = getFieldProps(item.key[1])
    return (
      <RangePicker
        start={start.value}
        end={end.value}
        startKey={item.key[0]}
        endKey={item.key[1]}
        onFieldsChange={setFieldsValue}
      />
    )
  }
  getMultiSelect(item) {
    const { getFieldProps, setFieldsValue } = this.props.form;
    return (
      <MultiSelect
        {...getFieldProps(item.key)}
        keyName={item.key}
        id={item.value}
        text={item.text}
        options={item.options}
        onFieldsChange={setFieldsValue}
      />
    )
  }
  getCityCascader(item) {
    const { getFieldProps, setFieldsValue } = this.props.form
    const defaultValue = []

    item.key.map((key) => {
      defaultValue.push(getFieldProps(key).value)
    });

    return (
      <CityCascader
        {...getFieldProps(item.key)}
        defaultValue={defaultValue}
        keyName={item.key}
        cityList={item.cityList}
        options={item.options}
        onFieldsChange={setFieldsValue}
        onCityChange={item.onCityChange}
      />
    )
  }
    // 通话原因类型
  getSelectReason(item) {
    const { getFieldProps, setFieldsValue } = this.props.form;
    return (
      <SelectReason
        {...getFieldProps(item.key)}
        keyName={item.key}
        id={item.value}
        text={item.text}
        options={item.options}
        onFieldsChange={setFieldsValue}
      />
    )
  }

  // getRewardSelect
  getRewardSelect(item) {
    const { getFieldProps, setFieldsValue } = this.props.form;
    return (
      <RewardSelect
        {...getFieldProps(item.key)}
        keyName={item.key}
        onFieldsChange={setFieldsValue}
        fieldsValue={this.props.search}
        offDate={item.offDate}
        cityId={item.cityId}
      />
    )
  }

  renderRow(arr, index) {
    const { formColsNum } = this.props;
    // eslint-disable-next-line no-unneeded-ternary
    const cols = formColsNum ? formColsNum : 4;
    return (
      <div key={index} className="clearfix"
        style={{ zIndex: `${100 - index}`, position: 'relative' }}
      >
        <QueueAnim>
          <div key="arr">
            {
              arr.map((item, key) => (
                <Col md={24 / cols} key={key}>
                  <FormItem label={item.label} labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                  >
                  {
                    this.getSearchItem(item)
                  }
                  </FormItem>
                </Col>
              ))
            }
          </div>
        </QueueAnim>
      </div>
    )
  }

  clear = () => {
    this.props.clear()
  }

  formButtonClick = (item) => () => {
    const fieldsValue = this.getFormsValue();
    item.onClick && item.onClick(fieldsValue);
  }

  getFormButton() {
    const buttons = [];
    this.props.formButton && this.props.formButton.length
    && this.props.formButton.map((item, index) => {
      buttons.push(
        <Button key={index} type={item.type}
          onClick={this.formButtonClick(item)}
        >{item.text}</Button>)
    })
    return buttons
  }

  render() {
    const { searchList, formColsNum } = this.props;
    // eslint-disable-next-line no-unneeded-ternary
    const cols = formColsNum ? formColsNum : 4;
    return (
      <Form horizontal onSubmit={this.onSubmit} className="ant-advanced-search-form">
        <Row gutter={16}>
          {
            chunk(searchList, cols).map((row, index) => this.renderRow(row, index))
          }
        </Row>
        <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            {this.getFormButton()}
            {this.props.hasSubmitBtn === false ? null : <Button type="primary" htmlType="submit">搜索</Button>}
            {this.props.hasResetBtn === false ? null : <Button onClick={this.clear}>重置</Button>}
          </Col>
        </Row>
      </Form>
    )
  }
}
