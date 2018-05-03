import React, {Component} from 'react'
import {
	Image,
	View,
	TouchableOpacity,
	Text,
	Button,
	ScrollView,
	TextInput,
	StyleSheet,
	Dimensions
} from 'react-native'
// import Modal from "react-native-modal";
import {wrapComponent} from 'react-eflow'
import OAStore from '../../store'
import pxToDp from "../../util/pxToDp";
import {formatDate} from '../../util/formatTime'
import convertPinyin from "../../util/convertPinyin";


const WIDTH = Dimensions.get('window').width;

export default class Select extends Component{
	
	render(){
		let {mode, options, callback, goBack} = this.props;
		let list;
		switch (mode){
			case 'simple': {
				list = this.props.options.map((option,i)=>{
					return(
						<TouchableOpacity style={styles.btnWrap} key={i} onPress={()=>{
							this.props.callback(option);
							this.props.goBack()
						}}>
							
							<Text>{option}</Text>
						</TouchableOpacity>
					)
				});
				break;
			}
			case 'user': {
				list = this.props.options.map((option,i)=>{
					return(
						<TouchableOpacity style={styles.btnWrap} key={i} onPress={()=>{
							this.props.callback(option);
							this.props.goBack()
						}}>
							
							<Text style={{fontSize:16,fontWeight:'bold'}}>{`${option.name}        ${option.um}`}</Text>
						</TouchableOpacity>
					)
				});
				break;
			}
			case 'department': {
				list = this.props.options.map((option,i)=>{
					return(
						<TouchableOpacity style={styles.btnWrap} key={i} onPress={()=>{
							this.props.callback(option);
							this.props.goBack()
						}}>
							
							<Text style={{fontSize:16,fontWeight:'bold'}}>{`${option.name}`}</Text>
						</TouchableOpacity>
					)
				});
				break;
			}
			case 'position': {
				list = this.props.options.map((option,i)=>{
					return(
						<TouchableOpacity style={styles.btnWrap} key={i} onPress={()=>{
							this.props.callback(option);
							this.props.goBack()
						}}>
							
							<Text style={{fontSize:16,fontWeight:'bold'}}>{`${option.name}`}</Text>
						</TouchableOpacity>
					)
				});
				break;
			}
		}
		
		
		return(
			<ScrollView style={{flex:1,paddingTop:pxToDp(40)}}>
				{list}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	btnWrap:{
		flex: 1,
		flexDirection:'row',
		// marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),
		justifyContent: 'space-between',
		alignItems:'center',
		paddingLeft:pxToDp(10),
		paddingRight:pxToDp(10),
		marginTop: pxToDp(1),
	},
});


