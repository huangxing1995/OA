import React, {Component} from 'react'
import {Image} from 'react-native'
import SignIn from './SignIn'
import {pxToDp} from "../../../util/index";

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		tabBarLabel: '今日签到',
		tabBarIcon: ({tintColor, focused}) => {
			let uri = focused
				?require('../../../resource/todaySignActive.png')
				:require('../../../resource/todaySignInactive.png');
			return (
				<Image
					source={uri}
					style={{width: pxToDp(50),height:pxToDp(50)}}
				/>
			)
		},
		headerTitle: '签到',
	});
	constructor(props){
		super(props)
	}
	render(){
		let {navigate, back} = this.props.navigation;
		return(
			<SignIn
				navigate={(page, param) => navigate(page, param)}
				back={()=>back()}
			/>
		)
	}
}