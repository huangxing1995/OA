import Sign from "./sign";
import SignList from './signList'

import {TabNavigator} from "react-navigation";

const SignTabPage = TabNavigator({
	Sign: {screen: Sign},
	SignList: {screen: SignList},
},{
	tabBarPosition: 'bottom',
	swipeEnabled: false,
	animationEnabled: false,
	lazy: true,
	initialRouteName:'Sign',
	
	tabBarOptions:{
		style: {
			backgroundColor: '#fff',
		},
		labelStyle:{
			fontSize: 12
		},
		activeTintColor: '#2f87e0',
		inactiveTintColor: '#aaa'
	}
});

export default SignTabPage