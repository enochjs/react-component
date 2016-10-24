import React, { 
  Component,
} from 'react'

import { Icon } from 'antd'

import ExpandTable from './../../component/table/expand-table'

export default class expandTable extends Component {
	constructor(props) {
    super(props)
  }
  handleExpand(record){
  	debugger
  }
  getColumns() {
  	return [{
		  title: '全国',
		  dataIndex: 'cityName',
		  key: 'cityId',
		  expand: true,
		  expandVale: 0,
		}, {
		  title: '渠道',
		  dataIndex: 'platformName',
		  key: 'platform',
		  expand: true,
		  expandVale: 0,
		}, {
		  title: '类型',
		  dataIndex: 'typeCn',
		  key: 'type',
		  expand: true,
		  expandVale: 0,
		}]
  }
  getTableData() {
  	return [
  		{cityId: 0, cityName: '全国', type: 0, typeCn: '全部', platform: 0, 'platformName': '汇总',rowClassName:"active"},
  		{cityId: 0, cityName: '全国', type: 0, typeCn: '全部', platform: 1, 'platformName': '点我吧'},
  		{cityId: 0, cityName: '全国', type: 0, typeCn: '全部', platform: 2, 'platformName': '点我达'},
  		{cityId: 0, cityName: '全国', type: 1, typeCn: '骑手', platform: 0, 'platformName': '汇总'},
  		{cityId: 0, cityName: '全国', type: 1, typeCn: '骑手', platform: 1, 'platformName': '点我吧'},
  		{cityId: 0, cityName: '全国', type: 1, typeCn: '骑手', platform: 2, 'platformName': '点我达'},
  		{cityId: 0, cityName: '全国', type: 2, typeCn: '骑士', platform: 0, 'platformName': '汇总'},
  		{cityId: 0, cityName: '全国', type: 2, typeCn: '骑士', platform: 1, 'platformName': '点我吧'},
  		{cityId: 0, cityName: '全国', type: 2, typeCn: '骑士', platform: 2, 'platformName': '点我达'},

  		{cityId: 1, cityName: '杭州', type: 0, typeCn: '全部', platform: 0, 'platformName': '汇总'},
  		{cityId: 1, cityName: '杭州', type: 0, typeCn: '全部', platform: 1, 'platformName': '点我吧'},
  		{cityId: 1, cityName: '杭州', type: 0, typeCn: '全部', platform: 2, 'platformName': '点我达'},
  		{cityId: 1, cityName: '杭州', type: 1, typeCn: '骑手', platform: 0, 'platformName': '汇总'},
  		{cityId: 1, cityName: '杭州', type: 1, typeCn: '骑手', platform: 1, 'platformName': '点我吧'},
  		{cityId: 1, cityName: '杭州', type: 1, typeCn: '骑手', platform: 2, 'platformName': '点我达'},
  		{cityId: 1, cityName: '杭州', type: 2, typeCn: '骑士', platform: 0, 'platformName': '汇总'},
  		{cityId: 1, cityName: '杭州', type: 2, typeCn: '骑士', platform: 1, 'platformName': '点我吧'},
  		{cityId: 1, cityName: '杭州', type: 2, typeCn: '骑士', platform: 2, 'platformName': '点我达'},

  		{cityId: 2, cityName: '上海', type: 0, typeCn: '全部', platform: 0, 'platformName': '汇总'},
  		{cityId: 2, cityName: '上海', type: 0, typeCn: '全部', platform: 1, 'platformName': '点我吧'},
  		{cityId: 2, cityName: '上海', type: 0, typeCn: '全部', platform: 2, 'platformName': '点我达'},
  		{cityId: 2, cityName: '上海', type: 1, typeCn: '骑手', platform: 0, 'platformName': '汇总'},
  		{cityId: 2, cityName: '上海', type: 1, typeCn: '骑手', platform: 1, 'platformName': '点我吧'},
  		{cityId: 2, cityName: '上海', type: 1, typeCn: '骑手', platform: 2, 'platformName': '点我达'},
  		{cityId: 2, cityName: '上海', type: 2, typeCn: '骑士', platform: 0, 'platformName': '汇总'},
  		{cityId: 2, cityName: '上海', type: 2, typeCn: '骑士', platform: 1, 'platformName': '点我吧'},
  		{cityId: 2, cityName: '上海', type: 2, typeCn: '骑士', platform: 2, 'platformName': '点我达'},
  	]
  }
  render() {
    return (
    	<div className="row">
    		<ExpandTable 
	      	columns = {this.getColumns()}
	      	dataSource = {this.getTableData()}
	      	bordered = {true}
	      	expands = {[
	      		{ key:'cityId',expandValue: 0 },
	      		{ key:'platform',expandValue: 0 },
	      		{ key:'type',expandValue: 0 }
	      	]}
	      />
    	</div>
      
    )
  }
}