import React, {Component} from 'react'
import {
	Image,
	View,
	TouchableOpacity,
	Text,
	ScrollView,
	StyleSheet,
	Modal,
	TextInput, Alert
	
} from 'react-native'
import {wrapComponent} from 'react-eflow'
import DateTimePicker from 'react-native-modal-datetime-picker';
import OAStore from '../../store'

import {pxToDp} from '../../util'
import {formatDateAndTime,formatDate} from "../../util/formatTime";

class DemandList extends Component {
	
	constructor(props){
		super(props);
		this.state={
			modalVisible:false,
			isDateTimePickerVisible: false,
			isFilterUnDone:false,
			
			demandInfo:{
				receiveUm:'',
				describe:'',
				deadTime:0
			}
		}
	}
	componentWillMount() { // 获取需求列表和人员列表
		OAStore.userList();
		OAStore.demandList();
	}
	um2Name(um){
		let name;
		this.props.userList.forEach((user,i)=>{
			if(user.um === um) name = user.name;
		})
		return name;
	}
	scrollToTop(){
		this.sv && this.sv.scrollTo({x: 0, y: 0, animated: true})
	}
	handleChangeText(key, text){
		let demandInfo = this.state.demandInfo;
		demandInfo[key] = text;
		this.setState({demandInfo})
	}
	_showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	}
	_hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
	};
	_handleDatePicked = (date) => {
		let {demandInfo} = this.state;
		demandInfo.deadTime =  Date.parse(date);
		this.setState({demandInfo});
		this._hideDateTimePicker();
	};
	handleCloseModal(){
		this.setState({modalVisible:false});
	}
	
	handleOpenModal(){
		this.setState({modalVisible:true})
	}
	handleFilterUnDone(){
		let {isFilterUnDone} = this.state;
		this.setState({isFilterUnDone: !isFilterUnDone})
	}
	handleSelectReceiver(){
		this.handleCloseModal();
		let options = this.props.userList;
		this.props.navigate('SelectPage',{mode:'user',options,callback:(user)=>{
			let {demandInfo} = this.state;
			demandInfo.receiveUm = user.um;
			this.setState({demandInfo});
			this.handleOpenModal();
		}})
	}
	handleSave(){
		let {demandInfo} = this.state;
		if(demandInfo.receiveUm==='' || demandInfo.deadTime === 0 || demandInfo.describe===''){
			Alert.alert(
				'',
				'信息不全',
				[
					{text: '确定', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false}
			);
		} else{
			OAStore.addDemand(demandInfo);
			this.handleCloseModal();
		}
	}
	renderModal(){
		return (
			<View style={{flex:1,marginTop:pxToDp(100),backgroundColor:'#f3f3f3'}}>
				{/*describe */}
				<View style={{height:pxToDp(250),marginTop:pxToDp(100),marginBottom:pxToDp(100)}}>
					<TextInput
						value={this.state.demandInfo.describe}
						placeholder={'请输入需求的详细细节'}
						onChangeText={(text)=>this.handleChangeText('describe',text)}
						underlineColorAndroid="transparent"
						style={styles.edit}
						multiline={true}
					/>
				</View>
				
				{/*// 结束时间*/}
				<View style={styles.btnWrap}>
					<Text>结束时间</Text>
					<TouchableOpacity onPress={()=>this._showDateTimePicker()} style={{flexDirection:'row',	justifyContent: 'space-between',alignItems:'center'}}>
						<Text>{this.state.demandInfo.deadTime?formatDate(this.state.demandInfo.deadTime):''}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				
				{/*// 需求接收人*/}
				<View style={[styles.btnWrap,{marginTop:pxToDp(50)}]}>
					<Text>需求接收人</Text>
					<TouchableOpacity
						onPress={()=>this.handleSelectReceiver()}
						style={{flexDirection:'row',	justifyContent: 'space-between',alignItems:'center'}}>
						<Text>{this.um2Name(this.state.demandInfo.receiveUm)}</Text>
						<Image
							style={{width: pxToDp(40),height: pxToDp(40)}}
							source={require('../../resource/arrow.png')}/>
					</TouchableOpacity>
				</View>
				
				{/*保存*/}
				<TouchableOpacity style={styles.button} onPress={()=>this.handleSave()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>保存</Text>
				</TouchableOpacity>

				{/*取消*/}
				<TouchableOpacity style={[styles.button,{backgroundColor:'#dedede',marginTop: pxToDp(20),}]} onPress={()=>this.handleCloseModal()} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>取消</Text>
				</TouchableOpacity>
				
				<DateTimePicker
					mode={'date'}
					date={new Date(this.state.selectedDay)}
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
					
					cancelTextIOS={'取消'}
					confirmTextIOS={'确定'}
					titleIOS={'请选择'}
				/>
			</View>
		)
	}
	renderList(){
		let demandList = this.props.demandList;
		if(this.state.isFilterUnDone){
			demandList = demandList.filter(item=>item.status !== 'Y')
		}
		let result = (
			<View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:pxToDp(300)}}>
				<Image source={require('../../resource/emoty.png')} style={{width:pxToDp(400),height:pxToDp(400)}}/>
				<Text style={{color:'#333333',marginTop:pxToDp(50)}}>空空如也～</Text>
			</View>
		);
	
		result = demandList.map((demand, i)=>{
			let imgUri = demand.status === 'Y' ? require('../../resource/new-demand.png'):require('../../resource/demand-undone.jpeg')
			return (
				<TouchableOpacity
					onPress={()=>this.props.navigate('DemandInfoPage',{scheduleInfo:demand})}
					style={styles.demandItem}
					key={i}
				>
					<View style={styles.logo}>
						<Image source={require('../../resource/demand-solid.png')} style={{width:pxToDp(70),height:pxToDp(70)}}/>
					</View>
					<View style={styles.content}>
						<Text style={{color:'#666',fontSize:12}}>
							由<Text style={{color:'#333333',fontSize:13,fontWeight:'bold'}}>{this.um2Name(demand.employeeUm)}</Text>
							指派给<Text style={{color:'#333333',fontSize:13,fontWeight:'bold'}}>{this.um2Name(demand.receiveUm)}</Text>的需求
						</Text>
						<Text style={{color:'#333333',fontSize:13,fontWeight:'bold'}}>完成度{demand.progress[demand.progress.length-1].percent}%</Text>
						<View style={styles.detail}>
							<Image
								source={imgUri}
								style={{width:pxToDp(520),height:pxToDp(250)}}
								resizeMode={'contain'}
							/>
						</View>
						<Text style={{color:'#666666'}} >{demand.describe}</Text>
					</View>
				</TouchableOpacity>
			)
		});
		
		return result;
	}
	render() {
		return (
			<View style={{flex:1,backgroundColor:'#f0f0f0'}}>
				<ScrollView
					ref={(self)=>this.sv = self}
					style={{flex:1,backgroundColor:'#f0f0f0'}}>
					
					{this.renderList()}
					
					
					<Modal
						animationType={"slide"}
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={()=>console.log('android request close')}>
						{this.renderModal()}
					</Modal>
				</ScrollView>
				
				
				{/*add*/}
				<TouchableOpacity
					onPress={()=>{
						let demandInfo = {
							receiveUm:'',
							describe:'',
							deadTime:0
						}
						this.setState({demandInfo});
						this.handleOpenModal()
					}}
					style={[styles.clear,{	bottom:pxToDp(100),}]}>
					<Image source={require('../../resource/add-schedule.png')} style={{width:pxToDp(40),height:pxToDp(40)}}/>
				</TouchableOpacity>
				
				{/*filter*/}
				<TouchableOpacity
					onPress={()=>this.handleFilterUnDone()}
					style={[styles.clear,{	bottom:pxToDp(180),backgroundColor:'#aaaaaa'}]}>
						<Image source={require('../../resource/filter.png')} style={{width:pxToDp(40),height:pxToDp(40)}}/>
				</TouchableOpacity>
				
				{/*to top*/}
				<TouchableOpacity
					onPress={()=>this.scrollToTop()}
					style={[styles.clear,{	bottom:pxToDp(260),backgroundColor:'#aaaaaa'}]}>
					<Image source={require('../../resource/back2top.png')} style={{width:pxToDp(40),height:pxToDp(40)}}/>
				</TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	clear:{
		position:'absolute',
		width:pxToDp(60),
		height:pxToDp(60),
		borderRadius:pxToDp(30),
		backgroundColor:"#1E90FF",
		bottom: pxToDp(20),
		// left: 0,
		right:pxToDp(20),
		justifyContent:'center',
		alignItems:'center',
	},
	edit: {
		flex:1,
		// height: pxToDp(140),
		fontSize: 16,
		backgroundColor: '#fff',
		padding:pxToDp(10),
		// marginBottom:pxToDp(200)
	},
	btnWrap:{
		// flex: 1,
		flexDirection:'row',
		// marginTop: pxToDp(10),
		backgroundColor: '#fff',
		height: pxToDp(80),    //通过大于TextInput的高度来弥补上面的问题
		justifyContent: 'space-between',  //放置到底部
		alignItems:'center',
		paddingLeft:pxToDp(10),
		paddingRight:pxToDp(10),
		marginTop: pxToDp(1),
	},
	button: {
		height: pxToDp(80),
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderRadius: 8,
		marginBottom: pxToDp(10),
		marginTop: pxToDp(100),
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	demandItem:{
		// flex:1,
		width:pxToDp(600),
		flexDirection:'row',
		// backgroundColor:'#afa',
		// height:pxToDp(400),
		marginTop:pxToDp(20),
		marginBottom:pxToDp(10),
		padding:pxToDp(10),
	},
	logo:{
		width:pxToDp(60),
		height:pxToDp(60),
		borderRadius:pxToDp(30),
		// backgroundColor:'#324134'
	},
	content:{
		flex:1,
		marginLeft:pxToDp(20),
		padding:pxToDp(10),
		backgroundColor:'#fff',
		borderRadius:pxToDp(10)
	},
	detail:{
		flex:1,
		justifyContent:'space-between',
		alignItems:'center',
		// width: pxToDp(500),
		backgroundColor:'#fff',
		padding:pxToDp(20),
		marginTop:pxToDp(10),
	}
})

export default wrapComponent(DemandList, [OAStore.demandList, OAStore.userList])