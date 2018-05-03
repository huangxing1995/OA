import {host, } from '../config'

export function fetchScheduleList(search) { // search:{employeeUm:um}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/schedule/show',{
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
				alert(err)
				reject(err);
			})
		
	})
}

export function addSchedule(info) { //{employeeUm, date, items:[{startTime,endTime,todo:''}]
	
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/schedule/create',{
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

export function deleteSchedule(info) { // {_id}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/schedule/delete',{
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

export function updateSchedule(info) { //{_id,newInfo:{}}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/schedule/update',{
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