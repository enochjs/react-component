'use strict'

import React, {
  Component,
} from 'react'
import { Table } from 'antd'
import lodash from 'lodash'
import './table.css'

export default class ExpandTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	tableList: [],
      baseItem:[],
      cacheData:{},  //根据expands 排列组合生产的有序对象。
      cacheList:[]
    }
  }
  componentWillReceiveProps(nextProps) {
    nextProps.dataSource && this.initTableData(nextProps.dataSource)
  }

  componentWillMount() {
  	this.initColumns(this.props.columns)
  	this.props.dataSource && this.initTableData(this.props.dataSource)
  }

  initColumns(columns){
  	var column = [];
  	columns.map(item => {
  		if( item.render === undefined ){
  			item.render = (text, record, index) => {
  				if(record[item.key + 'Expand'] === false){
  					return <span><i className = "anticon anticon-plus-square mr10" onClick={() => this.expandClick(record, item.key, index)}></i>{text}</span>
  				}
  				if(record[item.key + 'Expand'] === true){
  					return <span><i className = "anticon anticon-minus-square mr10" onClick={() => this.expandClick(record, item.key, index)}></i>{text}</span>
  				}
  				return text 
  			}
  		}
  	})
  }

  //排列组合数组 
  permutation (arr, num){
    var r=[];
    (function f(t,a,n){
      if (n === 0) return r.push(t);
      for (var i=0,l = a.length; i < l; i++){
        f(t.concat(a[i]), a.slice(0,i).concat(a.slice(i+1)), n-1);
      }
    })([],arr,num);
    return r;
  }
  // list 
  // type: line
  // expands: [{
  //     key: 'cityId',
  //     children: 'cityChildren'
  // }]
  initTableData (list){
    var expands = this.props.expands;
    var cacheData = {}, cacheList = [];
    var keys = expands.map(expand => expand.key);
    var keysArrList = this.permutation(keys, keys.length);
    keysArrList.map(keysArr => {
      this.arrayToObj([...keysArr], cacheData, [])
    })
    this.initListExpand(list, expands)
    this.copyData(list, expands, cacheData)
    this.setState({
      cacheList: list,
      cacheData: cacheData
    },()=>{
      this.initTableList(this.state.cacheList, expands);
    })
  }

  returnData (keys, cacheData){
    var keysArr = lodash.clone(keys);
    var data = null;
    (function f(keysArr, cacheData){
      if(keysArr.length === 1){
        data = cacheData[keysArr[0]]
      }else{
        var key = keysArr.shift(0);
        if(cacheData[key]){
          f(keysArr, cacheData[key])
        }else{
          return null
        }
      }
    })(keysArr, cacheData)
    return data;
  }

  initListExpand (list, expands){
    list.map(item => {
      expands.map(expand => {
        if(expand.expandValue === (item[expand.key])){
          item[expand.key + 'Expand'] = false
        }
      })
    })
  }

  copyData (list, expands, cacheData){
    list.map(item => {
      var keys = expands.map(expand => item[expand.key]);
      var keysArrList = this.permutation(keys, keys.length);
      var keys2 = expands.map(expand => expand.key);
      var keys2ArrList = this.permutation(keys2, keys2.length);
      keysArrList.map((keysArr, index) => {
        var buffer = {};
        this.arrayToObj([...keysArr], buffer, item)
        var data = this.returnData(keys2ArrList[index], cacheData)
        data.push(buffer)
      })
    })
  }
  //数组转为对象
  arrayToObj (arr, obj, value){
    var array = lodash.clone(arr);
    (function f(array,obj,value){
      if(array.length === 1){
        obj[array[0]] = value
      }else{
        if(obj[array[0]] === undefined){
          obj[array[0]] = {}
        }
        var key = array.shift(0);
        f(array, obj[key], value)
      }
    })(array,obj,value)
    return obj;
  }

  expandClick (tr, expandKey){
  	var data = this.findObj(tr, this.state.cacheList, this.props.expands);
  	data[expandKey + 'Expand'] = !data[expandKey + 'Expand'];
  	this.state.cacheList.map(item=>{
  		item.active = false;
  	})
  	data.active = true;
    var baseItem = this.state.baseItem;
    this.state.tableList = [];
    var buffer = [];
    this.expandList(baseItem, buffer, expandKey)
    this.pushList(tr, buffer, expandKey)
    this.setState({
      tableList: buffer
    })
  }

  pushList (tr, buffer, expandKey){
    var highLevel = [];
    var expandKeys = this.props.expands.filter(item=> item.key!==expandKey);
    for(var i=0; i < buffer.length; i++ ){
      if(this.equalObjKeys(tr, buffer[i], expandKeys, expandKey)){
        highLevel.push( buffer.splice(i,1)[0] );
        i--;
      }
    }
    var trIndex = 0;
    buffer.map((item,index)=>{
      if(this.equalObjKeys(tr, item, this.props.expands )){
        trIndex = index;
      }
    })
    if(buffer[trIndex][expandKey+'Expand']){
      for (var i = highLevel.length - 1; i >= 0; i--) {
        buffer.splice(trIndex+1,0,highLevel[i])
      }
    }
      
  }

  //比较两个对象中的 expandKeys 对应的值是否相等。
  equalObjKeys (tr, data , expandKeys, excepetKey){
    var count = 0;
    expandKeys.map(item=>{
      if( tr[item.key] === data[item.key] ){
        if(excepetKey){
          tr[excepetKey] != data[excepetKey] ? count++ : count = -9999;
        }else{
          count ++;
        }
      }
    })
    if(count === expandKeys.length){
      return true
    }
    return false
  } 

  //查看arr中查找data
  findObj (data, arr, expands){
    for (var i = arr.length - 1; i >= 0; i--) {
      var count = 0, l = expands.length;
      expands.map(e=>{
        if(data[e.key] === arr[i][e.key]){
          count++;
        }
      })
      if( count === l ){
        return arr[i];
      }
    }
    return null;
  }

  expandList (item, buffer){
    var expands = this.props.expands;
    if(!this.hasObj(item, buffer, expands)){
      buffer.push(item)
    }
    expands.map(expand=>{
      if(item[expand.key + 'Expand'] === true){
        var keys = expands.filter(sub=>sub.key!=expand.key);
        var keysArr = keys.map(key=>key.key)
        var dataArr = keys.map(key=> item[key.key])
        var data = this.returnData(keysArr,this.state.cacheData)
        data[expand.key].map(d=>{
          var keysData = this.returnData(dataArr,d)
          if(keysData != null){
            var curItem = keysData[Object.keys(keysData)[0]]
            if(!this.hasObj(curItem, buffer, expands)){
              buffer.push(curItem)
              this.expandList( curItem, buffer)
            }
          }
        })
      }
    })  
  } 

  //查看arr中是否有data
  hasObj (data, arr, expands){
    var bool = false;
    for (var i = arr.length - 1; i >= 0; i--) {
      var count = 0, l = expands.length;
      expands.map(e=>{
        if(data[e.key] === arr[i][e.key]){
          count++;
        }
      })
      if( count === l ){
        bool = true;
        return bool;
      }
    }
    return bool;
  }
    
  //设置初始列表
  initTableList (list, expands){
    var openItem = {};
    list.map((item,index)=>{
      var count = 0;
      expands.map(expand=>{
        if(item[expand.key + 'Expand'] != undefined){
          count++;
        }
      })
      if(count === expands.length){
        openItem = item
      }
    })
    this.setState({
      tableList: [openItem],
      baseItem: openItem
    })
  }
  getRowClassName(record, index){
  	if(record.active === true){
  		return 'active'
  	}
  }

  render(){
  	const { columns, dataSource, bordered ,size} = this.props
    return(
    	<div className="expand-table">
    		<Table
	        columns={columns}
	        dataSource={this.state.tableList}
	        bordered={bordered}
	        size={size}
	        pagination={false}
	        rowClassName={this.getRowClassName}
	      />
    	</div>
    )
  }
}



