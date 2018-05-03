import React, {Component} from 'react'
import {Image} from 'react-native'
import SignList from './SignList'
import {pxToDp} from "../../../util";

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		tabBarLabel: '历史签到',
		tabBarIcon: ({tintColor, focused}) => {
			let uri = focused
				?require('../../../resource/historySignActive.png')
				:require('../../../resource/historySignInactive.png');
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
			<SignList
				navigate={(page, param) => navigate(page, param)}
				back={()=>back()}
			/>
		)
	}
}