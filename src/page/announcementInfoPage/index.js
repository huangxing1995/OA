
import React, {Component} from 'react'
import AnnouncementInfo from './AnnouncementInfo'

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '公告详情',
		gesturesEnabled:true,
	})
	
	
	render(){
		let {goBack,state} = this.props.navigation;
		let announcementInfo = state.params;
		return(
			<AnnouncementInfo
				announcementInfo={announcementInfo}
				goBack={()=>goBack()}/>
		)
	}
}