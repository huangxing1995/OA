import React, {Component} from 'react'
import {
	Image,
	View,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	Button,
	ScrollView,
	TextInput,
	StyleSheet,
	Dimensions,
	Picker, Alert
} from 'react-native'
import {wrapComponent} from 'react-eflow'
import OAStore from '../../store'
import pxToDp from "../../util/pxToDp";
import {formatDate} from '../../util/formatTime'
import convertPinyin from "../../util/convertPinyin";
import DateTimePicker from 'react-native-modal-datetime-picker';

const WIDTH = Dimensions.get('window').width;

//{employeeUm,type,destination,reason,startTime,endTime,approverUm:[[{um,opt,remark}]]}
class Approve extends Component{
	constructor(props){
		super(props);
		
		let approveInfo = {
			employeeUm:'',
			type:'',
			destination:'',
			reason:'',
			startTime:0,
			endTime:0,
			approverUm:[]
		};
		this.state = {
			isDateTimePickerVisible: false,
			datePickerType:'',
			approveInfo
		}
	}
	componentDidMount(){
		OAStore.userList();
		let {um} = this.props.userInfo;
		let approveInfo = this.state.approveInfo;
		approveInfo.employeeUm = um;
		this.setState({approveInfo});
		OAStore.findMyApproveList();
	}
	_showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	}
	_hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
	}
	_handleDatePicked = (date) => {
		let {datePickerType,approveInfo} = this.state;
		if (datePickerType === 'startTime'){
			approveInfo.startTime =  Date.parse(date);
		} else if (datePickerType === 'endTime'){
			if (Date.parse(date) < approveInfo.startTime){
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
			approveInfo.endTime =  Date.parse(date);
		}
		this.setState({approveInfo});
		this._hideDateTimePicker();
	};
	handleSelectStartTime(){
		this.setState({datePickerType:'startTime'})
		this._showDateTimePicker();
	}
	handleSelectEndTime(){
		this.setState({datePickerType:'endTime'})
		this._showDateTimePicker();
	}
	
	handleSelectType(){
		let options = ['事假','年假','病假','调休','产假','陪产假','婚假','例假','丧假'];
		this.props.navigate('SelectPage',{mode:'simple',options,callback: (option)=>{
				let approveInfo = this.state.approveInfo;
				approveInfo.type = option;
				this.setState({approveInfo})
			}});
	}
	
	handleChangeText(key,text){
		let approveInfo = this.state.approveInfo;
		approveInfo[key] = text;
		this.setState({approveInfo})
	}
	
	um2Name(um){
		let name;
		this.props.userList.forEach((user,i)=>{
			if(user.um === um) name = user.name;
		})
		return name;
	}
	
	handleSelectApprover(stage){
		let options = this.props.userList;
		let {approveInfo} = this.state;
		if(stage === approveInfo.approverUm.length){ // 添加stage
			approveInfo.approverUm.push([]);
		}
		this.props.navigate('SelectPage',{mode:'user',options,callback:(user)=>{
				let allUms = [];
				approveInfo.approverUm.forEach(item=>allUms.push(...item));
				let isExist = allUms.some(u=>u.um===user.um);
				if(isExist){
					Alert.alert(
						'',
						'已经在审批列表中了',
						[
							{text: '确定', onPress: () => console.log('OK Pressed')},
						],
						{cancelable: false}
					);
					approveInfo.approverUm.pop();
					this.setState({approveInfo},()=>{
						// console.log(this.state.approveInfo.approverUm)
					});
				} else {
					approveInfo.approverUm[stage].push({
						um: user.um,
						opt:'',
						remark:''
					});
					this.setState({approveInfo},()=>{
						// console.log(this.state.approveInfo.approverUm)
					});
				}
			}})
	}
	
	hangOutItem(){
		let {findMyApproveList} = this.props;
		let hangOutItem = null;
		let approveInfo = this.state.approveInfo;
		findMyApproveList.some((item,i)=>{
			if (item.approveStatus !== 'N'){
				if (!(approveInfo.endTime < item.startTime || approveInfo.startTime > item.endTime)){ // 有一个与当前冲突
					hangOutItem = item;
					return true;
				}
			}
		});
		
		return hangOutItem;
	}
	handleSave(){
		let {approveInfo} = this.state;
		if (approveInfo.reason === '' || approveInfo.approverUm.length === 0){
			Alert.alert(
				'',
				'请假信息不全',
				[
					{text: '确定', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false}
			);
		
		} else {
			if (!!this.hangOutItem()){
				Alert.alert(
					'',
					'时间冲突',
					[
						{text: '确定', onPress: () => console.log('OK Pressed')},
					],
					{cancelable: false}
				);
			} else {
				OAStore.createApprove(this.state.approveInfo);
				//
				// let {startTime,endTime} = this.state.approveInfo;
				// // console.log(startTime ,endTime)
				// while (startTime <= endTime){
				// 	OAStore.updateSignIn({
				// 		date:startTime,
				// 		startTime:0,
				// 		startAddress:'',
				// 		endTime:0,
				// 		endAddress:'',
				// 		isInRest: true
				// 	})
				// 	startTime += 24*60*60*1000;
				// }
				this.props.goBack()
			}
		}
	}
	renderApprover = ()=>{
		let list = this.state.approveInfo.approverUm.map((stageUm, stage)=>{
			let row = stageUm.map((person, i)=>{
				return (
					<View key={Math.random()}>
						{/*横向展示*/}
						<TouchableOpacity onPress={()=>{ // 点击名字删除
							let {approveInfo} = this.state;
							approveInfo.approverUm[stage].splice(i,1);
							this.setState({approveInfo})
						}}>
							<Text>{this.um2Name(person.um)},</Text>
						</TouchableOpacity>
					</View>
				)
			});
			return (
				<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:pxToDp(20)}} key={Math.random()}>
					<ScrollView horizontal={true}>
						{row}
					</ScrollView>
					<TouchableOpacity onPress={()=>this.handleSelectApprover(stage)} key={Math.random()}>
						<Image source={require('../../resource/addApprover.png')} style={{width:pxToDp(60),height:pxToDp(60)}}/>
					</TouchableOpacity>
				</View>
			);
		});
		// 纵向添加
		list.push((
			<TouchableOpacity
				onPress={()=>{
					let {approveInfo} = this.state;
					approveInfo.approverUm.push([]);
					this.setState((approveInfo),()=>{
						this.handleSelectApprover(this.state.approveInfo.approverUm.length-1)
					})
				}}
				key={Math.random()}
				style={[styles.button,{backgroundColor:'#ddd',	marginTop: pxToDp(10)}]}
			>
				<Text style={[styles.buttonText,{fontSize:30}]}>+</Text>
			</TouchableOpacity>
		));
		return list;
	};
	render(){
		return(
			<ScrollView style={{flex:1,paddingTop:pxToDp(40)}}>
				{/*// 开始时间*/}
				<View style={styles.btnWrap}>
					<Text>开始时间</Text>
					<TouchableOpacity onPress={()=>this.handleSelectStartTime()} style={{flexDirection:'row',	justifyContent: 'space-between',alignItems:'center'}}>
						<Text>{this.state.approveInfo.startTime?formatDate(this.state.approveInfo.startTime):''}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				{/*// 结束时间*/}
				<View style={styles.btnWrap}>
					<Text>结束时间</Text>
					<TouchableOpacity onPress={()=>this.handleSelectEndTime()} style={{flexDirection:'row',	justifyContent: 'space-between',alignItems:'center'}}>
						<Text>{this.state.approveInfo.endTime?formatDate(this.state.approveInfo.endTime):''}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				{/*请假事由*/}
				<View>
					<Text style={[styles.tip,{marginTop:pxToDp(20)}]}>原因</Text>
					<TextInput
						value={this.state.approveInfo.reason}
						placeholder={'输入您的请假理由'}
						onChangeText={(text)=>this.handleChangeText('reason',text)}
						underlineColorAndroid="transparent"
						multiline={true}
						style={[styles.edit,{fontSize: 16,}]}/>
				</View>
				{/*选择审批人*/}
				<View>
					<Text style={[styles.tip,{marginTop:pxToDp(20)}]}>选择审批人</Text>
					<View >
						{this.renderApprover()}
					</View>
				</View>
				
				{/*保存*/}
				<TouchableHighlight style={styles.button} onPress={()=>this.handleSave()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>保存</Text>
				</TouchableHighlight>
				
				
				<DateTimePicker
					mode={'date'}
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
					
					titleIOS={'请选择'}
					cancelTextIOS={'取消'}
					confirmTextIOS={'确定'}
				/>
				{/*占位*/}
				<View style={{height:pxToDp(100)}}/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	edit: {
		height: pxToDp(255),
		backgroundColor: '#fff',
		padding:pxToDp(10),
		marginTop:pxToDp(10),
		flexDirection:'row',
		// justifyContent:'center',
		alignItems:'center'
	},
	editWrapper: {
		flex: 1,
		marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),    //通过大于TextInput的高度来弥补上面的问题
		justifyContent: 'center'  //放置到底部
	},
	tip:{
		fontSize:12,
		color:"#333",
		paddingLeft:pxToDp(10),
		marginTop:pxToDp(10)
	},
	btnWrap:{
		flex: 1,
		flexDirection:'row',
		// marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),    //通过大于TextInput的高度来弥补上面的问题
		justifyContent: 'space-between',  //放置到底部
		alignItems:'center',
		paddingLeft:pxToDp(10),
		paddingRight:pxToDp(10),
		marginTop: pxToDp(1),
	},
	afl:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: pxToDp(80),
		backgroundColor: '#48BBEC',
		borderRadius: 8,
		marginBottom: pxToDp(10),
		marginTop: pxToDp(100),
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
	
});


export default wrapComponent(
	Approve,
	[
		OAStore.userInfo,
		OAStore.userList,
		OAStore.findMyApproveList,
	]);

