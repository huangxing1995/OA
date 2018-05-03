import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import AnnouncementList from './AnnouncementListForUser'
import {pxToDp} from "../../util";

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '公告列表',
	});
	render(){
		let {navigate, back, state} = this.props.navigation;
		return(
			<AnnouncementList
				navigate={(page, param) => navigate(page, param)}
				back={()=>back()}
				isInViewMode={state.params.isInViewMode}
			/>
		)
	}
}