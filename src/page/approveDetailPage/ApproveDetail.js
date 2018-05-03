import React, {Component} from 'react'
import {
	Image,
	View,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	Button,
	RefreshControl,
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
import {BackToTop} from '../../common'
import Timeline from 'react-native-timeline-listview'

const WIDTH = Dimensions.get('window').width;

class ApproveDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			remark:'',
			isRefreshing:false
		};
	}
	componentDidMount(){
		OAStore.userList();
		OAStore.userInfo();
	}
	um2Name=(um)=>{
		let name;
		this.props.userList.forEach((user,i)=>{
			if(user.um === um) name = user.name;
		});
		return name;
	}
	findUser(um){
		let user;
		this.props.userList.forEach((u,i)=>{
			if(u.um === um) user = u;
		});
		return user;
	}
	handleChangeText(text){
		this.setState({remark:text})
	}
	handleCallBack(){
		let _id = this.props.approveInfo._id;
		let {goBack} = this.props;
		OAStore.deleteApprove({_id})
		goBack()
	}
	handleResolve(){ //{_id,um,opt,remark,approverUm:[[]],currentApproverUm:[]}
		let {goBack,approveInfo} = this.props;
		let {
			_id,
			approverUm, // 所有审批人员列表
			currentApproverUm
		} = approveInfo;
		let params = {
			_id,
			um:this.props.userInfo.um,
			opt:'resolve',
			remark:this.state.remark,
			approverUm, // 所有审批人员列表
			currentApproverUm
		};
		OAStore.updateApprove(params);
		goBack()
	}
	handleReject(){
		let {goBack,approveInfo} = this.props;
		let {
			_id,
			approverUm, // 所有审批人员列表
			currentApproverUm
		} = approveInfo;
		let params = {
			_id,
			um:this.props.userInfo.um,
			opt:'reject',
			remark:this.state.remark,
			approverUm, // 所有审批人员列表
			currentApproverUm
		};
		OAStore.updateApprove(params);
		goBack()
	}
	renderDetail=(rowData, sectionID, rowID)=> {
		let title = <Text style={[styles.title]}>{rowData.title}</Text>
		let desc = null;
		if(rowData.description)
			desc = (
				<View style={styles.descriptionContainer}>
					{rowData.description.map((approve,i)=>{
						let opt = null ;
						if(approve.opt==='resolve') {
							opt = <Text style={[styles.textDescription,{color:'#48BBEC',paddingLeft:pxToDp(20)}]}>      同意</Text>
						} else if (approve.opt === 'reject'){
							opt = <Text style={[styles.textDescription,{color:'#ff9797',paddingLeft:pxToDp(20)}]}>      拒绝</Text>
						} else {
							opt = <Text></Text>;
						}
						return <View key={i} style={{marginBottom:pxToDp(20)}}>
							<Text style={[styles.textDescription]}>{this.um2Name(approve.um)} {opt}</Text>
							<Text style={[styles.textDescription]}>备注：{approve.remark}</Text>
						</View>
					})}
				</View>
			)
		
		return (
			<View style={{flex:1}}>
				{desc}
			</View>
		)
	};
	_onRefresh = ()=>{
		this.setState({isRefreshing:true});
		this.props.onRefresh();
		setTimeout(()=>{this.setState({isRefreshing:false})},2000)
	}
	
	render(){
		let {approveInfo} = this.props;
		let {
			_id,
			employeeUm,
			
			type,
			reason,
			destination,
			startTime,
			endTime,
			
			approverUm, // 所有审批人员列表
			currentApproverUm, // 当前审批人
			
			approveStatus, // Y,N,D
			approveTime,
		} = approveInfo;
		// let data = [
		// 	{time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
		// 	{time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
		// 	{time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
		// 	{time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
		// 	{time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
		// ];
		let data = approverUm.map((stageUm,i)=>{
			let time = `第${i+1}级审批`;
			let title = null;
			let description = stageUm;
			return {
				time,
				// title,
				description,
			}
		});
		return(
			<ScrollView
				style={{flex:1,paddingTop:pxToDp(40),backgroundColor:'#f0f0f0'}}
				ref='sv'
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						tintColor="#333333"
						title="稍等..."
						titleColor="#333333"
						progressBackgroundColor="#ffff00"
					/>
				}
			>
				{/*用户*/}
				<View style={[styles.detail,{flexDirection:'row',alignItems:'center',marginBottom:pxToDp(50)}]}>
					<View style={styles.icon}>
						<Image source={require('../../resource/photo.png')} style={{width:pxToDp(60),height:pxToDp(60)}} resizeMode={'contain'}/>
					</View>
					<Text style={{marginLeft:pxToDp(50),fontWeight:'bold',fontSize:16}}>{this.um2Name(this.props.approveInfo.employeeUm)}</Text>
					<Text style={{marginLeft:pxToDp(50)}}>{`${this.findUser(this.props.userInfo.um).departmentId}/${this.findUser(this.props.userInfo.um).positionId}`}</Text>
				</View>
				
				{/*detail*/}
				<View style={styles.detail}>
					{!!this.props.approveInfo.type && <Text><Text style={{color:'#666',fontSize:12}}>请假类型:   </Text>{this.props.approveInfo.type}</Text>}
					{!!this.props.approveInfo.destination && <Text><Text style={{color:'#666',fontSize:12}}>目的地:   </Text>{this.props.approveInfo.destination}</Text>}
					<Text><Text style={{color:'#666',fontSize:12}}>开始时间:   </Text>{formatDate(startTime)}</Text>
					<Text><Text style={{color:'#666',fontSize:12}}>结束时间:   </Text>{formatDate(endTime)}</Text>
				</View>
				
				{/*审批事由*/}
				<View>
					<Text style={[styles.tip,{marginTop:pxToDp(20)}]}>原因</Text>
					<View style={styles.detail}>
						<Text>{reason}</Text>
					</View>
				</View>
				
				{/*回执信息*/}
				{
					!this.props.isInViewMode && (
						<View style={{marginBottom:pxToDp(50)}}>
							<Text style={[styles.tip,{marginTop:pxToDp(20)}]}>回执信息</Text>
							<TextInput
								value={this.state.rejectReason}
								editable={!this.props.isInViewMode}
								placeholder={'输入回执信息'}
								onChangeText={(text)=>this.handleChangeText(text)}
								underlineColorAndroid="transparent"
								multiline={true}
								style={[styles.edit,{fontSize: 14,}]}/>
						</View>
					)
				}
				
				{/*流程*/}
				<Timeline
					style={styles.list}
					circleSize={20}
					circleColor='rgb(45,156,219)'
					lineColor='rgb(45,156,219)'
					timeContainerStyle={{minWidth:52, marginTop: 5}}
					timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
					descriptionStyle={{color:'gray'}}
					options={{
						style:{paddingTop:5}
					}}
					innerCircle={'dot'}
					data={data}
					renderDetail={this.renderDetail}
				/>
				
				{/*撤销*/}
				{
					this.props.isInViewMode && (
						<TouchableHighlight style={[styles.button,{marginTop:pxToDp(100)}]} onPress={()=>this.handleCallBack()} underlayColor='#99d9f4'>
							<Text style={styles.buttonText}>撤销 / 删除</Text>
						</TouchableHighlight>
					)
				}
				
				{/*同意*/}
				{
					!this.props.isInViewMode && (
						<TouchableHighlight style={[styles.button,{marginTop:pxToDp(100)}]} onPress={()=>this.handleResolve()} underlayColor='#99d9f4'>
							<Text style={styles.buttonText}>同意</Text>
						</TouchableHighlight>
					)
				}
				
				{/*拒绝*/}
				{
					!this.props.isInViewMode && (
						<TouchableHighlight style={[styles.button,{backgroundColor:'#cccccc'}]} onPress={()=>this.handleReject()} underlayColor='#99d9f4'>
							<Text style={styles.buttonText}>拒绝</Text>
						</TouchableHighlight>
					)
				}
				
				{/*占位*/}
				<View style={{height:pxToDp(100)}}/>
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
	detail:{
		// width: pxToDp(600),
		backgroundColor:'#fff',
		padding:pxToDp(20),
		marginTop:pxToDp(10),
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: pxToDp(80),
		backgroundColor: '#48BBEC',
		// borderColor: '#48BBEC',
		// borderWidth: 1,
		borderRadius: 8,
		marginBottom: pxToDp(10),
		// marginTop: pxToDp(100),
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	tip:{
		fontSize:12,
		color:"#666",
		paddingLeft:pxToDp(10),
		marginTop:pxToDp(10)
	},
	edit: {
		height: pxToDp(255),
		backgroundColor: '#fff',
		padding:pxToDp(10),
		marginTop:pxToDp(10),
		flexDirection:'row',
		// justifyContent:'center',
		alignItems:'center'
	},
	icon:{
		width:pxToDp(90),
		height:pxToDp(90),
		// flex:1,
		justifyContent:'center',
		alignItems:'center',
		// backgroundColor:'#ffa'
	},
	flow:{
		height:pxToDp(90),
		backgroundColor:'#fff',
		paddingLeft:pxToDp(20),
		// marginTop:pxToDp(10),
		flexDirection:'row',
		alignItems:'center'
	},
	line:{
		width:pxToDp(2),
		height:pxToDp(20),
		backgroundColor:'#ccc'
	},
	list: {
		flex: 1,
		marginTop:pxToDp(20),
	},
	title:{
		fontSize:16,
		fontWeight: 'bold'
	},
	descriptionContainer:{
		// flexDirection: 'row',
		paddingRight: pxToDp(50),
		borderBottomColor:'gray',
		borderBottomWidth:1
	},
	image:{
		width: pxToDp(50),
		height: pxToDp(50),
		borderRadius: pxToDp(25)
	},
	textDescription: {
		marginLeft: pxToDp(10),
		color: 'gray'
	}
});


export default wrapComponent(ApproveDetail, [OAStore.userList,OAStore.userInfo]);

