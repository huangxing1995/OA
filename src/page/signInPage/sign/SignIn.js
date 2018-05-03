import React, {Component} from 'react'
import {
	Image,
	View,
	TouchableOpacity,
	Text,
	Button,
	ScrollView,
	TextInput,
	StyleSheet,
	Dimensions, Alert,
} from 'react-native'
// import Modal from "react-native-modal";
import {wrapComponent} from 'react-eflow'
import OAStore from '../../../store/index'
import pxToDp from "../../../util/pxToDp";
import {ak} from '../../../config/index'
import {formatDate,formatTime} from '../../../util/formatTime'
import convertPinyin from "../../../util/convertPinyin";
// import {getLongitudeAndLatitude} from '../../util/getLongitudeAndLatitude'


const WIDTH = Dimensions.get('window').width;

class SignIn extends Component{
	constructor(props){
		OAStore.signInList();
		super(props);
		let {signInList} = props;
		let startTime=0,endTime=0,startAddress='',endAddress='',isInRest=false;
		let date = (new Date()).setHours(0,0,0,0);
		
		signInList.forEach((item,i)=>{
			if (item.date === date){
				
				startTime = item.startTime,
				endTime = item.endTime,
				startAddress = item.startAddress,
				endAddress = item.endAddress,
				isInRest = item.isInRest;
			}
		});
	
		this.state = {
			date,
			isInRest,
			timeNow:Date.now(),
			startTime,
			endTime,
			
			position:{
				latitude:30.6127176027,
				longitude:114.3632846762
			},
			
			address:'',
			startAddress,
			endAddress
		}
	}
	componentDidMount(){
		OAStore.signInList();
		// navigator.geolocation.getCurrentPosition(
		// 	(position) => {
		// 		let initialPosition = JSON.stringify(position);
		// 		this.fetchPosition(initialPosition);
		// 		this.setState({position: initialPosition});
		// 	},
		// 	(error) => console.error(error.message),
		// 	{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		// );
		// this.watchID = navigator.geolocation.watchPosition((position) => {
		// 	let lastPosition = JSON.stringify(position);
		// 	console.log(lastPosition);
		// 	this.setState({position:lastPosition});
		// });
		
		OAStore.signInList();
		// 检验当天是否有假单，有则不能签到
		OAStore.findMyApproveList();
		
		this.timer = setInterval(()=>{
			this.fetchPosition(this.state.position);
			}
		,1000)
	}
	
	componentWillReceiveProps(nextProps){ //[{date,isInRest,startAddress,endAddress,startTime,endTime}]
		let {signInList} = nextProps;
		signInList.forEach((item,i)=>{
			if (item.date === this.state.date){
				// console.log(item)
				this.setState({
					startTime: item.startTime,
					endTime: item.endTime,
					startAddress: item.startAddress,
					endAddress: item.endAddress,
					isInRest: item.isInRest
				})
			}
		})
	}
	
	fetchPosition(position){  // 设置address
	let url =
			`https://api.map.baidu.com/geocoder/v2/?location=30.6127176027,114.3632846762&output=json&pois=1&ak=${ak}`;
		
		fetch(url)
			.then(res=>res.json())
			.then(data=>{
				if (data.status === 0){
					this.setState({address:data.result.sematic_description},()=>{
						// console.log(this.state.address);
					})
				}
			})
			.catch(err=>console.error(err));
	}
	componentWillUnmount() {
		// navigator.geolocation.clearWatch(this.watchID);
		clearInterval(this.timer);
	}
	hangOutItem(){
		let {findMyApproveList} = this.props;
		let hangOutItem = null;
		let timeNow = this.state.timeNow;
		
		findMyApproveList.some((item,i)=>{
			if (item.approveStatus === 'Y'){
				if (timeNow > item.startTime && timeNow < item.endTime){
					hangOutItem = item;
					return true;
				}
			}
		});
		// console.log(hangOutItem)
		// this.setState({hangOutItem})
		return hangOutItem;
	}
	
	handleSignIn(){
		if (this.state.isInRest){
			Alert.alert(
				'',
				'今天请假，无需签到',
				[
					{text: '确定', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false}
			);
		} else {
			this.setState({startTime:Date.now(),startAddress:this.state.address},()=>{
				let {startTime,endTime,startAddress,endAddress,date}  = this.state;
				let isInRest = !!this.hangOutItem();
				OAStore.updateSignIn({
					date,
					startTime,
					startAddress,
					endTime,
					endAddress,
					isInRest
				})
				
			})
		}
	}
	handleSignOut(){
		if (this.state.isInRest){
			Alert.alert(
				'',
				'今天请假，无需签到',
				[
					{text: '确定', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false}
			);
		} else {
			this.setState({endTime:Date.now(),endAddress:this.state.address},()=>{
				let {startTime,endTime,startAddress,endAddress,date}  = this.state;
				let isInRest = !!this.hangOutItem();
				OAStore.updateSignIn({
					date,
					startTime,
					startAddress,
					endTime,
					endAddress,
					isInRest
				})
			})
		}
		
	}
	render(){
		let uri =
			`https://api.map.baidu.com/staticimage/v2?ak=${ak}&mcode=666666&center=114.3632846762,30.6127176027&zoom=15`;
		
		let hangOutItem = this.hangOutItem();
		let hangOutItemView = null;
		if(hangOutItem){
			if(hangOutItem.type){ // 请假
				hangOutItemView = (
					<View style={{flexDirection:'row', alignItems:'center', marginTop:pxToDp(50),}}>
					<View style={styles.dot}/>
						<View style={styles.hangout}>
							<Text>您今天处于{hangOutItem.type} > </Text>
							<Text style={{fontSize:13,color:'#666666'}}>{formatDate(hangOutItem.startTime)}  -  {formatDate(hangOutItem.endTime)}</Text>
						</View>
					</View>
				)
			} else { // chuchai
				hangOutItemView = (
					<View style={{flexDirection:'row', alignItems:'center', marginTop:pxToDp(50),}}>
						<View style={styles.dot}/>
						<View style={styles.hangout}>
							<Text>您今天出差在{hangOutItem.destination} > </Text>
							<Text style={{fontSize:13,color:'#666666'}}>{formatDate(hangOutItem.startTime)}  -  {formatDate(hangOutItem.endTime)}</Text>
						</View>
					</View>
				)
			}
		}
		let isInWeekend = ((new Date()).getDay() === 0 || (new Date()).getDay() === 6);
		return(
			<ScrollView style={{flex:1,padding:pxToDp(20),backgroundColor:'#ffffff'}}>
				{/*time*/}
				<View style={styles.header}>
					<Image source={require('../../../resource/time.png')} style={{width:pxToDp(20),height:pxToDp(20),marginRight:pxToDp(20)}}/>
					<Text style={{color:'#666666'}}>{formatDate(Date.now())}</Text>
				</View>
				
				{/*address*/}
				<View style={styles.address}>
					<Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.address.split(',')[0]}</Text>
				</View>
				
				{/*map*/}
				<Image source={{uri}} style={{height:pxToDp(300),borderRadius:pxToDp(20)}}/>
				
				{/*hangout*/}
				<View>
					{hangOutItemView}
				</View>
				
				{/*sign in*/}
				{!isInWeekend?(
					<View style={styles.row}>
						<View style={styles.dot}/>
						<View style={styles.right}>
							<Text style={{fontSize:13,color:'#666666'}}>上班时间 09：00</Text>
							{ !this.state.startTime
								? (
									<View style={styles.sign}>
										<TouchableOpacity style={styles.signBtn} onPress={()=>{
											if (hangOutItem && hangOutItem.type){
												Alert.alert(
													'',
													'请假时间不需要打卡',
													[
														{text: '确定', onPress: () => console.log('OK Pressed')},
													],
													{cancelable: false}
												);
											} else {
												this.handleSignIn()
											}
										}}>
											<Text style={styles.txt}>上班打卡</Text>
											<Text style={[styles.txt,{fontSize:18}]}>{formatTime(this.state.timeNow)}</Text>
										</TouchableOpacity>
									</View>)
								: (
									<View style={{marginTop:pxToDp(50)}}>
										<Text style={{fontSize:16,fontWeight:'bold'}}>上班打卡时间{this.state.startTime?formatTime(this.state.startTime):''}</Text>
										<Text style={{fontSize:13,color:'#666666'}}>{this.state.startAddress}</Text>
									</View>
								)
							}
						</View>
					</View>
				):(
					<View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:pxToDp(100)}}>
						<Image source={require('../../../resource/weekend.png')} style={{width:pxToDp(400),height:pxToDp(400)}}/>
						<Text style={{color:'#333',fontSize:14,marginTop:pxToDp(50)}}>周末时间～</Text>
					</View>
				)}
				
				{/*sign out */}
				{!isInWeekend?(
					<View style={styles.row}>
						<View style={styles.dot}/>
						<View style={styles.right}>
							<Text style={{fontSize:13,color:'#666666'}}>下班时间 18：00</Text>
							{ (this.state.startTime)
								? !this.state.endTime
									? ((<View style={styles.sign}>
										<TouchableOpacity style={styles.signBtn} onPress={()=>this.handleSignOut()}>
											<Text style={styles.txt}>下班打卡</Text>
											<Text style={[styles.txt,{fontSize:18}]}>{formatTime(this.state.timeNow)}</Text>
										</TouchableOpacity>
									</View>))
									: (
										<View style={{marginTop:pxToDp(50)}}>
											<Text style={{fontSize:16,fontWeight:'bold'}}>下班打卡时间{this.state.endTime?formatTime(this.state.endTime):''}</Text>
											<Text style={{fontSize:13,color:'#666666'}}>{this.state.endAddress}</Text>
										</View>
									)
								: null
							}
						</View>
					</View>
				):null}
				
				
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	header:{
		height:pxToDp(50),
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
	},
	address:{
		height:pxToDp(50),
		justifyContent:'center',
		// alignItems:'center',
	},
	sign:{
		justifyContent:'center',
		alignItems:'center',
		// backgroundColor:'#ccc',
		// marginTop:pxToDp(100)
		
	},
	signBtn:{
		width:pxToDp(200),
		height:pxToDp(200),
		backgroundColor:'#FFA500',
		borderRadius:pxToDp(100),
		alignItems:'center',
		justifyContent:'center',
	},
	txt:{
		fontSize:16,
		color:'#fff',
		marginTop:pxToDp(10)
	},
	row:{
		flexDirection:'row',
		// alignItems:'center',
		marginTop:pxToDp(50),
		height:pxToDp(250),
		// backgroundColor:'#ccc'
		
	},
	hangout:{
		// marginTop:pxToDp(30),
		// backgroundColor:'red',
		paddingLeft:pxToDp(30),
		flex:1
	},
	dot:{
		width:pxToDp(6),
		height:pxToDp(6),
		backgroundColor:'#009ACD',
		alignSelf:'flex-start',
		marginTop:pxToDp(12)
	},
	right:{
		// backgroundColor:'red',
		paddingLeft:pxToDp(30),
		flex:1
	}
});


export default wrapComponent(SignIn, [OAStore.signInList,OAStore.findMyApproveList]);

