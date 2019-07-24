// 定义全局指令

export default (Vue) => {
    Vue.directive("test", (el, binding, vnode) => {
        el.onclick = function () {
            alert("ok")
        }
    })

    // 全局过滤器
    Vue.filter("fontlenght", function (val, num) {
        var str = "";
        if (val.length >= num) {
            str = val.slice(0, num) + "..."; //长度超过3就拼接字符串
        } else {
            str = val;
        }
        return str;
    })
}