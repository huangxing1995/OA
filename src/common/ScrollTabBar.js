import React, {Component} from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {pxToDp} from '../util'

export default class ScrollTabBar extends Component{

  constructor(props){
    super(props)
  }

  renderOption(tabName, index){
    const color =  this.props.activeTab === index ? '#ffffff' : '#607890';
    return (
      <TouchableOpacity onPress={()=>this.props.goToPage(index)} key={index} style={styles.tab}>
        <Text style={{color,fontSize:16}}>{tabName}</Text>
      </TouchableOpacity>
    )
  }
  render(){
    return (
      <ScrollView style={styles.tabs} horizontal={true}>
        {this.props.tabNames.map((tabName,index)=>this.renderOption(tabName,index))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  tabs: {
    flex:1,
    backgroundColor: 'red',
    // backgroundColor: '#003048',
  },

  tab: {

  },
});