import {host} from '../config'

export function fetchUserList() { // {result:[]}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/user/show',
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
				// console.log(res);
				resolve(res)
			})
			.catch(err => {
				console.log(err);
				reject(err);
			})
		
	})
}
export function filterUser(key) { // {result:[]}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/user/filter',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify({key})
		})
			.then((res)=>{
				return res.json() // res.text()是一个Promise对象
			})
			.then((res)=>{
				// console.log(res); // res是最终的结果
				resolve(res)
			})
			.catch(err => {
				console.log(err);
				
				reject(err);
			})
		
	})
}

export function addUser(info) { // {}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/user/create',{
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

export function deleteUser(info) { // {_id}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/user/delete',{
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

export function updateUser(info) { //{_id,newInfo:{}}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/user/update',{
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

export async function findUserBy(search) { //key:v  // return []
	let res = await fetch(host + '/api/user/findBy',{
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
