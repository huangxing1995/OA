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
class DepartmentInfo extends Component{
	constructor(props){
		super(props);
		let announcementInfo = props.announcementInfo;
		let isInCreateMode = false;
		if (JSON.stringify(announcementInfo) === '{}'){
			announcementInfo = {
				theme:"",
				content:"",
				time:Date.now()
			};
			isInCreateMode = true;
		}
		this.state = {
			announcementInfo,
			isInCreateMode,
		}
	}
	handleChangeText(key, text){
		let announcementInfo = this.state.announcementInfo;
		announcementInfo[key] = text;
		this.setState({announcementInfo})
	}
	handleSave(){
		if (this.state.isInCreateMode){
			OAStore.addAnnouncement(this.state.announcementInfo);
		} else {
			OAStore.updateAnnouncement({_id:this.props.announcementInfo._id,newInfo:this.state.announcementInfo});
		}
		this.props.goBack();
	}
	
	render(){
		return(
			<ScrollView style={{flex:1}}>
				
				<Text style={styles.tip}>标题</Text>
				<View>
					<TextInput
						value={this.state.announcementInfo.theme}
						placeholder={'填写公告的主题（标题）'}
						onChangeText={(text)=>this.handleChangeText('theme',text)}
						underlineColorAndroid="transparent"
						style={styles.header}/>
				</View>
				
				
				<View>
					<Text style={[styles.tip,{marginTop:pxToDp(20)}]}>内容</Text>
					<TextInput
						value={this.state.announcementInfo.content}
						placeholder={'输入公告的详细内容'}
						onChangeText={(text)=>this.handleChangeText('content',text)}
						underlineColorAndroid="transparent"
						multiline={true}
						style={styles.edit}/>
				</View>
				
				<TouchableOpacity style={styles.button} onPress={()=>this.handleSave()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>保存</Text>
				</TouchableOpacity>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	header:{
		fontSize:24,
		fontWeight:'bold',
		height:pxToDp(80),
		justifyContent:'center',
		alignItems:'center',
		// backgroundColor:'transparent',
		backgroundColor: '#fff',
		padding:pxToDp(10)
	},
	edit: {
		height: pxToDp(255),
		fontSize: 16,
		backgroundColor: '#fff',
		padding:pxToDp(10),
		marginTop:pxToDp(10)
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
export default DepartmentInfo