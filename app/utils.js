const utils = {

	// 排列组合
	permutation: function(arr, num){
		var r=[];
    (function f(t,a,n){
      if (n === 0) return r.push(t);
      for (var i=0,l = a.length; i < l; i++){
        f(t.concat(a[i]), a.slice(0,i).concat(a.slice(i+1)), n-1);
      }
    })([],arr,num);
    return r;
	},
	//数组转为对象
  arrayToObj: function(arr, obj, value){
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
  },
}
export default utils