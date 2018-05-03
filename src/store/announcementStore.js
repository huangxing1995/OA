import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'

import {fetchAnnouncementList,addAnnouncement,deleteAnnouncement,updateAnnouncement} from '../request/announcementRequest'
import sortString from '../util/sortString'

export default class positionStore extends Store{
	
	static StateKeys = {
		init: 'announcementList',
	};
	
	constructor(options){
		super(options);
		this.initState({
			announcementList:[],
			}
		);
	}
	
	init(){
		fetchAnnouncementList()
			.then((res)=>{
				this.init.dispatch(res.result.sort(sortString))
			})
			.catch((err)=>{
				console.log(err)
				
			})
	}
	addAnnouncement = (announcementInfo)=>{
		addAnnouncement(announcementInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('addAnnouncement success')
			}
			else alert('addAnnouncement failed')
		})
	};
	deleteAnnouncement = (announcementInfo)=> {
		deleteAnnouncement(announcementInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('deleteAnnouncement success')
			}
			else alert('deleteAnnouncement failed')
		})
	};
	updateAnnouncement = (announcementInfo) => {
		updateAnnouncement(announcementInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('updateAnnouncement success')
			}
			else alert('updateAnnouncement failed')
		})
	}
}

