//获取菜品数量，通过传入的信息来统计当前有多少菜品的数量
//缓存数据、 H5、小程序
import Taro from '@tarojs/taro';
import Event from '../event/events';
const foodKey ='taro_meituan';
let myEvent = new Event();
export function getFoodCount(food){
	let store =Taro.getStorageSync(foodKey);
	//store.clear(); 清除缓存数据
	if(store){
		//查找
		if(store[food.id]){
			return store[food.id].Num;
		}else{
			return 0;
		}
	}else{
		return 0;
	}
}
//设置菜品数量，当加菜或减菜时， Num是有加减菜组件自身的state存储的，加、减
//当减的数量等于0时，需要删除菜品的数据结构
//当加菜时，发现数据结构中没有该菜品，需要新增该菜品数据结构
export function setFoodCount(food,Num,type,callBack){
	if(food){
		let store =Taro.getStorageSync(foodKey);
		//console.log(JSON.stringify(store))
		if(!store){
			store={}
		}
		if(type=="cut"){
			if(Num==1){
				if(store[food.id]){
					//console.log(food.id +"======="+JSON.stringify(store[food.id]));
					delete store[food.id]
					//console.log(food.id +"======="+JSON.stringify(store));
				}
		    }else{//
				if(store[food.id]){
					//console.log(food.id +"======="+JSON.stringify(store[food.id]));
					store[food.id].Num =Num-1;//数量减一;结构不变
					//console.log(food.id +"======="+JSON.stringify(store));
				}
		    }
		}
		if(type=="add"){
			if(store[food.id]){ //存在
				store[food.id].Num =Num+1;
				//console.log(food.id +"===1===="+JSON.stringify(store[food.id]));
			}else{//不存在
				//console.log(food.id +"===2===="+JSON.stringify(store[food.id]));
				//store[food.id].Num =1;
				//store[food.id]={Num:1};
				//或者这样 
				store[food.id]={Num:1,...food};
			}
		}
		Taro.setStorageSync(foodKey,store);//进行缓存数据更新
		callBack&&callBack();
	}
}
export function getEvent(){
	return myEvent;
}
//取出所有的菜品数量及价格
export function getAllFoodInfo(){
	let allPrice =0;//总价格
	let allNum =0;//总数量
	let store = Taro.getStorageSync(foodKey);
	if(store){
		//对store进行循环
		Object.keys(store).map((key)=>{
			if(store[key]){
				allPrice +=store[key].price*store[key].Num;
				allNum +=store[key].Num;
			}
		})
	}
	return {allPrice,allNum}
}
