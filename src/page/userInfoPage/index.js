import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import UserInfo from './UserInfo'

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '人员详情',
	})
	
	
	render(){
		let {navigate,goBack,state} = this.props.navigation;
		let userInfo = state.params;
		return(
			<UserInfo
				navigate={(page, param) => navigate(page, param)}
				userInfo={userInfo}
				goBack={()=>goBack()}/>
		)
	}
}