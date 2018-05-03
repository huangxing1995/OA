import React, {Component} from 'react'
import WeeklyReport from './WeeklyReport'



export default class  extends Component{
	static navigationOptions = ({navigation}) => ({
		headerTitle: '周报',
	});
	
	
	constructor(props){
		super(props);
	}
	render() {
		let {navigate} = this.props.navigation;
		return (
			<WeeklyReport
				navigate={(page, param) => navigate(page, param)}
			/>
		);
	}
}
