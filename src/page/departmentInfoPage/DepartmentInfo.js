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
import {wrapComponent} from 'react-eflow'

import OAStore from '../../store'
import pxToDp from "../../util/pxToDp";
class DepartmentInfo extends Component{
	constructor(props){
		super(props);
		let departmentInfo = props.departmentInfo;
		let isInCreateMode = false;
		if (JSON.stringify(departmentInfo) === '{}'){
			departmentInfo = {
				name:"",
				managerUm:"",
			};
			isInCreateMode = true;
		}
		this.state = {
			departmentInfo,
			isInCreateMode,
			tempUser:null
		}
	}
	componentDidMount(){
		OAStore.userList();
	}
	um2Name(um){
		let name;
		this.props.userList.forEach((user,i)=>{
			if(user.um === um) name = user.name;
		})
		return name;
	}
	handleChangeText(key, text){
		let departmentInfo = this.state.departmentInfo;
		departmentInfo[key] = text;
		this.setState({departmentInfo})
	}
	handleSelectManager(){
		let options = this.props.userList;
		// console.log(this.state.aflInfo.approverUm);
		this.props.navigate('SelectPage',{mode:'user',options,callback:(user)=>{
				let {departmentInfo} = this.state;
				departmentInfo.managerUm = user.um;
				this.setState({departmentInfo,tempUser:user});
			}})
	}
	handleSave(){
		if (this.state.isInCreateMode){
			OAStore.addDepartment(this.state.departmentInfo);
		} else {
			OAStore.updateDepartment({_id:this.props.departmentInfo._id,newInfo:this.state.departmentInfo});
		}
		let userInfo = this.state.tempUser;
		userInfo.departmentId = this.state.departmentInfo.name;
		OAStore.updateUser({_id:userInfo._id,newInfo:userInfo});
		this.props.goBack();
	}
	
	render(){
		return(
			<ScrollView style={{flex:1}}>
				<Text style={styles.tip}>名称</Text>
				<View style={styles.editWrapper}>
					<TextInput
						value={this.state.departmentInfo.name}
						placeholder={'填写部门的名称'}
						onChangeText={(text)=>this.handleChangeText('name',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}/>
				</View>
				
				<Text style={styles.tip}>部门负责人</Text>
				<View style={styles.btnWrap}>
					<Text>{this.state.departmentInfo.managerUm?`${this.um2Name(this.state.departmentInfo.managerUm)}/${this.state.departmentInfo.managerUm}`:'未选择'}</Text>
					<TouchableOpacity onPress={()=>this.handleSelectManager()} style={{flexDirection:'row'}}>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				
				
				
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
		height: pxToDp(80),
		justifyContent: 'center'
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
	},
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
})

export default wrapComponent(DepartmentInfo,[OAStore.userList])
// export default DepartmentInfo