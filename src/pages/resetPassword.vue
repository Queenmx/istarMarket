<template>
	<div class="resetPassword">
        <form class="form">
            <ul class="loginBox">
                <li class="item flex">
                    <div>
                        <label>设置新密码</label>
                    </div>
                    <div class="rest input-wrap">
                        <input type="password" placeholder="请输入新密码" v-model="pwd1">
                    </div>
                </li>
                <li class="item flex">
                    <div>
                        <label>确认新密码</label>
                    </div>
                    <div class="rest input-wrap">
                        <input type="password" placeholder="请再次输入新密码" v-model="pwd2">
                    </div>
                </li>
            </ul>
            <div class="btn" @click="reset"><span>确定</span></div>
        </form>
	</div>
</template>
<script>
import { changePwd } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      userInfo: JSON.parse(getItem("userInfo")),
      pwd1: "",
      pwd2: ""
    };
  },
  methods: {
    async reset() {
      var self = this;
      var data = {
        userId: this.userInfo.userId,
        userName: this.userInfo.userName,
        oldPwd: "",
        newPwd: this.pwd1
      };
       var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      if (!this.pwd1.trim()) {
        this.$message("密码不能为空");
      } else if (this.pwd1 != this.pwd2) {
        this.$message("密码不一致");
      } else {
        let res = await changePwd(enData);
        if (res.code === "0000") {
        let deData1 = strDec(res.data,"ZND20171030APIMM");
        let deData = JSON.parse(deData1);
          this.$message({
            showClose: true,
            message: "修改密码成功",
            onClose: function() {
              self.$router.push({ path: "/" });
            }
          });
        } else {
          this.$message(res.msg);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.resetPassword {
  position: relative;
  height: 100%;
  .form {
    position: absolute;
    padding: rem(30px) rem(48px) rem(74px) rem(53px);
    left: 50%;
    top: rem(218px);
    transform: translateX(-50%);
    width: rem(610px);
    font-size: rem(26px);
    color: $black;
    box-shadow: 0 rem(14px) rem(29px) rgba($color: #ddd, $alpha: 0.75);
    border-radius: rem(10px);
    box-sizing: border-box;
    .btn {
      margin-top: rem(74px);
      height: rem(82px);
      line-height: rem(82px);
      text-align: center;
      font-size: rem(32px);
      color: #fff;
      background: $blue;
      border-radius: rem(10px);
    }
  }
  .item {
    height: rem(100px);
    border-bottom: 1px solid $bdcolor;
  }
  label {
    display: inline-block;
    width: rem(150px);
  }
  input {
    border: none;
  }
}
</style>
<style lang="scss">
@import "../assets/style/common.scss";
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
