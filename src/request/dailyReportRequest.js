import {host, } from '../config'

export function fetchDailyReportList(search) { // search:{employeeUm:um}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/dailyReport/show',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(search)
		})
			.then((res)=>{
				return res.json()
			})
			.then((res)=>{
				// console.log(res);
				resolve(res)
			})
			.catch(err => {
				console.log(err);
				reject(err);
			})
		
	})
}
export function fetchDailyGroupReports(ums){ //{employeeUm:[um1,um2,...]}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/dailyReport/groupReports',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(ums)
		})
			.then((res)=>{
				return res.json()
			})
			.then((res)=>{
				// console.log(res);
				resolve(res)
			})
			.catch(err => {
				console.log(err);
				reject(err);
			})
		
	})
}

export function addDailyReport(info) { //{employeeUm,date,finished,unfinished,workHours}
	
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/dailyReport/create',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(info)
		})
			.then((res)=>res.json())
			.then(res=>{
				// console.log(res);
				resolve(res)
			})
			.catch(err=>{
				console.log(err)
				reject(err)
			})
	})
}

export function deleteDailyReport(info) { // {_id}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/dailyReport/delete',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(info)
		})
			.then((res)=>res.json())
			.then(res=>{
				// console.log(res);
				resolve(res)
			})
			.catch(err=>{
				console.log(err)
				reject(err)
			})
	})
}

export function updateDailyReporte(info) { //{_id,newInfo:{}}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/dailyReport/update',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(info)
		})
			.then((res)=>res.json())
			.then(res=>{
				// console.log(res);
				resolve(res)
			})
			.catch(err=>{
				console.error(err)
				reject(err)
			})
	})
}