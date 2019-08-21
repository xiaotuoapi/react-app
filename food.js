import Taro,{Component} from '@tarojs/taro';
import {View,Text,Image} from  '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
//import '../../../node_modules/taro-ui/dist/style/components/tabs.scss';
import Cata from './cata';
import FoodList from './foodlist/foodlist';
import './food.less';
/*tab分类*/
class Food extends Component{
	constructor(){
		super(...arguments)
		this.state = {
			current: 0,
			tabList: [{title:'点菜'},{title:'评价'},{title:'上家'}],
			foodList: [],   //数据存储，默认为空
			currentList: [],
			selectCata:null
		}
	}
	handleClick = (value)=>{
		this.setState({
			current: value
		})
	}
	changeCata=(selectCata)=>{
		this.setState({selectCata:selectCata});
		if(this.state.foodList.some((item)=>item.pid==selectCata.id)){
			//不用加载数据，直接存入数据值currentList
			this.setState({
				currentList:this.state.foodList.filter((item)=>item.pid==selectCata.id)
			})
		}else{
			//加载数据，先将数据存入foodList中，然后同步放入currentList
			this.setState({
				foodList:this.state.foodList.concat(this.getData(selectCata))},()=>{
					this.setState({currentList:this.state.foodList.filter((item)=>item.pid==selectCata.id)})
					//console.log("======"+JSON.stringify(this.state.currentList))
				})
		}
	}
	getData(selectCata){
		//console.log("selectCata===="+JSON.stringify(selectCata))
		let count  = Math.round(Math.random()*2);
		//let imgurl =`../../../assets/img/${count}.png`;
		//console.log("selectCata==imgurl=="+JSON.stringify(imgurl))
		return Array.from(Array(Math.round(Math.random()*20)),(v,k)=>({price:Math.round(Math.random()*20),img:count,sale:Math.round(Math.random()*20),pid:selectCata.id,id:selectCata.id+"_"+k,title:"分类"+selectCata.id+"菜品"+(k+1)}));
	}
	render(){
		//const tabList =[{title:'标签1'},{title:'标签2'},{title:'标签3'}];
		let {current,tabList} =this.state;  //this.state.current  this.state.tabList
		//解决兄弟组件信息传递方案:1通过父组件2/通过事件监听 3/redaks
		return (<View className='food'>
			<AtTabs current={current} tabList={tabList} onClick={this.handleClick}>
			 <AtTabsPane current={this.state.current} index={0}>
                <View className ="food_body">
                    <Cata  onChangeCata={this.changeCata.bind(this)} className="food_cata"/>
                    <FoodList style="width:100%" selectCata={this.state.selectCata} currentList ={this.state.currentList}/>
                </View>
             </AtTabsPane>
             <AtTabsPane current={this.state.current} index={1}>
			    <View style='font-size:18px;text-align:center;height:100px;'>评价</View>
			  </AtTabsPane>
			  <AtTabsPane current={this.state.current} index={2}>
    			<View style='font-size:18px;text-align:center;height:100px;'>商家</View>
 			  </AtTabsPane>
			</AtTabs>
		</View>)
	}
}
export default Food;
