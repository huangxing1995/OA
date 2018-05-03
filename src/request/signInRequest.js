import {host,} from '../config'


export function showSignInList(info) { // {employeeUm:um}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/signIn/show',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				"Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(info)
		})
			.then((res)=>res.json())
			.then(res=>{
				// console.log('**********************************')
				// console.log(res);
				resolve(res)
			})
			.catch(err=>{
				console.log(err)
				reject(err)
			})
	})
}

export function updateSignIn(info) { // {employeeUm:um,newInfo:[{date,isInRest,address,startTime,endTime}]}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/signIn/update',{
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
