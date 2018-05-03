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
import {wrapComponent} from 'react-eflow'
import OAStore from '../../store'
import pxToDp from "../../util/pxToDp";
import {formatDate} from '../../util/formatTime'

class AnnouncementListForUser extends Component{
	constructor(props){
		super(props);
		this.state = {
		
		}
	}
	componentDidMount(){
		OAStore.announcementList();
	}
	render(){
		return (
			<ScrollView style={styles.slide}>
				{this.props.announcementList.map((announcement, i)=>{
					return (
						<View style={styles.announcement} key={Math.random()}>
							<View style={styles.announcementTitle}>
								<Text style={styles.announcementTitleText}>{announcement.theme}</Text>
							</View>
							<View style={styles.announcementContent}>
								<View style={styles.announcementItem}>
									<Text style={styles.value}>{announcement.content}</Text>
								</View>
								<View style={styles.announcementItem}>
									<Text style={styles.value}>{formatDate(announcement.time)}</Text>
								</View>
							</View>
						</View>
					)
				})}
			</ScrollView>
		)
	}
}

const styles=StyleSheet.create({
	slide: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop:pxToDp(40),
	},
	announcement:{
		// height: pxToDp(300),
		marginHorizontal: pxToDp(50),
		marginBottom: pxToDp(50),
		backgroundColor: '#f0f0f0',
		// backgroundColor:'#FFEC8B',
		borderRadius:pxToDp(30),
		overflow:'hidden'
		// justifyContent:'center',
		// alignItems:'center',
	},
	announcementTitle: {
		height: pxToDp(80),
		paddingLeft: pxToDp(48),
		justifyContent:'center',
		borderBottomColor:'#aaa',
		borderBottomWidth:pxToDp(1)
	},
	announcementTitleText: {
		fontSize: pxToDp(52),
		color: '#666'
	},
	announcementContent: {
		flex:1,
		// marginLeft: pxToDp(48),
		marginVertical: pxToDp(20)
	},
	announcementItem:{
		flex:1,
		flexDirection:'row',
		marginTop:pxToDp(10),
		paddingHorizontal:pxToDp(20),
		alignItems:'flex-start',
		marginVertical: pxToDp(10)
	},
	value:{
		fontSize:12,
		color:'#444',
		// marginLeft:pxToDp(20),
	}
})


export default wrapComponent(AnnouncementListForUser, [OAStore.announcementList]);
