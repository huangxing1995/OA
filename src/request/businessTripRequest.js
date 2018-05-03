import {host,} from '../config'


export function createBT(info) { // {employeeUm,destination,reason,startTime,endTime,approverUm:[]}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/businessTrip/create',{
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

export function updateBT(info) { // {um,approverUm,_id,opt,rejectReason}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/businessTrip/update',{
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



export function deleteBT(info) { // {_id}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/businessTrip/delete',{
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



