import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import {pxToDp} from '../../util/index'
import WeeklyReportList from './WeeklyReportList'



export default class  extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '部门周报',
	});
	
	
	constructor(props){
		super(props);
	}
	render() {
		let {navigate} = this.props.navigation;
		return (
			<WeeklyReportList/>
		);
	}
}
