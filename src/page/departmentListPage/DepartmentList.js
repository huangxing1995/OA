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
	Dimensions, Alert
} from 'react-native'
// import Modal from "react-native-modal";
import {wrapComponent} from 'react-eflow'
import OAStore from '../../store'
import pxToDp from "../../util/pxToDp";
import convertPinyin from "../../util/convertPinyin";
import {findUserBy} from "../../request/userRequest";


const WIDTH = Dimensions.get('window').width;

class DepartmentList extends Component{
	constructor(props){
		super();
		this.state = {
		
		}
	}
	componentDidMount(){
		OAStore.departmentList();
	}
	
	renderDepartmentList(){
		let {navigate} = this.props;
		let departmentList = this.props.departmentList.map((department, i)=>{
			return(
				<View key={i} style={styles.item}>
					<TouchableOpacity onPress={()=>navigate('DepartmentInfoPage',department)} style={{flex:1,flexDirection:'row'}}>
						<Text style={{fontSize:16,fontWeight:'bold'}}>{department.name}</Text>
						<Text>{`     部门长: ${department.managerUm}`}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{
						findUserBy({key:'departmentId', value: department.name})
							.then(res=>{
								if (res.length){
									console.log(res);
									Alert.alert(
										'',
										'该部门下还有人',
										[
											{text: '确定', onPress: () => console.log('OK Pressed')},
										],
										{cancelable: false}
									);
								} else {
									// console.log(res)
									OAStore.deleteDepartment({_id:department._id})
								}
							})
							.catch(err=>console.error(err))
					}}>
						<Image source={require('../../resource/del.png')} style={{width:pxToDp(30),height:pxToDp(30)}}/>
					</TouchableOpacity>
				</View>
			)
		});
		return departmentList;
	}
	render(){
		return(
			<ScrollView style={{flex:1,paddingTop:pxToDp(40)}}>
				{this.renderDepartmentList()}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	top:{
		height:pxToDp(80),
		justifyContent:'center',
		alignItems:'center',
		// marginBottom:pxToDp(20)
	},
	box:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#ddd',
		width:WIDTH * 0.9,
		height:pxToDp(60),
		borderRadius:pxToDp(10),
		paddingLeft:pxToDp(10),
		paddingRight:pxToDp(10),
	},
	edit:{
		flex:1,
		height: pxToDp(40),
		fontSize: 16,
		// backgroundColor: '#fff',
		paddingLeft:pxToDp(10)
	},
	item:{
		flex: 1,
		flexDirection:'row',
		// marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),    //通过大于TextInput的高度来弥补上面的问题
		justifyContent: 'space-between',  //放置到底部
		alignItems:'center',
		paddingLeft:pxToDp(30),
		paddingRight:pxToDp(30),
		marginTop: pxToDp(1),
	},
});


export default wrapComponent(DepartmentList, [OAStore.departmentList]);

