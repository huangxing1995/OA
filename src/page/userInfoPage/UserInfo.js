import React,{Component} from 'react';
import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image, Alert
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import OAStore from '../../store'
import {wrapComponent} from 'react-eflow'
import pxToDp from "../../util/pxToDp";
import convertPinyin from '../../util/convertPinyin'
import {formatDate} from '../../util/'
import {findDepartmentBy} from "../../request/departmentRequest";
class UserInfo extends Component{
	static defauleProps = {
	
	};
	constructor(props){
		super(props);
		let userInfo = props.userInfo;
		let isInCreateMode = false;
		if (JSON.stringify(userInfo) === '{}'){
			userInfo = {
				"um": "",
				"telephone": "",
				"name": "",
				"password": "123456",
				"sex": '',
				"birthday": null,
				"address": "",
				"photoUrl": "no",
				"positionId": '',
				"departmentId": '',
				"email": "",
				"entryDate": Date.now(),
				"maritalStatus": '',
			}
			isInCreateMode = true;
		}
		this.state = {
			userInfo,
			isInCreateMode,
			isDateTimePickerVisible: false,
		}
	}
	componentDidMount(){
		OAStore.userCompletedInfo();
		OAStore.positionList();
		OAStore.departmentList();
	}
	uuid(len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [], i;
		radix = radix || chars.length;
		
		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		} else {
			// rfc4122, version 4 form
			var r;
			
			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
			
			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random()*16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	}
	generateUm(){
		let name = this.state.userInfo.name;
		if(/^[\u4e00-\u9fa5]+$/i.test(name)){ // 是汉字
			name = convertPinyin(name)
		}
		let um = name + this.uuid(3, 10);
		this.handleChangeText('um',um)
	}
	handleChangeText(key, text){
		let userInfo = this.state.userInfo;
		userInfo[key] = text;
		this.setState({userInfo})
	}
	handleSelectDepartment(){
		let options = this.props.departmentList;
		this.props.navigate('SelectPage',{mode:'department',options,callback:(dpt)=>{
			let {userInfo} = this.state;
			findDepartmentBy({key:'managerUm', value: userInfo.um})
				.then(res=>{
					if (res.length){
						Alert.alert(
							'',
							'他是部门长，请先修改部门信息',
							[
								{text: '确定', onPress: () => console.log('OK Pressed')},
							],
							{cancelable: false}
						);
					} else {
						// console.log(res)
						userInfo.departmentId = dpt.name;
						this.setState({userInfo});
					}
				})
				.catch(err=>console.error(err))
		
		}})
	}
	handleSelectPosition(){
		let options = this.props.positionList;
		this.props.navigate('SelectPage',{mode:'position',options,callback:(pos)=>{
				let {userInfo} = this.state;
				userInfo.positionId = pos.name;
				this.setState({userInfo});
			}})
	}
	handleSelectSex(){
		let options = ['男','女'];
		this.props.navigate('SelectPage',{mode:'simple',options,callback:(sex)=>{
				let {userInfo} = this.state;
				userInfo.sex = sex;
				this.setState({userInfo});
			}})
	}
	handleSelectMaritalStatus(){
		let options = ['已婚','未婚'];
		this.props.navigate('SelectPage',{mode:'simple',options,callback:(status)=>{
				let {userInfo} = this.state;
				userInfo.maritalStatus = status;
				this.setState({userInfo});
			}})
	}
	handleSave(){
		if (this.state.isInCreateMode){
			OAStore.addUser(this.state.userInfo);
		} else {
			OAStore.updateUser({_id:this.props.userInfo._id,newInfo:this.state.userInfo});
		}
		this.props.goBack();
	}
	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
	
	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
	
	_handleDatePicked = (date) => {
		this.handleChangeText('birthday', Date.parse(date));
		this._hideDateTimePicker();
	};
	render(){
		
		return (
			<ScrollView style={{flex:1, backgroundColor:"#f0f0f0"}}>
				{/*<View style={styles.photo}>*/}
					{/*<TouchableOpacity>*/}
						{/*<Image*/}
							{/*style={{width:pxToDp(120),height:pxToDp(120),borderRadius:pxToDp(60),borderWidth:pxToDp(1), borderColor:'#ccc',}}*/}
							{/*source={require('../../resource/photo.png')}/>*/}
					{/*</TouchableOpacity>*/}
				{/*</View>*/}
				
				<Text style={styles.tip}>姓名</Text>
				<View style={styles.editWrapper}>
					<TextInput
						value={this.state.userInfo.name}
						placeholder={'填写姓名'}
						editable={this.state.isInCreateMode}
						onChangeText={(text)=>this.handleChangeText('name',text)}
						onEndEditing={()=>this.generateUm()}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				<Text style={styles.tip}>um账号</Text>
				<View style={styles.editWrapper}>
					<TextInput
						value={this.state.userInfo.um}
						placeholder={'自动生成唯一的um账号'}
						editable={false}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				<Text style={styles.tip}>密码</Text>
				<View style={styles.editWrapper}>
					<TextInput
						value={this.state.userInfo.password}
						placeholder={'填写密码'}
						onChangeText={(text)=>this.handleChangeText('password',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				<Text style={styles.tip}>eamil</Text>
				<View style={styles.editWrapper}>
					<TextInput
						value={this.state.userInfo.email}
						placeholder={'邮箱：yourname@company.com'}
						onChangeText={(text)=>this.handleChangeText('email',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				<Text style={styles.tip}>电话</Text>
				<View style={styles.editWrapper}>
				<TextInput
						value={this.state.userInfo.telephone}
						placeholder={'电话：188-8888-8888'}
						onChangeText={(text)=>this.handleChangeText('telephone',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				<Text style={styles.tip}>地址</Text>
				<View style={[styles.editWrapper,{marginBottom:pxToDp(50)}]}>
					<TextInput
						value={this.state.userInfo.address}
						placeholder={'地址：湖北省武汉市和平大道1178号'}
						onChangeText={(text)=>this.handleChangeText('address',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				{/*入职日期*/}
				<View style={styles.btnWrap}>
					<Text>入职日期</Text>
					<View style={{flexDirection:'row'}}>
						<Text>{formatDate(this.state.userInfo.entryDate)}</Text>
						{/*<Image*/}
							{/*style={{width: pxToDp(40),height: pxToDp(40)}}*/}
							{/*source={require('../../resource/arrow.png')}/>*/}
					</View>
				</View>
				
				{/*部门*/}
				<View style={styles.btnWrap}>
					<Text>部门</Text>
					<TouchableOpacity onPress={()=>{
						console.log(this.props.userCompletedInfo)
						if(this.props.userCompletedInfo.um === 'huangxing693')
						{
							this.handleSelectDepartment()
						}
					}} style={{flexDirection:'row'}}>
						<Text>{(this.state.userInfo.departmentId)}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				
				{/*职位*/}
				<View style={styles.btnWrap}>
					<Text>职位</Text>
					<TouchableOpacity onPress={()=>{
						if(this.props.userCompletedInfo.um === 'huangxing693')
						{
							this.handleSelectPosition()
						}
					}} style={{flexDirection:'row'}}>
						<Text>{(this.state.userInfo.positionId)}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				
				
				<View style={styles.btnWrap}>
					<Text>生日</Text>
					<TouchableOpacity onPress={this._showDateTimePicker} style={{flexDirection:'row'}}>
						<Text>{this.state.userInfo.birthday?formatDate(this.state.userInfo.birthday):''}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				{/*性别*/}
				<View style={styles.btnWrap}>
					<Text>性别</Text>
					<TouchableOpacity onPress={()=>this.handleSelectSex()} style={{flexDirection:'row'}}>
						<Text>{(this.state.userInfo.sex)}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				{/*婚姻状态*/}
				<View style={styles.btnWrap}>
					<Text>婚姻状态</Text>
					<TouchableOpacity onPress={()=>this.handleSelectMaritalStatus()} style={{flexDirection:'row'}}>
						<Text>{(this.state.userInfo.maritalStatus)}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				
				
				<TouchableOpacity style={styles.button} onPress={()=>this.handleSave()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>保存</Text>
				</TouchableOpacity>
				{/*占位*/}
				<View style={{height:pxToDp(100)}}/>
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
					titleIOS={'请选择'}
					cancelTextIOS={'取消'}
					confirmTextIOS={'确定'}
				/>
				
		</ScrollView>)
	}
}

const styles = StyleSheet.create({
	photo:{
		height:pxToDp(250),
		justifyContent:'center',
		alignItems:'center',
	},
	edit: {
		height: pxToDp(55),
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
	btnWrap:{
		flex: 1,
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
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: pxToDp(80),
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: pxToDp(10),
		marginTop: pxToDp(100),
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
})

export default wrapComponent(UserInfo,[OAStore.departmentList,OAStore.positionList,OAStore.userCompletedInfo])
// export default UserInfo