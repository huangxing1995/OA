import {host,} from '../config'


export function createApprove(info) { // {employeeUm,type,destination,reason,startTime,endTime,approverUm:[[{um,opt,remark}]]}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/approve/create',{
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

export function updateApprove(info) { // {_id,um,opt,remark,approverUm:[[]],currentApproverUm:[]}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/approve/update',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(info)
		})
			.then((res)=>res.json())
			.then(res=>{
				console.log(res);
				resolve(res)
			})
			.catch(err=>{
				console.log(err)
				reject(err)
			})
	})
}

export function deleteApprove(info) { // {_id}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/approve/delete',{
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




export function findMyApprove(search) { // {um}
	// console.info('token in fetch '+ token)
	return new Promise((resolve, reject)=>{
		fetch(host +  '/api/approve/findMyApprove',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(search)
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

export function waitMyApprove(search) { // {um}
	// console.log(search)
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/approve/waitMyApprove',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(search)
		})
			.then((res)=>res.json())
			.then(res=>{
				// console.log(res);
				resolve(res)
			})
			.catch(err=>{
				// console.log(err)
				reject(err)
			})
	})
}

