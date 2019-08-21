import Taro,{Component} from '@tarojs/taro';
import {View,Text,Image} from  '@tarojs/components';
import {getFoodCount,setFoodCount,getEvent} from "../../utils/common/common";
import './addcut.less';
let getEvents = getEvent();
class AddCut extends Component{
	constructor(){
		super(...arguments)
		this.state={
			Num:0
		}
	}
	componentDidMount(){
		this.setState({
			Num:getFoodCount(this.props.food)
		})
		getEvents.on("changeCata",()=>{
			//监听分类改变，菜品数量刷新
			this.setState({Num:getFoodCount(this.props.food)})
		})
	}
	//减一
	cutfood(){
		if(this.props.food){
			if(this.state.Num>0){
				this.setState({Num:setFoodCount(this.props.food,this.state.Num,"cut")},()=>{
					this.setState({Num:getFoodCount(this.props.food)});
					getEvents.emit("addcut");
				});
			}else{
				console.error("something goes wrong")
			}
		}
		//console.log(JSON.stringify(this.props.food))
	}
	//加一
	addfood(){
		//console.log(JSON.stringify(this.props.food))
		if(this.props.food){
			this.setState({Num:setFoodCount(this.props.food,this.state.Num,"add")},()=>{
				//Num:getFoodCount(this.props.food)
				this.setState({Num:getFoodCount(this.props.food)});
				getEvents.emit("addcut");
			});
		}
	}
	render(){
		let {Num} =this.state;
		let hideclass =Num>0?"":"hide";
		return (<View className="addcut">
			<Image onClick={this.cutfood.bind(this)} className={'opeate_img '+hideclass} src={require("../../assets/img/cut.png")}></Image>
			<Text  className={'food_num '+hideclass}>{Num}</Text>
			<Image onClick={this.addfood.bind(this)} className='opeate_img' src={require("../../assets/img/add.png")}></Image>
		</View>)
	}
}
export default AddCut;
