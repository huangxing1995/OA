import {host} from "../config";

export function login(user) { //{um,psw}
	return new Promise((resolve, reject)=>{
		fetch(host + '/api/login',{
			method: 'POST',
			headers: {
				"Content-type":"application/json",
				// "Authorization":`Bearer ${token}`
			},
			body: JSON.stringify(user)
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