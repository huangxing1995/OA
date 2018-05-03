import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import Approve from './Approve'
import {pxToDp} from "../../util";

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '请假',
	
	});
	render(){
		let {navigate, goBack} = this.props.navigation;
		return(
			<Approve
				navigate={(page, param) => navigate(page, param)}
				goBack={()=>goBack()}
			/>
		)
	}
}