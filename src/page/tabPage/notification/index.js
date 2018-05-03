import React, {Component} from 'react'
import {Image, View, TouchableOpacity, Text} from 'react-native'
import Notification from './Notification'
import {pxToDp} from '../../../util'

export default class extends Component {
	static navigationOptions = ({navigation}) => {
		return ({
			tabBarLabel: '通知',
			tabBarIcon: ({tintColor, focused}) => {
				let uri = focused
					?require('../../../resource/message_active.png')
					:require('../../../resource/message.png');
				return (
					<Image
						source={uri}
						style={{width: pxToDp(50),height:pxToDp(50)}}
					/>
				)
			},
			headerTitle: '通知',
			gesturesEnabled:false,
			headerBackTitle: '通知',
			headerBackTitleStyle:{
			  	color: '#000'
			}
		})
	}
	
	constructor(props){
		super(props);
		this.state={
			filterUnDone: false
		}
	}
	componentWillMount() {
	}
	
	render() {
		let {navigate, goBack, state} = this.props.navigation;
		return (
			<Notification
				filterUnDone={this.state.filterUnDone}
				navigate={(page, param) => navigate(page, param)}
				goBack={()=>goBack()}
			/>
		);
	}
}
