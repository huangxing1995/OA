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

class AnnouncementList extends Component{
	constructor(props){
		super(props);
		this.state = {
		
		}
	}
	componentDidMount(){
		OAStore.announcementList();
	}
	
	renderAnnouncementList(){
		let {navigate} = this.props;
		let announcementList = this.props.announcementList.map((announcement, i)=>{
			return(
				<View key={i} style={styles.item}>
					<TouchableOpacity onPress={()=>navigate('AnnouncementInfoPage',announcement)} style={{flex:1,flexDirection:'row',alignItems:'center'}}>
						<Text style={{fontSize:16,fontWeight:'bold'}}>{announcement.theme}</Text>
						<Text style={{fontSize:12,color:'#666'}}>{`      ${formatDate(announcement.time)}`}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>OAStore.deleteAnnouncement({_id:announcement._id})}>
						<Image source={require('../../resource/del.png')} style={{width:pxToDp(30),height:pxToDp(30)}}/>
					</TouchableOpacity>
				</View>
			)
		});
		return announcementList;
	}
	render(){
		return(
			<ScrollView style={{flex:1,paddingTop:pxToDp(40)}}>
				{this.renderAnnouncementList()}
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


export default wrapComponent(AnnouncementList, [OAStore.announcementList]);

