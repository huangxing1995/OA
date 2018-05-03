import React, {Component} from 'react'
import {Image, View, TouchableOpacity, Text} from 'react-native'
import DemandInfo from './DemandInfo'
// import {pxToDp} from '../../util'

export default class extends Component {
	static navigationOptions = ({navigation}) => {
		return ({
			headerTitle: '需求详情',
			gesturesEnabled:true,
		})
	}
	
	constructor(props){
		super(props);
		this.state={
		}
	}
	componentWillMount() {
	}
	
	render() {
		let {navigate, goBack, state} = this.props.navigation;
		return (
			<DemandInfo
				scheduleInfo={state.params.scheduleInfo}
				navigate={(page, param) => navigate(page, param)}
				goBack={()=>goBack()}
			/>
		);
	}
}
