import Taro,{Component} from '@tarojs/taro';
import {View,Text,Image} from  '@tarojs/components';
import {getAllFoodInfo,getEvent} from '../../utils/common/common'
import './bottom.less';
let events =getEvent();
class Bottom extends Component{
	constructor(){
		super(...arguments);
		this.state={
			Num:0,
			sendPrice:3,
			supportByself:false,
			sendMustPrice:20, //满多少钱起送
			allPrice:0  //总价格
		}
	}
	componentDidMount(){
		let {allPrice,allNum} = getAllFoodInfo();
		this.setState({Num:allNum,allPrice:allPrice})
		const base64 = 'CxYh'
        const arrayBuffer = Taro.base64ToArrayBuffer(base64)
        console.log("========"+arrayBuffer);//页面加载完后执行
		//获得计算好的设置给state
		events.on("addcut",()=>{
		let {allPrice,allNum} = getAllFoodInfo();
		this.setState({Num:allNum,allPrice:allPrice})
		});
	}
	render(){
		let {allPrice,Num,sendMustPrice} =this.state;
		return (<View className='bottom'>
		  <View className='bottom_body'>
		  	{this.state.Num===0?"":<Text className="num">{this.state.Num}</Text>}
			{Num?<Image className='store_img' src={require('../../assets/img/store.png')}></Image>:<Image className='store_img' src={require('../../assets/img/emptystore.png')}></Image>}
			<View>{allPrice?<Text className='info'>¥{allPrice}|</Text>:<Text className='info'>{this.state.sendPrice?"另需配送费¥ |"+this.state.sendPrice:""}</Text>}<Text>{this.state.supportByself?"支持自取":"不支持自取"}</Text></View>
			<View>{allPrice>=sendMustPrice?<Text className="goPay">结算</Text>:<Text className='submit'>¥20元起送</Text>}</View>
		  </View>
		</View>)
	}
}
export default Bottom;
