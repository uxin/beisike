import { UsersData } from './data/userInfo'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';  //拦截

let mock = new MockAdapter(axios);  //初始化拦截对象

// 模拟get请求
mock.onGet("/login").reply((config) => {
	// 账号不存在 -1
	// 密码错误   -2
	// 登入成功    2
	// 注册成功    3
	let loginInfo = config.params;
	for (var i = 0; i < UsersData.length; i++) {
		if (UsersData[i].username === loginInfo.username) {
			if (UsersData[i].username === loginInfo.username & UsersData[i].password === loginInfo.password) {
				return [200, { msg: "登入成功", code: "2", loginInfo: UsersData[i] }];
			} else {
				return [200, { msg: "密码错误", code: "-2" }];
			}
		}
	}
	return [200, { msg: "该账号不存在", code: "-1" }];
})

mock.onPost("/register").reply((config) => {
	let registerInfo = JSON.parse(config.data).data;
	UsersData.push(registerInfo)
	return [200, { msg: "注册成功", code: "3" }];
})
export default axios;  //暴露axios






// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter';
// import {UsersData} from './data/userInfo'

// let mock = new MockAdapter(axios);

// mock.onGet('/login').reply(config => {
// 	console.log(config)
// 	console.log(UsersData[0])
// 	// 做一个数据效验
// 	var data={
// 				code: 200,
// 				msg: ''
// 			};

// 	if(false) {
// 			data.msg="登陆成功";
// 			data.code=200;
// 	}else{
// 			data.msg="账号或者密码错误";
// 			data.code=500
// 	}
// 	return [200,UsersData[0]];
// });

// mock.onPost('/test').reply(config => {
// 	console.log(config)
// 	console.log(UsersData[0])
// 	// 做一个数据效验
// 	var data={
// 				code: 200,
// 				msg: ''
// 			};

// 	if(false) {
// 			data.msg="登陆成功";
// 			data.code=200;

// 	}else{
// 			data.msg="账号或者密码错误";
// 			data.code=500
// 	}
// 	return [200,UsersData[0]];
// });

// // 例子
// /*
//  login(data){
//     return mock.post("/login",{
//       data: data
//     })
//   }
//    login(data){
//     return mock.get("/login",{
//       params: data
//     })
//   }
// */
// export default axios;	//注意暴露axios
