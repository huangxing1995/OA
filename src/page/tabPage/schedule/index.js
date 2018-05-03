import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import {pxToDp} from '../../../util/index'
import Schedule from './Schedule'



export default class  extends Component{
	static navigationOptions = ({navigation}) => ({
		tabBarLabel: '日程',
		tabBarIcon: ({ tintColor, focused }) => {
			let uri = focused
				?require('../../../resource/schedule_active.png')
				:require('../../../resource/schedule.png');
			return (
				<Image
					source={uri}
					style={{width: pxToDp(50),height:pxToDp(50)}}
				/>
			)
		},
		headerTitle: '日程',
		
		gesturesEnabled:true,
		
	});
	
	
	render() {
		let {navigate} = this.props.navigation;
		return (
			<Schedule/>
		);
	}
}
