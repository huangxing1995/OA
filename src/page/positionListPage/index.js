import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button} from 'react-native'
import PositionList from './PositionList'
import {pxToDp} from "../../util";

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '岗位列表',
		headerRight:
			<View style={{paddingRight:pxToDp(10)}}>
				<TouchableOpacity onPress={navigation.state.params?navigation.state.params.navigatePress:null}>
					<Image
						style={{width: pxToDp(40),height: pxToDp(40)}}
						source={require('../../resource/add.png')}/>
				</TouchableOpacity>
			</View>,
	});
	constructor(props){
		super(props)
	}
	componentDidMount(){
		let {setParams,navigate} = this.props.navigation;
		setParams({
			navigatePress:()=>navigate('PositionInfoPage',{})
		})
	}
	
	render(){
		let {navigate, back} = this.props.navigation;
		return(
			<PositionList
				navigate={(page, param) => navigate(page, param)}
				back={()=>back()}
			/>
		)
	}
}