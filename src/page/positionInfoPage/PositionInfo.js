import React,{Component} from 'react';
import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';


import OAStore from '../../store'
import pxToDp from "../../util/pxToDp";
import convertPinyin from '../../util/convertPinyin'
import {formatDate} from '../../util/'

class PositionInfo extends Component{
	constructor(props){
		super(props);
		let positionInfo = props.positionInfo;
		let isInCreateMode = false;
		if (JSON.stringify(positionInfo) === '{}'){
			positionInfo = {
				name:"",
				// departmentId:""
			};
			isInCreateMode = true;
		}
		this.state = {
			positionInfo,
			isInCreateMode,
		}
	}
	handleChangeText(key, text){
		let positionInfo = this.state.positionInfo;
		positionInfo[key] = text;
		this.setState({positionInfo})
	}
	handleSave(){
		if (this.state.isInCreateMode){
			OAStore.addPosition(this.state.positionInfo);
		} else {
			OAStore.updatePosition({_id:this.props.positionInfo._id,newInfo:this.state.positionInfo});
		}
		this.props.goBack();
	}
	
	render(){
		return(
			<ScrollView style={{flex:1}}>
				<Text style={styles.tip}>名称</Text>
				<View style={styles.editWrapper}>
					<TextInput
						value={this.state.positionInfo.name}
						placeholder={'填写职位名称'}
						onChangeText={(text)=>this.handleChangeText('name',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				{/*<Text style={styles.tip}>所属部门</Text>*/}
				{/*<View style={styles.editWrapper}>*/}
					{/*<TextInput*/}
						{/*value={this.state.positionInfo.departmentId}*/}
						{/*onChangeText={(text)=>this.handleChangeText('departmentId',text)}*/}
						{/*underlineColorAndroid="transparent"*/}
						{/*style={styles.edit}/>*/}
				{/*</View>*/}
				
				<TouchableOpacity style={styles.button} onPress={()=>this.handleSave()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>保存</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	edit: {
		height: pxToDp(55),
		fontSize: 16,
		backgroundColor: '#fff',
		padding:pxToDp(10)
	},
	editWrapper: {
		flex: 1,
		marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),    //通过大于TextInput的高度来弥补上面的问题
		justifyContent: 'center'  //放置到底部
	},
	tip:{
		fontSize:12,
		color:"#333",
		paddingLeft:pxToDp(10),
		marginTop:pxToDp(10)
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: pxToDp(80),
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: pxToDp(10),
		marginTop: pxToDp(100),
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
})

// export default wrapComponent(UserInfo,[userStore.init])
export default PositionInfo