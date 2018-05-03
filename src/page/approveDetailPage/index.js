import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import ApproveDetail from './ApproveDetail'
import {pxToDp} from "../../util";

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '',
		gesturesEnabled:true,
	});
	constructor(props){
		super(props)
	}
	componentDidMount(){
	
	}
	
	render(){
		let {navigate, goBack, state} = this.props.navigation;
		return(
			<ApproveDetail
				navigate={(page, param) => navigate(page, param)}
				goBack={()=>goBack()}
				onRefresh={state.params.onRefresh}
				approveInfo={state.params.approveInfo}
				isInViewMode={state.params.isInViewMode}
			/>
		)
	}
}