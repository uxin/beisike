import request from "./http";
import mock from "@/mock/index"

class Apis {
    // 首页数据
    getIndexData() {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": "1562765144584",
                "c": "NewIndexController",
                "m": "index"
            }
        });
    }

    getNsCakeCenter() {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": "1563249470561",
                "c": "NsCakeCenter",
                "m": "GetJdListNew"
            }
        });
    }

    getShowData(params) {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params
        });
    }

    register(data){
        return mock.post("/register",{data})
    }

    login(data) {
        return mock.get("/login", { params:data })
    }
}
export default new Apis();