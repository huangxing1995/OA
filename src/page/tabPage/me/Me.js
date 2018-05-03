import React, {Component} from 'react'
import {
	Image, View, TouchableOpacity, Text, ScrollView, StyleSheet, Dimensions, Modal, AsyncStorage,
	Alert
} from 'react-native'
import pxToDp from "../../../util/pxToDp";
import OAStore from "../../../store";
import {formatDate, formatDateAndTime, formatTime} from "../../../util/formatTime";
import {wrapComponent} from "react-eflow/lib/eflow";
import {findUserBy} from '../../../request/userRequest'
const WIDTH = Dimensions.get('window').width;

class Me extends Component{
	constructor(props){
		super(props)
		this.state = {
		
		}
	}
	componentDidMount(){
		OAStore.userCompletedInfo();
	}
	handleLogout(){
		AsyncStorage.removeItem('token') // clear token
			.then(()=>{
				this.props.logout();
				
			})
			.catch(err=>{
				console.log(err);
				Alert.alert(
					'',
					'错误，请重试',
					[
						{text: '确定', onPress: () => console.log('OK Pressed')},
					],
					{cancelable: false}
				);
			})
	}
	render(){
		let {navigate,userCompletedInfo} = this.props;
		return(
			<ScrollView style={styles.wrapper}>
				<View style={styles.user}>
					<View style={styles.userTitle}>
						<Text style={styles.userTitleText}>{userCompletedInfo.name}</Text>
					</View>
					
					<View style={styles.userContent}>
						<View style={styles.userItem}>
							<Text style={styles.key}>um:</Text>
							<Text style={styles.value}>{userCompletedInfo.um}</Text>
						</View>
						<View style={styles.userItem}>
							<Text style={styles.key}>部门:</Text>
							<Text style={styles.value}>{userCompletedInfo.departmentId}</Text>
						</View>
						<View style={styles.userItem}>
							<Text style={styles.key}>职位:</Text>
							<Text style={styles.value}>{userCompletedInfo.positionId}</Text>
						</View>
						<View style={styles.userItem}>
							<Text style={styles.key}>入职日期:</Text>
							<Text style={styles.value}>{userCompletedInfo.entryDate}</Text>
						</View>
						<View style={styles.userItem}>
							<Text style={styles.key}>邮箱:</Text>
							<Text style={styles.value}>{userCompletedInfo.email}</Text>
						</View>
						<View style={styles.userItem}>
							<Text style={styles.key}>电话:</Text>
							<Text style={styles.value}>{userCompletedInfo.telephone}</Text>
						</View>
						<View style={styles.userItem}>
							<Text style={styles.key}>地址:</Text>
							<Text style={styles.value}>{userCompletedInfo.address}</Text>
						</View>
						<View style={styles.userItem}>
							<Text style={styles.key}>性别:</Text>
							<Text style={styles.value}>{userCompletedInfo.sex}</Text>
						</View>
						<View style={styles.userItem}>
							<Text style={styles.key}>婚姻状态:</Text>
							<Text style={styles.value}>{userCompletedInfo.maritalStatus}</Text>
						</View>
						<TouchableOpacity onPress={()=>this.props.navigate('UserInfoPage',userCompletedInfo)} style={[styles.button,{	borderTopColor:'#ccc', borderTopWidth:pxToDp(1)}]}>
							<Text style={styles.buttonText}>修改</Text>
						</TouchableOpacity>
					</View>
				</View>
				
				{/*onPress={()=>navigate('UserInfoPage',userCompletedInfo)}*/}
			
				<TouchableOpacity onPress={()=>this.handleLogout()} style={[styles.button,{borderColor:'#ccc', borderWidth:pxToDp(1)}]}>
					<Text style={styles.buttonText}>注销登录</Text>
				</TouchableOpacity>
				{/*占位*/}
				<View style={{height:pxToDp(100)}}/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	wrapper:{
		flex: 1,
		backgroundColor:'#fff',
		paddingBottom: pxToDp(50),
	},
	bgImg:{
		width: WIDTH * 0.95,
		height: pxToDp(350),
		borderRadius:pxToDp(10),
		overflow: 'hidden'
	},
	user:{
		// height: pxToDp(300),
		marginHorizontal: pxToDp(20),
		marginBottom: pxToDp(50),
		marginTop: pxToDp(50),
		backgroundColor: '#f0f0f0',
		// backgroundColor:'#FFEC8B',
		borderRadius:pxToDp(30),
		overflow:'hidden'
		// justifyContent:'center',
		// alignItems:'center',
	},
	userTitle: {
		height: pxToDp(80),
		paddingLeft: pxToDp(48),
		justifyContent:'center',
		borderBottomColor:'#ccc',
		borderBottomWidth:pxToDp(1)
	},
	userTitleText: {
		fontSize: pxToDp(52),
		color: '#8A8A8F'
	},
	userContent: {
		flex:1,
		// marginLeft: pxToDp(48),
		marginVertical: pxToDp(20)
	},
	userItem:{
		flex:1,
		flexDirection:'row',
		marginTop:pxToDp(10),
		// borderColor:'#ccc',
		// borderWidth:1,
		alignItems:'flex-start',
		marginVertical: pxToDp(30)
		
	},
	key:{
		width:pxToDp(150),
		color:'#333',
		fontSize:16,
		fontWeight:'bold',
		marginLeft:pxToDp(30),
	},
	value:{
		flex:1,
		fontSize:14,
		color:'#555555',
		marginLeft:pxToDp(80),
	},
	buttonText: {
		fontSize: 18,
		color: '#333',
		alignSelf: 'center'
	},
	button: {
		height: pxToDp(80),
		// backgroundColor: '#48BBEC',
		// borderColor: '#48BBEC',
		// borderWidth: 1,
		borderRadius: 8,
		// marginBottom: pxToDp(10),
		marginTop: pxToDp(20),
		alignItems: 'center',
		justifyContent: 'center'
	}
})



export default wrapComponent(Me, [OAStore.userCompletedInfo])