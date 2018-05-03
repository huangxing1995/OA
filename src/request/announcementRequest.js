import {host} from '../config'

export function fetchAnnouncementList() { // {result:[]}
	return new Promise((resolve, reject) => {
		fetch(host + '/api/announcement/show',
			// {
			// mode:'cors'
			// }
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
				alert(err)
				reject(err);
			})
		
	})
}
// export function filterUser(key) { // {result:[]}
// 	return new Promise((resolve, reject) => {
// 		fetch('http://localhost:7001/api/user/filter',{
// 			method: 'POST',
// 			headers: {
// 				"Content-type":"application/json"
// 			},
// 			body: JSON.stringify({key})
// 		})
// 			.then((res)=>{
// 				return res.json() // res.text()是一个Promise对象
// 			})
// 			.then((res)=>{
// 				console.log(res); // res是最终的结果
// 				resolve(res)
// 			})
// 			.catch(err => {
// 				console.log(err);
//
// 				reject(err);
// 			})
//
// 	})
// }

export function addAnnouncement(info) { // {}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/announcement/create',{
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

export function deleteAnnouncement(info) { // {_id}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/announcement/delete',{
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

export function updateAnnouncement(info) { //{_id,newInfo:{}}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/announcement/update',{
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