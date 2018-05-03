import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'

import {fetchUserList,deleteUser,addUser,updateUser,filterUser,findUserBy} from '../request/userRequest'
import {fetchDepartmentList, addDepartment, deleteDepartment, updateDepartment} from '../request/departmentRequest'
import {fetchPositionList, addPosition, deletePosition, updatePosition} from '../request/positionRequest'
import {fetchAnnouncementList,addAnnouncement,deleteAnnouncement,updateAnnouncement} from '../request/announcementRequest'

import {createApprove, updateApprove, deleteApprove,findMyApprove, waitMyApprove} from '../request/approveRequest'

import {showSignInList, updateSignIn} from '../request/signInRequest'
import {fetchScheduleList, addSchedule, deleteSchedule, updateSchedule} from '../request/scheduleRequest'
import {createDemand, deleteDemand, updateDemand, aboutMyDemand} from '../request/demand'
import {fetchDailyReportList,fetchDailyGroupReports, addDailyReport, deleteDailyReport, updateDailyReporte} from '../request/dailyReportRequest'
import {fetchWeeklyReportList, fetchWeeklyGroupReports, addWeeklyReport, deleteWeeklyReport, updateWeeklyReporte} from '../request/weeklyReportRequest'

import sortString, {sortByName} from '../util/sortString'
import {host} from "../config";



class OAStoreClass extends Store{
	
	// static StateKeys = {
	// 	init: 'userList',
	// };
	
	constructor(options){
		super(options);
		this.initState({
			userList:[],
			
			departmentList:[],
			positionList:[],
			announcementList:[],
			
			signInList:[],
			scheduleList:[],
			demandList:[],
			
			dailyReportList:[],
			groupDailyReportList:[],
			weeklyReportList:[],
			groupWeeklyReportList:[],
			
			findMyApproveList:[],
			waitMyApproveList:[],
		});
	}
	init(){
		console.log('this is store init');
		this.findMyApproveList();
		this.waitMyApproveList();
		this.demandList();
		// this.groupDailyReportList();
		// this.groupWeeklyReportList();
	}
	// userInfo
	userInfo(){ //获取登录人的信息
		// console.log('********************** this is user info ***************************');
		fetch(host + '/api/userInfo',
			{
				headers:{
					"Authorization":`Bearer ${token}`
				}
			}
		)
			.then((res)=>{
				return res.json()
			})
			.then((res)=>{
				let um = res.payload.um;
				this.userInfo.dispatch({um})
			})
			.catch(err => {
				console.error(err);
			})
	}
	userCompletedInfo(){
		fetch(host + '/api/user/findBy',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
				
			},
			body: JSON.stringify({key:'um',value:this.userInfo.data().um})
		})
			.then((res)=>res.json())
			.then(res=>{
				// console.log(res);
				this.userCompletedInfo.dispatch(res.result[0])
			})
			.catch(err=>{
				console.error(err)
			})
	}
	// user
	userList(){
		fetchUserList()
			.then((res)=>{
				this.userList.dispatch(res.result.sort(sortString))
			})
			.catch((err)=>{
				console.log(err)
			})
	}
	filterUserList(key){
		filterUser(key)
			.then((res)=>{
				this.userList.dispatch(res.result.sort(sortString))
			})
			.catch((err)=>{
				console.log(err)
			})
	}
	addUser = (userInfo)=>{
		addUser(userInfo).then(res=>{
			if(res.success) {
				this.userList();
				console.log('add user success')
			}
			else console.log('add user failed')
		})
	};
	deleteUser = (userInfo)=> {
		deleteUser(userInfo).then(res=>{
			if(res.success) {
				this.userList();
				console.log('delete user success')
			}
			else console.log('delete user failed')
		})
	};
	updateUser = (userInfo) => {
		updateUser(userInfo).then(res=>{
			if(res.success) {
				this.userList();
				console.log('update user success')
			}
			else console.log('update user failed')
		})
	};
	// findUserBy = (key) => {
	// 	findUserBy(key)
	// 		.then((res)=>{
	// 			this.findUserBy.dispatch(res.result.sort(sortString))
	// 		})
	// 		.catch((err)=>{
	// 			console.log(err)
	// 		})
	// }
	// department
	departmentList(){
		fetchDepartmentList()
			.then((res)=>{
				this.departmentList.dispatch(res.result.sort(sortByName))
			})
			.catch((err)=>{
				console.log(err)
			})
	}
	addDepartment = (departmentInfo)=>{
		addDepartment(departmentInfo).then(res=>{
			if(res.success) {
				this.departmentList();
				console.log('add Department success')
			}
			else console.log('add Department failed')
		})
	};
	deleteDepartment = (departmentInfo)=> {
		deleteDepartment(departmentInfo).then(res=>{
			if(res.success) {
				this.departmentList();
				console.log('delete Department success')
			}
			else console.log('delete Department failed')
		})
	};
	updateDepartment = (departmentInfo) => {
		updateDepartment(departmentInfo).then(res=>{
			if(res.success) {
				this.departmentList();
				console.log('update Department success')
			}
			else console.log('update Department failed')
		})
	}
	// position
	positionList(){
		fetchPositionList()
			.then((res)=>{
				this.positionList.dispatch(res.result.sort(sortString))
			})
			.catch((err)=>{
				console.log(err)
				
			})
	}
	addPosition = (positionInfo)=>{
		addPosition(positionInfo).then(res=>{
			if(res.success) {
				this.positionList();
				console.log('add Position success')
			}
			else console.log('add Position failed')
		})
	};
	deletePosition = (positionInfo)=> {
		deletePosition(positionInfo).then(res=>{
			if(res.success) {
				this.positionList();
				console.log('delete Position success')
			}
			else console.log('delete Position failed')
		})
	};
	updatePosition = (positionInfo) => {
		updatePosition(positionInfo).then(res=>{
			if(res.success) {
				this.positionList();
				console.log('update Position success')
			}
			else console.log('update Position failed')
		})
	}
	// announcement
	announcementList(){
		fetchAnnouncementList()
			.then((res)=>{
				this.announcementList.dispatch(res.result.reverse())
			})
			.catch((err)=>{
				console.log(err)
				
			})
	}
	addAnnouncement = (announcementInfo)=>{
		addAnnouncement(announcementInfo).then(res=>{
			if(res.success) {
				this.announcementList();
				console.log('add Announcement success')
			}
			else console.log('add Announcement failed')
		})
	};
	deleteAnnouncement = (announcementInfo)=> {
		deleteAnnouncement(announcementInfo).then(res=>{
			if(res.success) {
				this.announcementList();
				console.log('delete Announcement success')
			}
			else console.log('delete Announcement failed')
		})
	};
	updateAnnouncement = (announcementInfo) => {
		updateAnnouncement(announcementInfo).then(res=>{
			if(res.success) {
				this.announcementList();
				console.log('update Announcement success')
			}
			else console.log('update Announcement failed')
		})
	};
	
	signInList(){
		showSignInList({employeeUm:this.userInfo.data().um})
			.then(res=>{
				// console.log(res)
				this.signInList.dispatch(res.result)
			})
			.catch(err=>console.error(err))
	}
	updateSignIn(newInfo){ // // {date,isInRest,address,startTime,endTime}
		updateSignIn({employeeUm:this.userInfo.data().um,newInfo})
			.then((res)=>{
				if (res.success){
					this.signInList();
				} else {
					console.error('upload sign info failed')
				}
			})
	}
	
	// Schedule
	scheduleList(){
		fetchScheduleList({employeeUm:this.userInfo.data().um})
			.then((res)=>{
				// console.log(res);
				this.scheduleList.dispatch(res.result.sort(sortString))
				// this.scheduleList.dispatch([])
			})
			.catch((err)=>{
				console.error(err)
			})
	}
	addSchedule = (date,scheduleInfo)=>{
		let employeeUm = this.userInfo.data().um;
		let data = this.scheduleList.data(); // 所有日程表
		let hasItem=null;
		data.forEach((item, i)=>{
			if (item.date === date) hasItem = item;
		});
		
		if (hasItem){
			let items = [].concat(hasItem.items);
			items.push(scheduleInfo)
			let newInfo = {
				employeeUm,
				date,
				items
			}
			updateSchedule({
				_id: hasItem._id,
				newInfo
			})
				.then(res=>{
					if(res.success) {
						this.scheduleList();
						console.log('push Schedule success')
					}
					else console.error('push Schedule failed')
				})
		} else {
			let items = []
			items.push(scheduleInfo);
			addSchedule({
				employeeUm,
				date,
				items
			})  //{employeeUm, date, items:[{startTime,endTime,todo}]
				.then(res=>{
					if(res.success) {
						this.scheduleList();
						console.log('add Schedule success')
					}
					else console.error('add Schedule failed')
				})
		}
	};
	deleteSchedule = (date, scheduleInfo, updateItemId)=> {
		let employeeUm = this.userInfo.data().um;
		let data = this.scheduleList.data(); // 所有日程表
		let oneDaySchedule=null;
		let items,pos;
		data.forEach((item)=>{ // 找到某天的日程表
			if (item.date === date) oneDaySchedule = item;
		});
		items = oneDaySchedule.items;
		
		if(oneDaySchedule){
			items.forEach((item,i)=>{ // 找到待删除索引
				if (item._id===updateItemId){
					pos = i;
				}
			});
			items.splice(pos,1);
			let newInfo = {
				employeeUm,
				date,
				items
			}
			updateSchedule({
				_id: oneDaySchedule._id,
				newInfo
			})
				.then(res=>{
					if(res.success) {
						this.scheduleList();
						console.log('delete Schedule success')
					}
					else console.error('delete Schedule failed')
				})
		}
	};
	updateSchedule = (date, scheduleInfo, updateItemId) => {
		let employeeUm = this.userInfo.data().um;
		let data = this.scheduleList.data(); // 所有日程表
		let oneDaySchedule=null;
		data.forEach((item, i)=>{
			if (item.date === date) oneDaySchedule = item;
		});
		if(oneDaySchedule){
			let items = oneDaySchedule.items;
			// let waitUpdateItem = null;
			items.forEach((item,i)=>{
				if (item._id===updateItemId){
					// waitUpdateItem = item
					item.startTime = scheduleInfo.startTime;
					item.endTime = scheduleInfo.endTime;
					item.todo = scheduleInfo.todo;
				}
			})
			let newInfo = {
				employeeUm,
				date,
				items
			}
			updateSchedule({
				_id: oneDaySchedule._id,
				newInfo
			})
				.then(res=>{
					if(res.success) {
						this.scheduleList();
						console.log('update Schedule success')
					}
					else console.error('update Schedule failed')
				})
		}
	}
	
	// demand
	demandList(){
		aboutMyDemand(this.userInfo.data()) //{um}
			.then((res)=>{
				this.demandList.dispatch(res.result.reverse())
			})
			.catch((err)=>{
				console.log(err)
			})
	}
	addDemand = (demandInfo)=>{ //{employeeUm,receiveUm,describe,deadTime,    //progress:[{percent,remark}],status}
		Object.assign(demandInfo,{employeeUm: this.userInfo.data().um});
		
		createDemand(demandInfo).then(res=>{
			if(res.success) {
				this.demandList();
				console.log('add demand success')
			}
			else console.log('add demand failed')
		})
	};
	deleteDemand = (demandId)=> { //{_id}
		deleteDemand(demandId).then(res=>{
			if(res.success) {
				this.demandList();
				console.log('delete demand success')
			}
			else console.log('delete demand failed')
		})
	};
	updateDemand = (demandInfo) => { // {_id,newInfo}
		updateDemand(demandInfo).then(res=>{
			if(res.success) {
				this.demandList();
				console.log('update demand success')
			}
			else console.log('update demand failed')
		})
	}
	
	// daily report
	dailyReportList(){
		fetchDailyReportList({employeeUm:this.userInfo.data().um})
			.then((res)=>{
				// console.log(res);
				this.dailyReportList.dispatch(res.result)
				// this.dailyReportList.dispatch([])
			})
			.catch((err)=>{
				console.error(err)
			})
	}
	groupDailyReportList(ums){
		fetchDailyGroupReports({employeeUm: ums})
			.then((res)=>{
				console.log(res.result);
				this.groupDailyReportList.dispatch(res.result)
			})
			.catch((err)=>{
				console.error(err)
			})
	}
	addDailyReport = (info)=>{ //{date,finished,unfinished,workHours}
		let employeeUm = this.userInfo.data().um;
		Object.assign(info, {employeeUm});
		addDailyReport(info).then(res=>{
			if(res.success) {
				this.dailyReportList();
				// this.groupDailyReportList();
				console.log('add daily report success')
			}
			else console.log('add daily report failed')
		})
	
	};
	deleteDailyReport = (reportId)=> { //{_id}
		deleteDailyReport(reportId).then(res=>{
			if(res.success) {
				this.dailyReportList();
				// this.groupDailyReportList();
				console.log('delete daily report success')
			}
			else console.log('delete daily report failed')
		})
	
	};
	updateDailyReporte = (info) => { //{_id,newInfo:{}} //{date,finished,unfinished,workHours}
		updateDailyReporte(info).then(res=>{
			if(res.success) {
				this.dailyReportList();
				// this.groupDailyReportList();
				console.log('update daily report success')
			}
			else console.log('update daily report failed')
		})
	}
	
	// Weekly report
	weeklyReportList(){
		fetchWeeklyReportList({employeeUm:this.userInfo.data().um})
			.then((res)=>{
				// console.log(res.result);
				this.weeklyReportList.dispatch(res.result)
				// this.weeklyReportList.dispatch([])
			})
			.catch((err)=>{
				console.error(err)
			})
	}
	groupWeeklyReportList(ums){
		fetchWeeklyGroupReports({employeeUm: ums})
			.then((res)=>{
				console.log(res.result);
				this.groupWeeklyReportList.dispatch(res.result)
			})
			.catch((err)=>{
				console.error(err)
			})
	}
	addWeeklyReport = (info)=>{ //{date:[],summary,goal}
		let employeeUm = this.userInfo.data().um;
		Object.assign(info, {employeeUm});
		addWeeklyReport(info).then(res=>{
			if(res.success) {
				this.weeklyReportList();
				// this.groupWeeklyReportList();
				console.log('add Weekly report success')
			}
			else console.log('add Weekly report failed')
		})
		
	};
	deleteWeeklyReport = (reportId)=> { //{_id}
		deleteWeeklyReport(reportId).then(res=>{
			if(res.success) {
				this.weeklyReportList();
				// this.groupWeeklyReportList();
				console.log('delete Weekly report success')
			}
			else console.log('delete Weekly report failed')
		})
		
	};
	updateWeeklyReporte = (info) => { //{_id,newInfo:{}} //{date,finished,unfinished,workHours}
		updateWeeklyReporte(info).then(res=>{
			if(res.success) {
				this.weeklyReportList();
				// this.groupWeeklyReportList();
				console.log('update Weekly report success')
			}
			else console.log('update Weekly report failed')
		})
	}
	
	
	
	
	
	// approve
	createApprove(info){ // {employeeUm,type,destination,reason,startTime,endTime,approverUm:[[{um,opt,remark}]]}
		createApprove(info).then(res=>{
			if(res.success) {
				this.findMyApproveList();
				this.waitMyApproveList();
				console.log('add approve success')
			}
			else console.log('add approve failed')
		})
	}
	updateApprove(params){ //{_id,um,opt,remark,approverUm:[[]],currentApproverUm:[]}
		updateApprove(params).then(res=>{
			if(res.success) {
				this.findMyApproveList();
				this.waitMyApproveList();
				console.log('update approve success')
			}
			else console.log('update approve failed')
		})
	}
	deleteApprove(key){ //{ _id}
		deleteApprove(key).then(res=>{
			if(res.success) {
				this.findMyApproveList();
				this.waitMyApproveList();
				console.log('delete approve success')
			}
			else console.log('delete approve failed')
		})
	}
	findMyApproveList(){// {um}
		let search = this.userInfo.data();
		findMyApprove(search)
			.then((res)=>{
				// console.log(res.result);
				// alert('ok')
				this.findMyApproveList.dispatch(res.result.reverse())
			})
			.catch((err)=>{
				console.log(err)
			})
	}
	waitMyApproveList(){ // {um}
		let search = this.userInfo.data();
		waitMyApprove(search)
			.then((res)=>{
				// console.log(res.result);
				// alert('ok')
				this.waitMyApproveList.dispatch(res.result.reverse())
			})
			.catch((err)=>{
				console.log(err)
			})
	}
}





let OAStore = new OAStoreClass();

export default OAStore;