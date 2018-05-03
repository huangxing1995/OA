import React, {Component} from 'react'
import DepartmentInfo from './DepartmentInfo'

export default class extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '部门详情',
	})
	
	
	render(){
		let {goBack,state,navigate} = this.props.navigation;
		let departmentInfo = state.params;
		return(
			<DepartmentInfo
				navigate={(page, param) => navigate(page, param)}
				departmentInfo={departmentInfo}
				goBack={()=>goBack()}/>
		)
	}
}