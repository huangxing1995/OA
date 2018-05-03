import {host,} from '../config'

export function fetchDepartmentList() { // {result:[]}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/department/show',{
			headers:{
				"Authorization":`Bearer ${token}`
			}
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

export function addDepartment(info) { // {}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/department/create',{
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

export function deleteDepartment(info) { // {_id}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/department/delete',{
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

export function updateDepartment(info) { //{_id,newInfo:{}}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/department/update',{
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


export async function findDepartmentBy(search) { //key:v
	let res = await fetch('http://localhost:7001/api/department/findBy',{
		method: 'POST',
		headers: {
			"Content-type":"application/json",
			"Authorization":`Bearer ${token}`
		},
		body: JSON.stringify(search)
	})
		.then((res)=>res.json());
	
	return res.result;
}
