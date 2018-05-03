import React,{Component} from 'react'
import {View,Image,StyleSheet,TouchableOpacity} from 'react-native'
import {pxToDp} from '../util'

export default class BackToTop extends Component{
  render(){
    return(
      <View style={styles.wrapper}>
        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.backToTop()}>
          <Image source={require('../resource/back2top.png')} style={{width:pxToDp(80),height:pxToDp(80)}}/>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper:{
    width:pxToDp(80),
    height:pxToDp(80),
    position:'absolute',
    bottom:pxToDp(100),
    right:pxToDp(20),
    // backgroundColor:'#ff0000'
  }
});
