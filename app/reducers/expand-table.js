import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

const initialState = fromJS([
  {cityId: 0, cityName: '全国', type: 0, typeCn: '全部', platform: 0, 'platformName': '汇总'},
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
])

export const expandTableList = handleActions({
  'request expand table list'(state, action) {
    return fromJS(action.payload)
  },
}, initialState)

// export const expandTableList = (state = initialState, action) => {
//   switch( action.type ){
//     case 'request expand table list': 
//       return state;
//     default:
//       return state;
//   }
// }