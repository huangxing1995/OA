import Notification from "./notification";
import Schedule from './schedule'
import Me from './me'
import Work from './work'
import {TabNavigator} from "react-navigation";

const TabPage = TabNavigator({
	Notification: {screen: Notification},
	Schedule: {screen: Schedule},
	Work: {screen: Work},
	Me: {screen: Me},
},{
	tabBarPosition: 'bottom',
	swipeEnabled: false,
	animationEnabled: false,
	lazy: true,
	initialRouteName:'Work',
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

export default TabPage