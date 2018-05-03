import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,StyleSheet,Dimensions} from 'react-native'
import pxToDp from "../util/pxToDp";

const WIDTH = Dimensions.get('window').width;

export default class Module extends Component{
	render(){
		let {navigate,options} = this.props;
		
		let content = this.props.options && this.props.options.map((option,i) => {
			return(
				<View style={styles.unit} key={i}>
					<TouchableOpacity onPress={()=>navigate(option.page)} style={{flex:1}}>
						<View style={{flex:1,justifyContent:'space-between',}}>
							<View style={{justifyContent:'center', alignItems:'center',}}>
								<Image
									style={{width: pxToDp(50),height: pxToDp(50)}}
									source={option.imgUrl}
								/>
							</View>
							<View style={{justifyContent:'center', alignItems:'center',}}>
								<Text style={{fontSize:12,color:"#333"}}>{option.name}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			)
		});
		while (content.length<4) {
			content.push((<View key={Math.random()} style={styles.unit}/>))
		}
		
		return(
			<View style={[{...this.props.style},styles.wrapper]}>
				<View style={styles.header}>
					<Text style={{fontSize:18,color:"#000",fontWeight:'bold'}}>{this.props.headerTitle&&this.props.headerTitle}</Text>
					<Text style={{fontSize:12,color:"#666"}}>{this.props.subTitle&&this.props.subTitle}</Text>
				</View>
				<View style={styles.body}>
					{content}
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	wrapper:{
		width: WIDTH,
		justifyContent:"center",
		borderColor:'#aaaaaa',
		borderBottomWidth:pxToDp(1),
		marginTop:pxToDp(50)
	},
	header:{
		height:pxToDp(60),
		flexDirection:'row',
		justifyContent:'flex-start',
		paddingLeft:pxToDp(30),
		alignItems:'center',
		// backgroundColor:'#ccc',
	},
	body:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		// borderColor:'#aaaaaa',
		// borderTopWidth:pxToDp(1),
	},
	unit:{
		justifyContent:'center',
		alignItems:'center',
		width: pxToDp(150),
		height: pxToDp(100)
	}
})