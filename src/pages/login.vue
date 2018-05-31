<template>
	<div class="login login-bg">
        <div class="logo-wrap">
            <div class="logo-horizontal"></div>
        </div>
        <form class="form">
            <ul class="loginBox">
                <li class="item">
                    <input type="text" placeholder="请输入登录账号" v-model="userName">
                </li>
                <li class="item flex">
                    <div class="rest">
                        <input type="password" placeholder="请输入密码" v-model="pwd">
                    </div>
                    <div>
                        <i class="icon-eye-close"></i>
                    </div>
                </li>
            </ul>
            <div class="btn btn-blue-lg" @click="login"><span>登录</span></div>
        </form>
	</div>
</template>
<script>
import { getUser } from "@/util/axios.js";
import { setItem, checkSys } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      userName: "",
      pwd: ""
    };
  },
  methods: {
    async login() {
      let data = {
        userName: this.userName,
        pwd: this.pwd,
        platform: checkSys(),
        deviceno: ""
      };
      if (!this.userName.trim()) {
        this.$toast("账号不能为空");
      } else if (!this.pwd.trim()) {
        this.$toast("密码不能为空");
      } else {
        let res = await getUser(data);
        if (res.code === "0000") {
          setItem("userInfo", res.data);
          if (res.data.changePwd === "0") {
            this.$router.push({ path: "/resetPassword" });
          } else {
            this.$router.push({ path: "/" });
          }
        } else {
          this.$toast(res.msg);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.login {
  position: relative;
  height: 100%;
  background-size: 100%;
  .logo-horizontal {
    margin-top: rem(89px);
    @include icon(rem(442px), rem(156px));
  }
  .logo-wrap {
    text-align: center;
  }
  .form {
    position: absolute;
    top: rem(385px);
    left: rem(24px);
    bottom: 0;
    right: rem(24px);
    .btn {
      margin-top: rem(106px);
    }
  }
  .item {
    padding-top: rem(26px);
    padding-bottom: rem(32px);
    color: #f8f9fe;
    font-size: rem(30px);
    letter-spacing: rem(-0.72px);
    border-bottom: rem(1px) solid #eeeeee;
  }
  input {
    color: #f8f9fe;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
    text-indent: 5px;
  }
  input::-webkit-input-placeholder {
    color: #f8f9fe;
  }
  .icon-eye-close {
    position: relative;
    top: rem(14px);
    vertical-align: bottom;
    @include icon(rem(30px), rem(30px));
  }
}
</style>
