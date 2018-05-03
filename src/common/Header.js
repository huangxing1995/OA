// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,Button
// } from 'react-native';
//
// import {pxToDp} from '../util'
//
//
// // const statusBarHeight = StatusBar.currentHeight;
//
// export default class Header extends Component {
//   render() {
//     return (
//       <View>
//         <StatusBar
//           barStyle={'light-content'}/>
//         <View style={styles.header}>
//           {/*<View><Text style={styles.txt}>{this.props.left}</Text></View>*/}
//           {/*<View><Text style={styles.txt}>{this.props.title}</Text></View>*/}
//           <View>
//             <Button
//             title={"去个人中心"}
//             onPress={()=>alert(123)}/></View>
//           </View>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   header:{
//     paddingTop:pxToDp(50),
//     height:pxToDp(80),
//     flexDirection:'row',
//     justifyContent:'space-between',
//     alignItems:'center',
//     backgroundColor:'#003048',
//     borderBottomColor:'red',
//
//   },
//   left:{
//
//   },
//   right:{
//
//   },
//   txt:{
//     color: 'white',
//     fontSize:20
//   }
// })