import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,ScrollView,StyleSheet,Dimensions,Modal,AsyncStorage} from 'react-native'
import pxToDp from "../../../util/pxToDp";
import Module from '../../../common/Module'
import OAStore from '../../../store'
import {wrapComponent} from 'react-eflow'
const WIDTH = Dimensions.get('window').width;

class Work extends Component{
	constructor(props){
		super(props);
	}
	
	componentWillMount(){
		console.log('******************** work page **********************');
		OAStore.userInfo()
		OAStore.announcementList();
	}
	render(){
		let {navigate,announcementList} = this.props;
		let adminOptions = [
			{
				name: '人员管理',
				page: 'UserListPage',
				imgUrl: require('../../../resource/option0.png'),
			},
			{
				name: '部门管理',
				page: 'DepartmentListPage',
				imgUrl: require('../../../resource/option1.png'),
			},
			{
				name: '职位管理',
				page: 'PositionListPage',
				imgUrl: require('../../../resource/option2.png'),
			},
			{
				name: '公告管理',
				page: 'AnnouncementListPage',
				imgUrl: require('../../../resource/option3.png'),
			},
		];
		let attendanceOptions = [
			{
				name: '签到',
				page: 'SignTabPage',
				imgUrl: require('../../../resource/sign-in.png'),
			},
			{
				name: '请假',
				page: 'ApprovePage',
				imgUrl: require('../../../resource/afl.png'),
			},
			{
				name: '出差',
				page: 'BusinessTripPage',
				imgUrl: require('../../../resource/trip.png'),
			},
			{
				name: '加班',
				page: 'OverTimePage',
				imgUrl: require('../../../resource/over-time.png'),
			},
		];
		let demandOptions = [
			{
				name: '需求',
				page: 'DemandListPage',
				imgUrl: require('../../../resource/demand-solid.png'),
			},
		];
		let reportOptions = [
			{
				name: '日报',
				page: 'DailyReportPage',
				imgUrl: require('../../../resource/daily-report.png'),
			},
			{
				name: '周报',
				page: 'WeeklyReportPage',
				imgUrl: require('../../../resource/weekly-report.png'),
			},
		];
		return(
			<ScrollView style={styles.wrapper}>
				{/*背景图*/}
				<View style={{width:WIDTH,justifyContent:'center',alignItems:'center',}}>
					<Image
						style={styles.bgImg}
						source={require('../../../resource/bg.jpeg')}
						// resizeMode='stretch'
					/>
				</View>
				
				{/*滚动公告*/}
				<TouchableOpacity
					style={styles.announcement}
					onPress={()=>this.props.navigate('AnnouncementListForUserPage',{isInViewMode:true})}
				>
					<Image
						style={{width: pxToDp(30),height: pxToDp(30),}}
						source={require('../../../resource/notif.png')}/>
					<Text
						// duration={9000}
						// speed={20}
						// width={WIDTH}
						// height={pxToDp(80)}
						// bgViewStyle={{height:pxToDp(80),}}
						style={{ fontSize: 14, color: '#3f3f3f',marginLeft:pxToDp(50) }}
					>
						{announcementList.length&&announcementList[0].theme}
					</Text>
				</TouchableOpacity>
				
				
				{/*管理员模块*/}
				{this.props.userInfo.um  === 'huangxing693' ? <Module
							options={adminOptions||[]}
							navigate={(page)=>navigate(page)}
							style={{height:pxToDp(200)}}
							headerTitle='管理员控制台'
							subTitle='(仅管理员可见)'
						/> : null}
				
				{/*考勤模块*/}
				<Module
					options={attendanceOptions||[]}
					navigate={(page)=>navigate(page)}
					style={{height:pxToDp(200)}}
					headerTitle='智能内外勤'
				/>
				
				{/*需求模块*/}
				<Module
					options={demandOptions||[]}
					navigate={(page)=>navigate(page)}
					style={{height:pxToDp(200)}}
					headerTitle='业务管理'
				/>
				
				{/*汇报模块*/}
				<Module
					options={reportOptions||[]}
					navigate={(page)=>navigate(page)}
					style={{height:pxToDp(200)}}
					headerTitle='高效汇报'
				/>
				
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	wrapper:{
		flex: 1,
		backgroundColor:'#fff',
	},
	bgImg:{
		width: WIDTH * 0.95,
		height: pxToDp(350),
		borderRadius:pxToDp(10),
		overflow: 'hidden'
	},
	announcement:{
		height:pxToDp(50),
		marginTop:pxToDp(30),
		backgroundColor:'#F0F0F0',
		flexDirection:'row',
		marginHorizontal:pxToDp(30),
		paddingLeft:pxToDp(20),
		borderRadius:pxToDp(20),
		alignItems:'center'
	}
});


export default wrapComponent(Work, [OAStore.userInfo, OAStore.announcementList])