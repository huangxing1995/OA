import React, {Component} from 'react'
import {
	Image,
	View,
	TouchableOpacity,
	Text,
	ScrollView,
	StyleSheet,
	TextInput
} from 'react-native'
import {wrapComponent} from 'react-eflow'
import DateTimePicker from 'react-native-modal-datetime-picker';
import OAStore from '../../store'

import {pxToDp} from '../../util'
import {formatDateAndTime,formatDate} from "../../util/formatTime";


class DemandInfo extends Component {
	
	constructor(props){
		super(props);
		this.state={
			isDateTimePickerVisible: false,
			deadTime:0,
			progress:{
				percent:'',
				remark:''
			}
		}
	}
	componentWillMount() {
		OAStore.userInfo();
		OAStore.userList();
	}
	um2Name(um){
		let name;
		this.props.userList.forEach((user,i)=>{
			if(user.um === um) name = user.name;
		})
		return name;
	}
	_showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	}
	_hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
	};
	_handleDatePicked = (date) => {
		let deadTime =  Date.parse(date);
		this.setState({deadTime});
		this._hideDateTimePicker();
	};
	handleChangeText(key, text){
		let progress = this.state.progress;
		progress[key] = text;
		this.setState({progress})
	}
	updateDeadTime(){
		let {scheduleInfo} = this.props;
		let {
			_id,
			employeeUm,
			receiveUm,
			describe,
			deadTime,
			progress,
			status,    // [percent, remark]
		} = scheduleInfo;
		if(this.state.deadTime){
			let newInfo = {
				employeeUm,
				receiveUm,
				describe,
				deadTime:this.state.deadTime,
				progress,
				status,
			}
			OAStore.updateDemand({
				_id,
				newInfo
			})
			this.props.goBack();
		}
	}
	updateProgress(){
		let {scheduleInfo} = this.props;
		let {
			_id,
			employeeUm,
			receiveUm,
			describe,
			deadTime,
			progress,
			status,    // [percent, remark]
		} = scheduleInfo;
		progress.push({
			percent: parseInt(this.state.progress.percent),
			remark: this.state.progress.remark
		});
		if(this.state.progress.percent === '100') status = 'Y';
		let newInfo = {
			employeeUm,
			receiveUm,
			describe,
			deadTime,
			progress,
			status,
		}
		OAStore.updateDemand({
			_id,
			newInfo
		})
		this.props.goBack();
	}
	render() {
		// console.log(this.props.scheduleInfo);
		let {scheduleInfo} = this.props;
		let {
			_id,
			employeeUm,
			receiveUm,
			describe,
			deadTime,
			progress, // [percent, remark]
			status,
		} = scheduleInfo;
		let flow = progress.map((item, i)=>{
			return (
				<View style={styles.flow} key={i}>
					
					<View style={styles.icon}>
						<View style={[styles.line]}/>
						<View style={styles.percent}>
							<Text style={{color:"#fff"}}>{item.percent}%</Text>
						</View>
						<View style={[styles.line]}/>
					</View>
					
					<Text style={{marginLeft:pxToDp(50),fontWeight:'bold',fontSize:14}}>
						{item.remark}
					</Text>
				</View>
			)
		})
		return (
			<ScrollView style={{flex:1,backgroundColor:'#f0f0f0',paddingTop:pxToDp(40)}}>
				
				{/*需求发起人*/}
				<View style={styles.btnWrap}>
					<Text>需求发起人</Text>
					<Text>{this.um2Name(employeeUm)}</Text>
				</View>
				
				{/*需求接收人*/}
				<View style={styles.btnWrap}>
					<Text>需求接收人</Text>
					<Text>{this.um2Name(receiveUm)}</Text>
				</View>
				
				{/*结束时间*/}
				<TouchableOpacity style={styles.btnWrap} onPress={()=>{
					if(employeeUm === this.props.userInfo.um){
						this._showDateTimePicker()
					}
				}}>
					<Text>结束时间</Text>
					<Text>{formatDate(deadTime)}</Text>
				</TouchableOpacity>
				
				{/*详细描述*/}
				<View style={{marginBottom:pxToDp(30)}}>
					<Text style={[styles.tip,{marginTop:pxToDp(20)}]}>详细描述</Text>
					<View style={styles.detail}>
						<Text>{describe}</Text>
					</View>
				</View>
				
				{/*进度*/}
				{flow}
				
				{/*修改进度*/}
				{receiveUm === this.props.userInfo.um ? (
					<View style={{marginTop:pxToDp(10)}}>
						<Text style={[styles.tip,{marginTop:pxToDp(20)}]}>修改进度百分比</Text>
						<TextInput
							editable={status!=='Y'}
							placeholder={'填写当前该需求您的进度百分比'}
							value={this.state.progress.percent}
							onChangeText={(text)=>this.handleChangeText('percent',text)}
							underlineColorAndroid="transparent"
							// multiline={true}
							style={[styles.edit,]}/>
					</View>
				):null}
				{receiveUm === this.props.userInfo.um ? (
					<View style={{marginTop:pxToDp(10)}}>
						<Text style={[styles.tip,{marginTop:pxToDp(20)}]}>备注</Text>
						<TextInput
							editable={status!=='Y'}
							placeholder={'填写当前该需求您的工作情况'}
							value={this.state.progress.remark}
							onChangeText={(text)=>this.handleChangeText('remark',text)}
							underlineColorAndroid="transparent"
							// multiline={true}
							style={[styles.edit,]}/>
					</View>
				):null}
				
				
				{/*修改时间*/}
				{employeeUm === this.props.userInfo.um ? (
						<TouchableOpacity style={[styles.button,{marginTop: pxToDp(50),}]} onPress={()=>this.updateDeadTime()} underlayColor='#99d9f4'>
							<Text style={styles.buttonText}>修改截至时间</Text>
						</TouchableOpacity>
					) : null}
				
				
				{/*提交进度*/}
				{receiveUm === this.props.userInfo.um ? (
						<TouchableOpacity
							style={[styles.button,{marginTop: pxToDp(50),}]}
							onPress={()=>{
								if(status!=='Y'){
									this.updateProgress()
								}
							}}
							underlayColor='#99d9f4'
						>
							<Text style={styles.buttonText}>提交进度</Text>
						</TouchableOpacity>
					) : null}
				
				{/*占位*/}
				<View style={{height:pxToDp(100)}}/>
				<DateTimePicker
					mode={'date'}
					date={new Date(deadTime)}
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
					
					titleIOS={'请选择'}
					cancelTextIOS={'取消'}
					confirmTextIOS={'确定'}
				/>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	btnWrap:{
		flex: 1,
		flexDirection:'row',
		// marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),
		justifyContent: 'space-between',
		alignItems:'center',
		paddingLeft:pxToDp(30),
		paddingRight:pxToDp(30),
		marginTop: pxToDp(2),
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: pxToDp(80),
		backgroundColor: '#48BBEC',
		// borderColor: '#48BBEC',
		// borderWidth: 1,
		borderRadius: 8,
		marginBottom: pxToDp(10),
		// marginTop: pxToDp(100),
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	tip:{
		fontSize:12,
		color:"#666",
		paddingLeft:pxToDp(10),
		marginTop:pxToDp(10)
	},
	detail:{
		// width: pxToDp(600),
		backgroundColor:'#fff',
		padding:pxToDp(20),
		marginTop:pxToDp(10),
	},
	percent:{
		width:pxToDp(80),
		height:pxToDp(80),
		borderRadius:pxToDp(40),
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#48BBEC'
	},
	icon:{
		width:pxToDp(100),
		height:pxToDp(100),
		// flex:1,
		justifyContent:'center',
		alignItems:'center',
		// backgroundColor:'#ffa'
	},
	flow:{
		// height:pxToDp(90),
		backgroundColor:'#fff',
		paddingLeft:pxToDp(20),
		flexDirection:'row',
		alignItems:'center'
	},
	line:{
		width:pxToDp(2),
		height:pxToDp(20),
		backgroundColor:'#ccc'
	},
	edit: {
		height: pxToDp(80),
		backgroundColor: '#fff',
		paddingLeft:pxToDp(30),
		paddingRight:pxToDp(30),
		marginTop:pxToDp(10),
		// flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
});

export default wrapComponent(DemandInfo, [OAStore.userList,OAStore.userInfo])