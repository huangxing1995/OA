import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import {pxToDp} from '../../util/index'
import DailyReportList from './DailyReportList'



export default class  extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '部门日报',
	});
	
	
	constructor(props){
		super(props);
	}
	render() {
		let {navigate} = this.props.navigation;
		return (
			<DailyReportList/>
		);
	}
}
