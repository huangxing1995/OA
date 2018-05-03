import React, {Component} from 'react'
import {Image,View,TouchableOpacity,Text,Button,ScrollView,Modal} from 'react-native'


export default class BottomModal extends Component{
	static defaultProps = {
		animationType: 'slide',
		visible: false,
		transparent: false,
	};
	
	constructor(props){
		super(props)
	}
	
	render(){
		return(
			<Modal
				animationType={this.props.animationType}
				transparent={this.props.transparent}
				visible={this.props.visible}
				// style={{...this.props.style}}
				// onRequestClose={() => {this._setModalVisible(false)}}
			>
				{this.props.children}
			</Modal>
		)
	}
}

