<template>
  <div id="login">
    <div class="login_box">
      <form autocomplete="off" @submit.prevent="onSubmit">
        <p>
          <label>
            <span>账号:</span>
            <input name="uname" placeholder="请输入账号" v-model="username" />
          </label>
        </p>
        <p>
          <label>
            <span>密码:</span>
            <input name="upwd" placeholder="请输入密码" v-model="password" />
          </label>
        </p>
        <p>
          <button @click="login">登录</button>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import { Toast,MessageBox } from 'mint-ui';  //提示框
import Store from "storejs";
export default {
  data(){
    return{
      username:[],
      password:[],
    }
  },
  methods: {
    // 账号不存在 -1
    // 密码错误   -2
    // 登入成功    2
    // 注册成功    3
    login() {
      this.$apis.login({ username: this.username, password:this.password  }).then(res => {
        // console.log(res.config.params);
        if(res.data.code=="-1"){
            MessageBox.confirm(res.data.msg+",是否立即注册").then((action)=>{
                this.$router.push("/register")
            }).catch(()=>{
                Toast("取消成功")
            })

        }else if(res.data.code=="-2"){
            Toast(res.data.msg);
        }else if(res.data.code=="2"){
            Store.set("userInfo",res.data.loginInfo)


            this.$router.push("/my")
            Toast(res.data.msg);
        }
      });
    },
    onSubmit(){return false;},
  }
};
</script>
<style scoped lang="scss">
#login {
  background: #36d1dc;
  width: 100%;
  height: 177.8667vw;
  padding-top: 13.3333vw;
  box-sizing: border-box;

  .login_box {
    width: 100%;
    height: 100%;
    form {
      p {
        &:nth-child(2) {
          margin: 2.6667vw 0;
        }
        button {
          width: 13vw;
          height: 8vw;
          background: #fff;
          border: 1px solid #000;
          font-size: 3.7333vw;
          margin-top: 2.6667vw;
        }
        label {
          span {
            display: inline-block;
            text-align: right;
            color: #000;
            font-size: 4.2667vw;
          }
          input {
            width: 42.6667vw;
            height: 6.4vw;
            background-color: #36d1dc;
            border: 1px solid #000;
            font-size: 3.7333vw;
            vertical-align: inherit;
            color: #000;
          }
          input:focus {
            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
              0 0 8px rgba(233, 102, 102, 0.6);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
              0 0 8px rgba(233, 102, 102, 0.6);
          }
        }
      }
    }
  }
}
</style>