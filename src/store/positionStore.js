import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'

import {fetPositionList, addPosition, deletePosition, updatePosition} from '../request/positionRequest'
import sortString from '../util/sortString'

export default class positionStore extends Store{
	
	static StateKeys = {
		init: 'positionList',
	};
	
	constructor(options){
		super(options);
		this.initState({
			positionList:[],
			}
		);
	}
	
	init(){
		fetPositionList()
			.then((res)=>{
				this.init.dispatch(res.result.sort(sortString))
			})
			.catch((err)=>{
				console.log(err)
				
			})
	}
	addPosition = (positionInfo)=>{
		addPosition(positionInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('addPosition success')
			}
			else alert('addPosition failed')
		})
	};
	deletePosition = (positionInfo)=> {
		deletePosition(positionInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('deletePosition success')
			}
			else alert('deletePosition failed')
		})
	};
	updatePosition = (positionInfo) => {
		updatePosition(positionInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('updatePosition success')
			}
			else alert('updatePosition failed')
		})
	}
}

