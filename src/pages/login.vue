<template>
	<div class="login login-bg">
        <div class="logo-horizontal"></div>
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
      var data = {
        userName: this.userName,
        pwd: this.pwd,
        platform: checkSys(),
        deviceno: ""
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      if (!this.userName.trim()) {
        this.$message("账号不能为空");
      } else if (!this.pwd.trim()) {
        this.$message("密码不能为空");
      } else {
        let res = await getUser(enData);
        if (res.code === "0000") {
          let deData1 = strDec(res.data, "ZND20171030APIMM");
          let deData = JSON.parse(deData1);
          setItem("userInfo", deData);
          if (deData.changePwd === "0") {
            this.$router.push({ path: "/resetPassword" });
          } else {
            this.$router.push({ path: "/" });
          }
        } else {
          this.$message(res.msg);
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
  .logo {
    margin: 0 auto;
    width: rem(384px);
    height: rem(284px);
    background-image: url("../assets/logo.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    text-align: center;
    background-size: 100%;
    background-repeat: no-repeat;
    .logo-horizontal {
      margin-top: rem(89px);
      @include icon(rem(442px), rem(156px));
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
}
</style>
<style lang="scss">
@import "~@/assets/style/common.scss";
.login {
  .el-input__inner {
    border: 0;
    text-align: center;
    font-size: rem(24px);
    color: #999999;
  }
  .el-button {
    width: 100%;
    margin-top: rem(74px);
    height: rem(82px);
    font-size: rem(30px);
  }
}
</style>
