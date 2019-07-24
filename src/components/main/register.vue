<template>
  <div id="login">
    <div class="login_box">
      <form autocomplete="off" @submit.prevent="onSubmit">
        <p>
          <label>
            <span>昵称:</span>
            <input nickname="nickname" placeholder="请输入昵称" v-model="nickname" />
          </label>
        </p>
        <p>
          <label>
            <span>账号:</span>
            <input name="username" placeholder="请输入账号" v-model="username" />
          </label>
        </p>
        <p>
          <label>
            <span>密码:</span>
            <input name="password" placeholder="请输入密码" v-model="password" />
          </label>
        </p>
        <p>
          <button @click="register">注册</button>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      nickname:[],
      username:[],
      password:[],

    };
  },
  methods: {
    register() {
      // temp.name=this.nickname;
      // var temp = {
      //   id: 2,
      //   username: "abc1234",
      //   password: "123456",
      //   avatar:"https://res.bestcake.com/m-images/icon_list/65092913426604280.jpg",
      //   name: "小明",
      // };
      var temp = {
        id: 2,
        username: this.username,
        password: this.password,
        avatar:"https://img2.woyaogexing.com/2019/07/23/7036452eb98442a6b1b32f048c393f51!400x400.jpeg",
        name: this.nickname,
      };
      // console.log(temp);
      this.$apis.register(temp).then(res => {
        console.log(res);

        if(res.data.code==3){
            this.$router.push("/login");
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