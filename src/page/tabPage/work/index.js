import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,ScrollView} from 'react-native'
import {pxToDp} from '../../../util/index'

import Work from './Work'



export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		tabBarLabel: '工作',
		tabBarIcon: ({ tintColor, focused }) => {
			let uri = focused
				?require('../../../resource/work_active.png')
				:require('../../../resource/work.png');
			
			return (
				<Image
					source={uri}
					style={{width: pxToDp(50),height:pxToDp(50)}}
				/>
			)
		},
		headerTitle: '工作',
		gesturesEnabled:true,
	});
	
	constructor(props){
		super(props);
	}
	componentDidMount(){
		let {setParams,navigate} = this.props.navigation;
		setParams({
			navigatePress:()=>navigate('SomePage')
		})
	}
	render() {
		let {navigate} = this.props.navigation;
		return (
			<Work navigate={(page, params)=>navigate(page,params)}/>
		);
	}
}
