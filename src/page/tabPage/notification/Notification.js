import React, {Component} from 'react'
import {
	Image,
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
} from 'react-native'
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view'

import {wrapComponent} from 'react-eflow'
import Todo from './Todo'
import History from './History'
import OAStore from '../../../store'
import pxToDp from "../../../util/pxToDp";


class Notification extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){
		console.log('******************** notif page *******************')
		OAStore.findMyApproveList();
		OAStore.waitMyApproveList();
		
	}
	render(){
		let {findMyApproveList,waitMyApproveList} = this.props;
		// let {filterUnDone} = this.props;
		// if (filterUnDone){
		// 	findMyApproveList = findMyApproveList.filter(item=>item.approveStatus === 'D')
		// }
		let {navigate, goBack} = this.props;
		return(
			<View style={styles.wrapper}>
				<ScrollableTabView
					renderTabBar={()=>(<DefaultTabBar/>)}
					tabBarPosition={'top'}
					onchangetab={(obj)=> console.log(obj.i)}
					initialPage={0}
					tabBarUnderlineStyle={{backgroundColor:"#2f87e0"}}
					tabBarBackgroundColor={'#fff'}
					tabBarActiveTextColor={'#2f87e0'}
					tabBarInActiveTextColor={'#ccc'}
					locked={false}
				>
					<Todo
						tabLabel={'待办'}
						key={'todo'}
						approveList={waitMyApproveList.filter(item=>item.approveStatus !== 'N')}
						navigate={(page, param) => navigate(page, param)}
						goBack={()=>goBack()}
						onRefresh={()=>{OAStore.findMyApproveList();OAStore.waitMyApproveList();}}
					/>
					<History
						tabLabel={'历史'}
						key={'history'}
						approveList={findMyApproveList}
						navigate={(page, param) => navigate(page, param)}
						goBack={()=>goBack()}
						onRefresh={()=>{OAStore.findMyApproveList();OAStore.waitMyApproveList();}}
					/>
				</ScrollableTabView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper:{
		flex:1,
		backgroundColor:'#f0f0f0'
	},
});

export default wrapComponent(Notification, [
	OAStore.findMyApproveList,
	OAStore.waitMyApproveList,
])