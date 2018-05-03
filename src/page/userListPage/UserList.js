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
	Dimensions, Alert
} from 'react-native'
import {wrapComponent} from 'react-eflow'
import OAStore from '../../store'
import pxToDp from "../../util/pxToDp";
import convertPinyin from "../../util/convertPinyin";
import {findDepartmentBy} from '../../request/departmentRequest'


const WIDTH = Dimensions.get('window').width;

class UserList extends Component{
	static defaultProps={
		isRootMode: true,
		callback:()=>{}
	}
	constructor(props){
		super();
		this.state = {
			isVisible: false,
			searchKey:'',
		}
	}
	componentDidMount(){
		OAStore.userList();
	}
	handleChangeText(text){
		this.setState({searchKey: text})
	}
	handleSearch(){
		let {searchKey} = this.state;
		console.log(searchKey)
		if(/^[\u4e00-\u9fa5]+$/i.test(searchKey)){ // 是汉字
			searchKey = convertPinyin(searchKey)
		}
		console.log(searchKey)
		OAStore.filterUserList(searchKey);
	}
	renderUserList(){
		let {navigate} = this.props;
		let userList = this.props.userList.map((user,i)=>{
			return(
				<View key={i} style={styles.item}>
					<TouchableOpacity onPress={()=>navigate('UserInfoPage',user)} style={{flex:1,flexDirection:'row'}}>
						<Text style={{fontSize:16,fontWeight:'bold'}}>{user.name}</Text>
						<Text>({user.um})</Text>
						<Text>{`  ${user.departmentId}/${user.positionId}`}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{
						findDepartmentBy({key:'managerUm', value: user.um})
							.then(res=>{
								if (res.length){
									Alert.alert(
										'',
										'他是部门长，请先修改部门长',
										[
											{text: '确定', onPress: () => console.log('OK Pressed')},
										],
										{cancelable: false}
									);
								} else {
									// console.log(res)
									OAStore.deleteUser({_id:user._id})
								}
							})
							.catch(err=>console.error(err))
					
					}}>
						<Image source={require('../../resource/del.png')} style={{width:pxToDp(30),height:pxToDp(30)}}/>
					</TouchableOpacity>
				</View>
			)
		});
		return userList;
	}
	render(){
		return(
			<View style={{flex:1}}>
				{/*搜索框*/}
				<View style={styles.box}>
					<TextInput
						value={this.state.searchKey}
						placeholder={'搜索'}
						onChangeText={(text)=>this.handleChangeText(text)}
						underlineColorAndroid="transparent"
						style={styles.edit}
					/>
					<TouchableOpacity onPress={()=>this.handleSearch()}>
						<Image source={require('../../resource/search.png')} style={{width:pxToDp(40),height:pxToDp(40)}}/>
					</TouchableOpacity>
				</View>
				
				{/*列表*/}
				<ScrollView style={{flex:1}}>
					{this.renderUserList()}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	top:{
		// height:pxToDp(80),
		// justifyContent:'center',
		// alignItems:'center',
		// marginBottom:pxToDp(20)
	},
	box:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'#ddd',
		width:WIDTH,
		// height:pxToDp(60),
		borderRadius:pxToDp(10),
		paddingLeft:pxToDp(20),
		paddingRight:pxToDp(20),
	},
	edit:{
		flex:1,
		// height: pxToDp(40),
		fontSize: 18,
		// backgroundColor: '#ff0000',
		paddingLeft:pxToDp(10)
	},
	item:{
		flex: 1,
		flexDirection:'row',
		// marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),
		justifyContent: 'space-between',
		alignItems:'center',
		paddingLeft:pxToDp(30),
		paddingRight:pxToDp(30),
		marginTop: pxToDp(1),
	},
});


export default wrapComponent(UserList, [OAStore.userList]);

