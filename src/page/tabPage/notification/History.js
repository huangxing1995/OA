import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	RefreshControl

} from 'react-native';
import {pxToDp,formatDate} from '../../../util/index'
import {wrapComponent} from "react-eflow/lib/eflow";
import OAStore from "../../../store";
class History extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			filterUnResolved: false,
			isRefreshing:false
		}
	}
	componentDidMount(){
		OAStore.userList();
	}
	handleFilterUnResolved(){
		let filterUnResolved = this.state.filterUnResolved;
		this.setState({filterUnResolved:!filterUnResolved})
	}
	scrollToTop(){
		this.sv && this.sv.scrollTo({x: 0, y: 0, animated: true})
	}
	generateKey(len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [], i;
		radix = radix || chars.length;
		
		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		} else {
			// rfc4122, version 4 form
			var r;
			
			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
			
			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random()*16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	}
	um2Name(um){
		let name;
		this.props.userList.forEach((user,i)=>{
			if(user.um === um) name = user.name;
		})
		return name;
	}
	renderApproveList(){
		let {approveList} = this.props;
		if (this.state.filterUnResolved){
			approveList = approveList.filter((item)=>item.approveStatus === 'D')
		}
		let result = approveList.map((item, i)=>{
			let {
				_id,
				employeeUm,
				type,
				destination,
				reason,
				startTime,
				endTime,
				approverUm, // 所有审批人员列表
				currentApproverUm, // 当前审批人
				approveStatus, // Y,N,D
			} = item;
			let status,color;
			switch (approveStatus){
				case 'Y': {
					status = '已同意';
					color = '#008B00'
					break
				}
				case 'N': {
					status = '已拒绝';
					color = '#ff8247'
					break;
				}
				case 'D': {
					status = '审批中';
					color = '#1C86EE'
					break;
				}
				default: {
					status = '';
					color = '#000'
				}
			}
			return(
				<TouchableOpacity
					onPress={()=>this.props.navigate('ApproveDetailPage',{approveInfo:item, isInViewMode:true, onRefresh:()=>this.props.onRefresh()})}
					style={styles.approve} key={this.generateKey(10,10)}>
					<View style={styles.icon}>
						<Image source={require('../../../resource/zhang.png')} style={{width:pxToDp(60),height:pxToDp(60)}}/>
					</View>
					<View style={styles.right}>
						<Text style={{color:'#666',fontSize:10}}>审批</Text>
						<View style={styles.detail}>
							<Text><Text style={{color:'#666',fontSize:12}}>审批:   </Text>{this.um2Name(employeeUm)}的申请</Text>
							{!!type && <Text><Text style={{color:'#666',fontSize:12}}>请假类型:   </Text>{type}</Text>}
							{!!destination && <Text><Text style={{color:'#666',fontSize:12}}>目的地:   </Text>{destination}</Text>}
							<Text><Text style={{color:'#666',fontSize:12}}>开始时间:   </Text>{formatDate(startTime)}</Text>
							<Text><Text style={{color:'#666',fontSize:12}}>结束时间:   </Text>{formatDate(endTime)}</Text>
							<Text style={{color}}><Text style={{color:'#666',fontSize:12}}>审批状态:   </Text>{status}</Text>
						</View>
					</View>
				</TouchableOpacity>
			)
		})
		return result;
	}

	renderList(){
		let result = this.renderApproveList()
		if (!result.length) return (
			<View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:pxToDp(300)}}>
				<Image source={require('../../../resource/emoty.png')} style={{width:pxToDp(400),height:pxToDp(400)}}/>
				<Text style={{color:'#333333',marginTop:pxToDp(50)}}>空空如也～</Text>
			</View>
		)
		return result;
	}
	_onRefresh = ()=>{
		this.setState({isRefreshing:true});
		this.props.onRefresh();
		setTimeout(()=>{this.setState({isRefreshing:false})},2000)
	}
	
	render(){
		return(
			<View style={{flex:1,backgroundColor:'#f0f0f0'}}>
				<ScrollView
					ref={(self)=>this.sv = self}
					style={styles.wrapper}
					contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={this._onRefresh}
							tintColor="#333333"
							title="稍等..."
							titleColor="#333333"
							// colors={['#ff0000', '#00ff00', '#0000ff']}
							progressBackgroundColor="#ffff00"
						/>
					}
				>
					{this.renderList()}
				</ScrollView>
				<TouchableOpacity
					onPress={()=>this.handleFilterUnResolved()}
					style={styles.clear}>
					<Image source={require('../../../resource/filter.png')} style={{width:pxToDp(40),height:pxToDp(40)}}/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={()=>this.scrollToTop()}
					style={[styles.clear,{	bottom:pxToDp(100),}]}>
					<Image source={require('../../../resource/back2top.png')} style={{width:pxToDp(40),height:pxToDp(40)}}/>
				</TouchableOpacity>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	wrapper:{
		flex:1,
	},
	approve:{
		flex:1,
		flexDirection:'row',
		// backgroundColor:'#afa',
		height:pxToDp(300),
		marginTop:pxToDp(20),
		// marginBottom:pxToDp(50),
		padding:pxToDp(10),
	},
	icon:{
		width:pxToDp(60),
		height:pxToDp(60),
		borderRadius:pxToDp(30),
		backgroundColor:'#324134'
		// backgroundColor:'#ffa'
	},
	right:{
		flex:1,
		marginLeft:pxToDp(20),
	},
	detail:{
		flex:1,
		width: pxToDp(500),
		justifyContent:'space-between',
		backgroundColor:'#fff',
		padding:pxToDp(20),
		marginTop:pxToDp(10),
	},
	clear:{
		position:'absolute',
		width:pxToDp(60),
		height:pxToDp(60),
		borderRadius:pxToDp(30),
		backgroundColor:"#aaaaaa",
		bottom: pxToDp(20),
		// left: 0,
		right:pxToDp(20),
		justifyContent:'center',
		alignItems:'center',
	}
	
	
})

export default wrapComponent(History, [OAStore.userList]);
