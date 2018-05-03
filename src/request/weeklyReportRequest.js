import {host, } from '../config'

export function fetchWeeklyReportList(search) { // search:{employeeUm:um}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/weeklyReport/show',{
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
export function fetchWeeklyGroupReports(ums){ //{employeeUm:[um1,um2,...]}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/weeklyReport/groupReports',{
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

export function addWeeklyReport(info) { //{employeeUm,date:[],summary,goal}
	
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/weeklyReport/create',{
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

export function deleteWeeklyReport(info) { // {_id}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/weeklyReport/delete',{
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

export function updateWeeklyReporte(info) { //{_id,newInfo:{}}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/weeklyReport/update',{
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