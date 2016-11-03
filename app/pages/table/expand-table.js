import React, { 
  Component,
} from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import ExpandTable from './../../component/table/expand-table'
import { expandTableList } from './../../actions/expandTable' 
import { is } from 'immutable'

class expandTable extends Component {
	constructor(props) {
    super(props)
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
  shouldComponentUpdate(nextProps, nextState) {
  	return !is(nextProps.expandTableList, this.props.expandTableList)
  }
  getTableData() {
    const { expandTableList } = this.props
  	return expandTableList.toJS();
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
//export default connect(state => state)(expandTable);
export default connect((state, props) => ({
  expandTableList: state.get('expandTableList'), // immutable 数据在connet时必须用 get 获取
}))(expandTable)