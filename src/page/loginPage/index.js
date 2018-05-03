import React, {Component} from 'react'
import {Image, View, TouchableOpacity, Text, TextInput, Button, StyleSheet, AsyncStorage, Alert} from 'react-native'
import {login} from "../../request/login";
import navigationUtil from '../../util/navigationUtil';
import {pxToDp} from "../../util";
import OAStore from "../../store";

export default class extends Component{
	constructor(props){
		super(props);
		this.state = {
			um:'',
			password:'',
		}
	}
	handleLogin(){
		login(this.state)
			.then((res)=>{ // {success,message,token}
				if(res.success){
					AsyncStorage.setItem('token',res.token).then(()=>{
						global.token = res.token;
						// OAStore.init();
						navigationUtil.reset(this.props.navigation, 'TabPage');
					})
				} else {
					Alert.alert(
						'',
						'密码错误',
						[
							{text: '确定', onPress: () => console.log('OK Pressed')},
						],
						{cancelable: false}
					);
				}
			})
			.catch(err=>{
				Alert.alert(
					'',
					'登录失败',
					[
						{text: '确定', onPress: () => console.log('OK Pressed')},
					],
					{cancelable: false}
				);
			})
	}
	
	render(){
		
		return (
			<View style={{backgroundColor:'#f4f4f4',flex:1,justifyContent:'center'}}>
				<Image
					style={styles.style_image}
					source={require('../../resource/oa.png')}/>
				<TextInput
					value={this.state.um}
					onChangeText={(um)=>this.setState({um})}
					style={styles.style_user_input}
					placeholder='um账号'
					numberOfLines={1}
					autoFocus={true}
					underlineColorAndroid={'transparent'}
					textAlign='center'
				/>
				<View
					style={{height:1,backgroundColor:'#f4f4f4'}}
				/>
				<TextInput
					value={this.state.password}
					onChangeText={(password)=>this.setState({password})}
					style={styles.style_pwd_input}
					placeholder='密码'
					numberOfLines={1}
					underlineColorAndroid={'transparent'}
					secureTextEntry={true}
					textAlign='center'
				/>
				<TouchableOpacity style={styles.style_view_commit} onPress={()=>{this.handleLogin()}}>
					<Text style={{color:'#fff'}}>登录</Text>
				</TouchableOpacity>
			</View>
		)
	}
}



const styles = StyleSheet.create({
	style_image:{
		borderRadius:pxToDp(85),
		height:pxToDp(170),
		width:pxToDp(170),
		marginTop:pxToDp(-440),
		alignSelf:'center',
	},
	style_user_input:{
		backgroundColor:'#fff',
		marginTop:pxToDp(20),
		height:pxToDp(100),
	},
	style_pwd_input:{
		backgroundColor:'#fff',
		height:pxToDp(100),
	},
	style_view_commit:{
		marginTop:pxToDp(15),
		marginLeft:pxToDp(10),
		marginRight:pxToDp(10),
		backgroundColor:'#63B8FF',
		height:pxToDp(70),
		borderRadius:pxToDp(5),
		justifyContent: 'center',
		alignItems: 'center',
	},
	style_view_unlogin:{
		fontSize:12,
		color:'#63B8FF',
		marginLeft:pxToDp(10),
	},
	style_view_register:{
		fontSize:12,
		color:'#63B8FF',
		marginRight:pxToDp(10),
		alignItems:'flex-end',
		flex:1,
		flexDirection:'row',
		textAlign:'right',
	}
});