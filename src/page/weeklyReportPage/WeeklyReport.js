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
	Dimensions
} from 'react-native'
import { Calendar,Agenda } from 'react-native-calendars';

import pxToDp from "../../util/pxToDp";
import {formatDate, formatDateAndTime, formatTime} from "../../util/formatTime";
import {wrapComponent} from "react-eflow/lib/eflow";
import OAStore from "../../store";
import {getWeekDays} from '../../util/getWeekDays'

const WIDTH = Dimensions.get('window').width;
class WeeklyReport extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			modalVisible:false,
			
			isInUpdateMode:false,
			updateId:'',
			
			selectedDay:(new Date()).setHours(0,0,0,0),
			
			reportInfo:{
				summary:'',
				goal:'',
			}
		};
	}
	componentWillMount(){
		console.log('******************** weekly report page *******************')

		OAStore.userCompletedInfo();
		OAStore.weeklyReportList();
	}
	
	
	handleCloseModal(){
		this.setState({modalVisible:false});
	}
	
	handleOpenModal(){
		this.setState({modalVisible:true})
	}

	getItem(date){
		let r = null;
		this.props.weeklyReportList.forEach((report, i)=>{ //{date:[],summary,goal}
			// console.log(report)
			if(report.date.indexOf(date) !== -1){ // 在一周de某天
				r = report;
			}
		});
		return r;
	}
	
	loadItems = ()=> {
		let newItems = {};
		let today = (new Date()).setHours(0,0,0,0); // 1523894400000
		for (let i = -55; i < 7; i++) {
			let date = today + i * 24 * 60 * 60 * 1000;
			const strTime = formatDate(date);
			newItems[strTime] = this.getItem(date); // getItems is a {}
		}
	
		return newItems;
	};

	onDayPress = (day)=> {
		
		this.setState({
			selectedDay: (new Date(day.timestamp)).setHours(0,0,0,0)
		});
	};
	createReport(report){
		this.setState({reportInfo:report},()=>{
			this.handleOpenModal();
		})
	}
	updateReport(report){
		this.setState({reportInfo:report,isInUpdateMode:true,updateId:report._id},()=>{
			this.handleOpenModal();
		})
	}
	handleChangeText(key, text){
		let reportInfo = this.state.reportInfo;
		reportInfo[key] = text;
		this.setState({reportInfo})
	}
	handleSave(){ // todo
		let {selectedDay, reportInfo, updateId} = this.state;
		if (this.state.isInUpdateMode){
			let newInfo = {date:getWeekDays(selectedDay),...reportInfo};
			OAStore.updateWeeklyReporte({_id:updateId,newInfo})
			this.setState({isInUpdateMode:false, updateId:''})
		} else {
			OAStore.addWeeklyReport({date:getWeekDays(selectedDay),...this.state.reportInfo});
		}
		this.handleCloseModal();
	}

	renderModal(){
		return (
			<ScrollView style={{flex:1,paddingTop:pxToDp(200),backgroundColor:'#f3f3f3'}}>
				{/*本周总结*/}
				<Text style={styles.tip}>本周总结</Text>
				<View style={styles.editWrapper}>
					<TextInput
						value={this.state.reportInfo.summary}
						placeholder={'填写您本周完成工作情况'}
						onChangeText={(text)=>this.handleChangeText('summary',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				{/*下周目标*/}
				<Text style={styles.tip}>下周目标</Text>
				<View style={styles.editWrapper}>
					<TextInput
						value={this.state.reportInfo.goal}
						placeholder={'填写您下周工作目标'}
						onChangeText={(text)=>this.handleChangeText('goal',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				{/*保存*/}
				<TouchableOpacity style={styles.button} onPress={()=>this.handleSave()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>保存</Text>
				</TouchableOpacity>
				
				{/*取消*/}
				<TouchableOpacity
					style={[styles.button,{backgroundColor:'#dedede',marginTop: pxToDp(20),}]}
					onPress={()=>this.handleCloseModal()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>取消</Text>
				</TouchableOpacity>
				
			</ScrollView>
		)
	}
	render(){
		let report = this.loadItems()[formatDate(this.state.selectedDay)]; // {}||null
		let reportView = null;
		if(report){
			reportView = (
				<TouchableOpacity
					onPress={()=>{
						this.updateReport({summary:report.summary,goal:report.goal,_id:report._id})
					}}
					style={styles.createSchedule}
				>
					<Image
						style={{width:pxToDp(200),height:pxToDp(200),marginLeft:pxToDp(50)}}
						source={require('../../resource/report.png')}/>
					<View style={styles.reportContent}>
						<View style={styles.reportItem}>
							<Text style={styles.key}>本周总结:</Text>
							<Text style={styles.value}>{report.summary}</Text>
						</View>
						<View style={styles.reportItem}>
							<Text style={styles.key}>下周目标:</Text>
							<Text style={styles.value}>{report.goal}</Text>
						</View>
					</View>
				</TouchableOpacity>)
		} else {
			reportView = (
				<TouchableOpacity
					onPress={()=>this.createReport({summary:'',goal:''})}
					style={styles.createSchedule}
				>
					<Image
						style={{width:pxToDp(200),height:pxToDp(200),marginLeft:pxToDp(50)}}
						source={require('../../resource/report.png')}/>
					<View style={{flex:1,justifyContent:'space-between',alignItems:'center'}}>
						<Text style={{fontSize:14}}>规划好工作，目标架构师</Text>
						<Text style={{fontSize:12,color:'#00BFFF',marginTop:pxToDp(20)}}>填写周报</Text>
					</View>
				</TouchableOpacity>)
		}
		return(
			<View style={{flex:1,}}>
				<Calendar
					onDayPress={this.onDayPress}
					style={styles.calendar}
					// hideExtraDays
					maxDate={getWeekDays(Date.now())[6]}
					markedDates={{[formatDate(this.state.selectedDay)]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
				/>
				<ScrollView style={{flex:1, marginTop:pxToDp(10)}}>
					{reportView}
					<Modal
					animationType={"slide"}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={()=>console.log('android request close')}
					>
						{this.renderModal()}
					</Modal>
				</ScrollView>
				<TouchableOpacity
					style={styles.clear}
					onPress={()=>{this.props.navigate('WeeklyReportListPage')}}>
					<Text style={{color:'#48BBEC'}}>查看部门所有人周报</Text>
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
		// height:pxToDp(300),
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff'
	},
	clear:{
		position:'absolute',
		width:WIDTH,
		height:pxToDp(90),
		bottom: pxToDp(0),
		justifyContent:'center',
		alignItems:'center',
		borderTopWidth:pxToDp(1),
		borderTopColor:'#ccc'
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
	edit: {
		height: pxToDp(60),
		fontSize: 16,
		backgroundColor: '#fff',
		padding:pxToDp(10)
	},
	editWrapper: {
		flex: 1,
		marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),
		justifyContent: 'center'
	},
	tip:{
		fontSize:12,
		color:"#333",
		paddingLeft:pxToDp(10),
		marginTop:pxToDp(10)
	},
	reportContent: {
		flex:1,
		marginVertical: pxToDp(20),
		marginRight: pxToDp(20),
	},
	reportItem:{
		flex:1,
		flexDirection:'row',
		marginTop:pxToDp(10),
		alignItems:'flex-start',
		marginVertical: pxToDp(10)
		
	},
	key:{
		width:pxToDp(150),
		color:'#333',
		fontSize:14,
		fontWeight:'bold',
		marginLeft:pxToDp(10),
	},
	value:{
		flex:1,
		fontSize:12,
		color:'#555555',
		marginLeft:pxToDp(10),
	}
})


export default wrapComponent(WeeklyReport, [OAStore.weeklyReportList]);