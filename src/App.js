import React, { Component } from 'react';
import {
	AsyncStorage,
	View
} from 'react-native';

import configAppNavigator from './page';
import OAStore from "./store";


class App extends Component {
	state = {
		isLoggedIn: false,
		checkedLogin: false
	};
	
	componentWillMount() {
		console.log('************************ app start ***************************');
		AsyncStorage.getItem('token')
		.then((token)=> {
			if (token) {
				// console.info(token);
				global.token = token;
				OAStore.userInfo();
				this.timer = setInterval(()=>OAStore.init(),2000)
				this.setState({isLoggedIn:true,checkedLogin:true})
			} else {
				console.log('no token');
				this.setState({isLoggedIn:false,checkedLogin:true})
			}
		}).catch(err=>{
		console.error(err)
	})
	}
	
	render() {
		const {isLoggedIn,checkedLogin } = this.state;
		if (!checkedLogin) {
			return null;
		}
		const AppNavigator = configAppNavigator(isLoggedIn);
		return (
			<View style={{flex:1,backgroundColor:'#f3f3f3'}}>
				<AppNavigator />
			</View>
		);
	}
}

export default App;
