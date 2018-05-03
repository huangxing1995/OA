import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import {pxToDp} from '../../../util/index'
import Me from './Me'

import navigationUtil from '../../../util/navigationUtil';

export default class extends Component{
	
	static navigationOptions = ({navigation}) => ({
		tabBarLabel: '更多',
		tabBarIcon: ({ tintColor, focused }) => {
			let uri = focused
				?require('../../../resource/me_active.png')
				:require('../../../resource/me.png');
			return (
				<Image
					source={uri}
					style={{width: pxToDp(50),height:pxToDp(50)}}
				/>
			)
		},
		headerTitle: '更多',
		gesturesEnabled:true,
	});
	
	constructor(props){
		super(props);
	}
	render() {
		let {navigate,goBack,state} = this.props.navigation;
		let userInfo = state.params;
		return (
			<Me
				navigate={(page, param) => navigate(page, param)}
				userInfo={userInfo}
				goBack={()=>goBack()}
				logout={()=>navigationUtil.reset(this.props.navigation, 'LoginPage')}
			/>
		);
	}
}
