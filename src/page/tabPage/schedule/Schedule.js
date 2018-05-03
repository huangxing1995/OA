import React,{Component} from 'react'
import {
	ScrollView,
	View,
	Text,
	Modal,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
	Button, Alert
} from 'react-native'
import { Calendar,Agenda, LocaleConfig} from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';

import pxToDp from "../../../util/pxToDp";
import {formatDate, formatDateAndTime, formatTime} from "../../../util/formatTime";
import {wrapComponent} from "react-eflow/lib/eflow";
import OAStore from "../../../store";

LocaleConfig.locales['fr'] = {
	monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	monthNamesShort:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	dayNames: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
	dayNamesShort: ['一','二','三','四','五','六','日'],
};
LocaleConfig.defaultLocale = 'fr';


class Schedule extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			modalVisible:false,
			isDateTimePickerVisible: false,
			datePickerType:'',
			isInUpdateMode:false,
			updateId:'',
			
			selectedDay:(new Date()).setHours(0,0,0,0),
			
			scheduleItemInfo:{
				startTime:0,
				endTime:0,
				todo:'',
			}
		};
	}
	componentWillMount(){
		console.log('******************** schedule page *******************')
		OAStore.scheduleList();
		OAStore.userInfo();
		OAStore.scheduleList();
	}
	
	_showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	}
	
	_hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
	}
	
	handleSelectStartTime(){
		this.setState({datePickerType:'startTime'})
		this._showDateTimePicker();
	}
	
	handleSelectEndTime(){
		this.setState({datePickerType:'endTime'})
		this._showDateTimePicker();
	}
	
	_handleDatePicked = (date) => {
		let {datePickerType,scheduleItemInfo} = this.state;
		if (datePickerType === 'startTime'){
			scheduleItemInfo.startTime =  Date.parse(date);
		} else if (datePickerType === 'endTime'){
			if (Date.parse(date) < scheduleItemInfo.startTime){
				Alert.alert(
					'',
					'结束时间不能小于开始时间',
					[
						{text: '确定', onPress: () => console.log('OK Pressed')},
					],
					{cancelable: false}
				);
				return;
			}
			scheduleItemInfo.endTime =  Date.parse(date);
		}
		this.setState({scheduleItemInfo: scheduleItemInfo});
		this._hideDateTimePicker();
	};
	
	handleCloseModal(){
		this.setState({modalVisible:false});
	}
	
	handleOpenModal(){
		this.setState({modalVisible:true})
	}

	getItem(date){
		let r = [];
		// console.log(this.props.scheduleList)
		this.props.scheduleList.forEach((schedule, i)=>{ //{employeeUm, date, items:[{startTime,endTime,todo}]
			if (schedule.date === date){
				r = schedule.items
			}
		});
		return r;
	}
	
	loadItems = ()=> { // {year, month, timestamp, dateString}
		let newItems = {};
		let today = (new Date()).setHours(0,0,0,0); // 1523894400000
		// console.log('today'+today)
		for (let i = -15; i < 85; i++) {
			let date = today + i * 24 * 60 * 60 * 1000;
			// console.log(date)
			const strTime = formatDate(date);
			// newItems[strTime] = [];
			newItems[strTime] = [].concat(this.getItem(date)); // getItems is a []
		}
		// console.log(newItems)
		return newItems;
	};

	onDayPress = (day)=> {
		// console.log(day.timestamp)
		this.setState({
			selectedDay: (new Date(day.timestamp)).setHours(0,0,0,0)
		});
	};
	
	addAndPushTodo(item){
		this.setState({scheduleItemInfo:item},()=>{
			this.handleOpenModal();
		})
	}
	updateTodo(item){
		this.setState({scheduleItemInfo:item,isInUpdateMode:true,updateId: item._id},()=>{
			this.handleOpenModal();
		})
	}
	handleChangeText(key, text){
		let scheduleItemInfo = this.state.scheduleItemInfo;
		scheduleItemInfo[key] = text;
		this.setState({scheduleItemInfo})
	}
	handleSave(){
		let {selectedDay, scheduleItemInfo} = this.state;
		// 判断是否时间重合
		let data = this.loadItems()[formatDate(this.state.selectedDay)];
		
		let isCover = data.some(item=>{
			if (scheduleItemInfo.endTime>item.startTime&&scheduleItemInfo.startTime<item.endTime){
				return true
			}
		});
		if (isCover){
			Alert.alert(
				'',
				'该日程与其他日程时间冲突',
				[
					{text: '确定', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false}
			);
		} else {
			if (this.state.isInUpdateMode){
				OAStore.updateSchedule(this.state.selectedDay, this.state.scheduleItemInfo,this.state.updateId)
				this.setState({isInUpdateMode:false,updateId: ''})
			} else {
				OAStore.addSchedule(selectedDay, scheduleItemInfo)
			}
			this.handleCloseModal();
		}
	}
	handleDelete(){
		OAStore.deleteSchedule(this.state.selectedDay, this.state.scheduleItemInfo,this.state.updateId)
		this.setState({isInUpdateMode:false,updateId: ''})
		this.handleCloseModal();
	}
	renderModal(){
		return (
			<View style={{flex:1,marginTop:pxToDp(100),backgroundColor:'#f3f3f3'}}>
				{/*schedule */}
				<View style={{height:pxToDp(250),marginTop:pxToDp(100),marginBottom:pxToDp(100)}}>
					<TextInput
						value={this.state.scheduleItemInfo.todo}
						placeholder={'请输入您的日程'}
						onChangeText={(text)=>this.handleChangeText('todo',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}
						multiline={true}
					/>
				</View>
				
				{/*// 开始时间*/}
				<View style={styles.btnWrap}>
					<Text>开始时间</Text>
					<TouchableOpacity onPress={()=>this.handleSelectStartTime()} style={{flexDirection:'row',	justifyContent: 'space-between',alignItems:'center'}}>
						<Text>{formatTime(this.state.scheduleItemInfo.startTime)}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				{/*// 结束时间*/}
				<View style={styles.btnWrap}>
					<Text>结束时间</Text>
					<TouchableOpacity onPress={()=>this.handleSelectEndTime()} style={{flexDirection:'row',	justifyContent: 'space-between',alignItems:'center'}}>
						<Text>{formatTime(this.state.scheduleItemInfo.endTime)}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				
				{/*保存*/}
				<TouchableOpacity style={styles.button} onPress={()=>this.handleSave()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>保存</Text>
				</TouchableOpacity>
				
				{/*删除*/}
				{
					this.state.isInUpdateMode ? (
						<TouchableOpacity style={[styles.button,{backgroundColor:'#EE6A50',marginTop: pxToDp(20)}]} onPress={()=>this.handleDelete()} underlayColor='#99d9f4'>
							<Text style={styles.buttonText}>删除</Text>
						</TouchableOpacity>
					): null
				}
				
				{/*取消*/}
				<TouchableOpacity style={[styles.button,{backgroundColor:'#dedede',marginTop: pxToDp(20),}]} onPress={()=>this.handleCloseModal()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>取消</Text>
				</TouchableOpacity>
				
				<DateTimePicker
					mode={'datetime'}
					date={new Date(this.state.selectedDay)}
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
					
					titleIOS={'请选择'}
					cancelTextIOS={'取消'}
					confirmTextIOS={'确定'}
					
				/>
			</View>
		)
	}
	render(){
		let data = this.loadItems()[formatDate(this.state.selectedDay)];
		let scheduleView = []
		if(data.length){
			data.forEach((item, i)=>{
				scheduleView.push(
					<TouchableOpacity style={styles.scheduleItem} key={i} onPress={()=>this.updateTodo(item)}>
						<Text>{formatTime(item.startTime)} - </Text>
						<Text>{formatTime(item.endTime)}</Text>
						<Image source={require('../../../resource/schedule.png')} style={{width:pxToDp(30),height:pxToDp(30),marginLeft:pxToDp(30),}}/>
						<Text numberOfLines={1} style={{marginLeft:pxToDp(30),fontSize:14,fontWeight:'bold'}}>{item.todo}</Text>
					</TouchableOpacity>
				)
			})
		}
		
		let scheduleList = data.length
			? (
				scheduleView
			)
			: (
				<TouchableOpacity onPress={()=>this.addAndPushTodo({startTime:0,endTime:0,todo:''})} style={styles.createSchedule}>
					<Image
						style={{width:pxToDp(150),height:pxToDp(150),marginLeft:pxToDp(50)}}
						source={require('../../../resource/create-schedule.png')}/>
					<View style={{flex:1,justifyContent:'space-between',alignItems:'center'}}>
						<Text style={{fontSize:14}}>管理工作中重要的事情</Text>
						<Text style={{fontSize:12,color:'#00BFFF',marginTop:pxToDp(20)}}>创建日程</Text>
					</View>
				</TouchableOpacity>
			);
		
		return(
			<View style={{flex:1,}}>
				<Calendar
					onDayPress={this.onDayPress}
					style={styles.calendar}
					// hideExtraDays
					markedDates={{[formatDate(this.state.selectedDay)]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
				/>
				
				<ScrollView style={{flex:1, marginTop:pxToDp(10)}}>
					
					{scheduleList}
					
					<Modal
					animationType={"slide"}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={()=>console.log('android request close')}
					>
						{this.renderModal()}
					</Modal>
				</ScrollView>
				
				{/*add*/}
				<TouchableOpacity
					onPress={()=>this.addAndPushTodo({startTime:0,endTime:0,todo:''})}
					style={[styles.clear,{	bottom:pxToDp(100),}]}>
					<Image source={require('../../../resource/add-schedule.png')} style={{width:pxToDp(40),height:pxToDp(40)}}/>
				</TouchableOpacity>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: pxToDp(5),
		padding: pxToDp(10),
		marginRight: pxToDp(10),
		marginTop: pxToDp(17)
	},
	emptyDate: {
		height: pxToDp(20),
		flex:1,
		paddingTop: pxToDp(30),
		justifyContent:'center'
	},
	calendar: {
		borderTopWidth: 1,
		paddingTop: 5,
		borderBottomWidth: 1,
		borderColor: '#eee',
		// height: pxToDp(350)
	},
	text: {
		textAlign: 'center',
		borderColor: '#bbb',
		padding: 10,
		backgroundColor: '#eee'
	},
	container: {
		flex: 1,
		backgroundColor: 'gray'
	},
	createSchedule:{
		height:pxToDp(200),
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff'
	},
	clear:{
		position:'absolute',
		width:pxToDp(60),
		height:pxToDp(60),
		borderRadius:pxToDp(30),
		backgroundColor:"#1E90FF",
		bottom: pxToDp(20),
		// left: 0,
		right:pxToDp(20),
		justifyContent:'center',
		alignItems:'center',
	},
	scheduleItem:{
		height:pxToDp(100),
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff',
		marginBottom:pxToDp(20),
		paddingLeft:pxToDp(20),
		paddingRight:pxToDp(20)
	},
	edit: {
		flex:1,
		// height: pxToDp(140),
		fontSize: 16,
		backgroundColor: '#fff',
		padding:pxToDp(10),
		// marginBottom:pxToDp(200)
		
	},
	btnWrap:{
		// flex: 1,
		flexDirection:'row',
		// marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),
		justifyContent: 'space-between',
		alignItems:'center',
		paddingLeft:pxToDp(10),
		paddingRight:pxToDp(10),
		marginTop: pxToDp(1),
	},
	button: {
		height: pxToDp(80),
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderRadius: 8,
		marginBottom: pxToDp(10),
		marginTop: pxToDp(100),
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
})


export default wrapComponent(Schedule, [OAStore.scheduleList]);