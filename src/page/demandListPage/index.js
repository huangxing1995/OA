import React, {Component} from 'react'
import {Image, View, TouchableOpacity, Text} from 'react-native'
import DemandList from './DemandList'
// import {pxToDp} from '../../util'

export default class extends Component {
	static navigationOptions = ({navigation}) => {
		return ({
			headerTitle: '需求',
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
			<DemandList
				navigate={(page, param) => navigate(page, param)}
				goBack={()=>goBack()}
			/>
		);
	}
}
