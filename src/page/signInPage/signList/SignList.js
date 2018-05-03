import React,{Component} from 'react'
import {
	ScrollView,
	View,
	Text, StyleSheet
} from 'react-native'
import { Calendar,Agenda } from 'react-native-calendars';
import pxToDp from "../../../util/pxToDp";
import {formatDate, formatTime} from "../../../util/formatTime";
import {wrapComponent} from "react-eflow/lib/eflow";
import OAStore from "../../../store";



class SignList extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			signInView : null,
			items:{}
		}
	}
	componentDidMount(){
		OAStore.userCompletedInfo();
		OAStore.signInList();
		OAStore.findMyApproveList();
		
	}
	componentWillReceiveProps(nextProps){
		this.loadItems((new Date().setHours(0,0,0,0)))
	}
	
	hangOutItem(day){
		let {findMyApproveList} = this.props;
		let hangOutItem = null;
		// let timeNow = Date.now();
		
		findMyApproveList.some((item,i)=>{
			if (item.approveStatus === 'Y'){
				if (day >= item.startTime && day <= item.endTime){
					hangOutItem = item;
					return true;
				}
			}
		})
		return hangOutItem;
	}
	
	handleDayPress(day){
		let signInItem, signInView;
		let date = new Date(day.timestamp)
		
		let {signInList} = this.props;
		
		if (date.getDay()===0||date.getDay()===6){
			signInItem = {
				startTime: ''
			}
		} else {
			for(let i=0; i<signInList.length; i++){
				if(signInList[i] === day.timestamp){
					signInItem = signInList[i];
					break;
				}
			}
		}
		this.setState({signInView})
	}
	renderHangOutItem(hangOutItem){
		let hangOutItemView = null;
		if(hangOutItem){
			if(hangOutItem.type){ // 请假
				hangOutItemView = (
					<View style={{flexDirection:'row', alignItems:'center',}}>
						<View style={styles.dot}/>
						<View style={styles.hangout}>
							<Text>您今天处于{hangOutItem.type} > </Text>
							<Text style={{fontSize:13,color:'#666666'}}>{formatDate(hangOutItem.startTime)}  -  {formatDate(hangOutItem.endTime)}</Text>
						</View>
					</View>
				)
			} else { // chuchai
				hangOutItemView = (
					<View style={{flexDirection:'row', alignItems:'center',}}>
						<View style={styles.dot}/>
						<View style={styles.hangout}>
							<Text>您今天出差在{hangOutItem.destination} > </Text>
							<Text style={{fontSize:13,color:'#666666'}}>{formatDate(hangOutItem.startTime)}  -  {formatDate(hangOutItem.endTime)}</Text>
						</View>
					</View>
				)
			}
		}
		return hangOutItemView
		
	}
	
	getItem(date){
		let r = null;
		this.props.signInList.forEach((item, i)=>{
			if (item.date === date){
				r = item
			}
		})
		return r;
	}
	
	loadItems = ()=> { // {year, month, timestamp, dateString}
		let userEntryDate = this.props.userCompletedInfo.entryDate;
		let newItems = {};
		
		if (userEntryDate){
			let time = (new Date(userEntryDate)).setHours(0,0,0,0); // 1523894400000
			while (time <= Date.now()){
				const strTime = formatDate(time);
				newItems[strTime] = [];
				newItems[strTime].push(this.getItem(time)); // [] || null
				time += 24 * 60 * 60 * 1000
			}
		}
		// console.log(newItems);
		return newItems;
	}
	
	renderItem(item) {
		// console.log(item);
		
		if (item.isInRest){  // rest
			let hangOutItem = this.hangOutItem(item.date);
			return this.renderHangOutItem(hangOutItem)
		} else {
			return(
				<View style={[styles.emptyDate,{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
					<View>
						<Text style={{fontSize:14,}}>上班打卡时间{item.startTime?formatTime(item.startTime):''}</Text>
						<Text style={{fontSize:11,color:'#666666'}}>{item.startAddress.split(',')[0]}</Text>
					</View>
					<View style={{marginRight:pxToDp(50)}}>
						<Text style={{fontSize:14,}}>下班打卡时间{item.endTime?formatTime(item.endTime):''}</Text>
						<Text style={{fontSize:11,color:'#666666'}}>{item.endAddress.split(',')[0]}</Text>
					</View>
				</View>
			)
		}
	}
	
	renderEmptyDate(item) {
		let day = (new Date(item)).getDay();
		if (day === 0 || day === 6){ // weekend
			return (
				<View style={[styles.emptyDate,]}><Text>周末时间</Text></View>
			);
		} else {
			return (
				<View style={styles.emptyDate}><Text style={{color:'#EE7600'}}>考勤异常(漏打卡)</Text></View>
			);
		}
	}
	
	rowHasChanged(r1, r2) {
		return r1.date !== r2.date;
	}
	render(){
		
		return(
			<View style={{flex:1, backgroundColor:'#fff'}}>
				{/*/>*/}
				<Agenda
					items={this.loadItems()}
					minDate={this.props.userCompletedInfo.entryDate}
					maxDate={new Date()}
					// loadItemsForMonth={this.loadItems.bind(this)}
					// selected={'2018-04-19'}
					renderItem={this.renderItem.bind(this)}
					renderEmptyDate={this.renderEmptyDate.bind(this)}
					rowHasChanged={this.rowHasChanged.bind(this)}
					style={{height:1000}}
				/>
			</View>
			
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
		// marginTop:pxToDp(30),
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
	},
	calendar: {
		borderTopWidth: 1,
		paddingTop: 5,
		borderBottomWidth: 1,
		borderColor: '#eee',
		height: 350
	},
	item: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: pxToDp(5),
		padding: pxToDp(10),
		marginRight: pxToDp(10),
		marginTop: pxToDp(17)
	},
	emptyDate: {
		height: pxToDp(100),
		flex:1,
		paddingTop: pxToDp(30),
		justifyContent:'center',
		// backgroundColor:'#ccc'
		borderBottomWidth:1,
		borderColor:'#dddddd'
	}
});

export default wrapComponent(SignList, [OAStore.userCompletedInfo,OAStore.signInList,OAStore.findMyApproveList]);
