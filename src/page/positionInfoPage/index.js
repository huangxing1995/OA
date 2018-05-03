import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import PositionInfo from './PositionInfo'

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '岗位详情',
	})
	
	
	render(){
		let {goBack,state} = this.props.navigation;
		let positionInfo = state.params;
		return(
			<PositionInfo
				positionInfo={positionInfo}
				goBack={()=>goBack()}/>
		)
	}
}