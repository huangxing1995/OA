import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import {pxToDp} from '../../util/index'
import DailyReport from './DailyReport'



export default class  extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '日报',
	});
	
	
	constructor(props){
		super(props);
	}
	render() {
		let {navigate} = this.props.navigation;
		return (
			<DailyReport
				navigate={(page, param) => navigate(page, param)}
			/>
		);
	}
}
