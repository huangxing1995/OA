import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'

import {fetchUserList,deleteUser,addUser,updateUser,filterUser,findUserByUm} from '../request/userRequest'
import sortString from '../util/sortString'

export default class userStore extends Store{

  static StateKeys = {
    init: 'userList',
  };

  constructor(options){
    super(options);
    this.initState({
      userList:[],
      }
    );
  }

  init(){
	  fetchUserList()
		  .then((res)=>{
			  this.init.dispatch(res.result.sort(sortString))
		  })
		  .catch((err)=>{
	  	  console.log(err)
			  
	  })
  }
	filterUserList(key){
	  filterUser(key)
		  .then((res)=>{
			  this.init.dispatch(res.result.sort(sortString))
		  })
		  .catch((err)=>{
			  console.log(err)
		  })
  }
	addUser = (userInfo)=>{
		addUser(userInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('add success')
			}
			else alert('add failed')
		})
	};
	deleteUser = (userInfo)=> {
		deleteUser(userInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('delete success')
			}
			else alert('delete failed')
		})
	};
	updateUser = (userInfo) => {
		updateUser(userInfo).then(res=>{
			if(res.success) {
				this.init();
				alert('update success')
			}
			else alert('update failed')
		})
	}
}

