import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {pxToDp} from '../util'

export default class TabBar extends Component{

  constructor(props){
    super(props)
  }

  renderTabOption(tabName, index){
    const color = this.props.activeTab == index ? "#38adff" : "#cccccc";
    return (
      <TouchableOpacity onPress={()=>this.props.goToPage(index)} style={styles.tab} key={index}>
        <View style={styles.tabItem}>
          <Text style={{color: color,fontSize:16}}>
            {tabName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render(){
    return(
      <View style={styles.tabs}>
        {this.props.tabNames.map((tabName, index) => this.renderTabOption(tabName, index))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',  //TODO:作用类似display：inline-block
    backgroundColor: '#ffffff'
  },

  tab: {
    flex: 1, //TODO:作用撑满父容器
    justifyContent: 'center',
    alignItems: 'center',
    height: pxToDp(80),
  },

});