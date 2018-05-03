import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'

import {fetchDepartmentList, addDepartment, deleteDepartment, updateDepartment} from '../request/departmentRequest'
import {sortByName} from '../util/sortString'

export default class departmentStore extends Store{
	
	static StateKeys = {
		init: 'departmentList',
	};
	constructor(options){
		super(options);
		this.initState({
			departmentList:[],
			}
		);
	}

	init(){
		fetchDepartmentList()
			.then((res)=>{
					this.init.dispatch(res.result.sort(sortByName))
			})
			// .then(newResult=>{
			// 	debugger
			// 	this.init.dispatch(newResult.sort(sortByName))
			// })
			.catch((err)=>{
				console.log(err)
			})
	}
	
	addDepartment = (departmentInfo)=>{
		addDepartment(departmentInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('addDepartment success')
			}
			else alert('addDepartment failed')
		})
	};
	deleteDepartment = (departmentInfo)=> {
		deleteDepartment(departmentInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('deleteDepartment success')
			}
			else alert('deleteDepartment failed')
		})
	};
	updateDepartment = (departmentInfo) => {
		updateDepartment(departmentInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('updateDepartment success')
			}
			else alert('updateDepartment failed')
		})
	}
}

