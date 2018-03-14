<template>
  <div class="rooterEle2 addStaff">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">添加员工</p>
        </v-header>
      <ul>
        <li>
              <split></split>
              <div class="wrap flex item" @click="select">
                  <div class="lable">部门</div>
                    <div class="middle"></div>
                     <div class="middle">{{this.$route.query.deptName}}</div>
                    <div class="rest">
                        <i class="el-icon-arrow-right"></i>
                    </div>
              </div>
              
          </li>
          <li>
              <split></split>
              <div class="wrap flex item">
                <div class="lable">账号</div>
                <div class="input-wrap">
                    <input type="text" placeholder="请填写账号" v-model="userName">
                </div>
              </div>
              <div class="wrap flex item">
                <div class="lable">姓名</div>
                <div class="input-wrap">
                    <input type="text" placeholder="请填写姓名" v-model="realName">
                </div>
              </div>
              
              
          </li>
          
          <div class="wrap flex item">
                <div class="lable">登录密码</div>
                <div class="input-wrap">
                    <input type="text" placeholder="登录密码" v-model="pwd">
                </div>
              </div>
              <!-- <div class="wrap flex item">
                <div class="lable">确认密码</div>
                <div class="input-wrap">
                    <input type="text" placeholder="确认密码" v-model="conpwd">
                </div>
              </div> -->
      </ul>
      <div class="wrap btn-wrap">
            <p class="btn" @click="submit">确定</p>
        </div>
  </div>
</template>
<script>
import { oaAddStaff } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
export default {
  data() {
    return {
      deptId: "",
      realName: "",
      pwd: "",
      userName: ""

    };
  },

  methods: {
    select() {
      // localStorage.removeItem('department')
      // console.log(localStorage)
      this.$router.push({ path: "/oaSystem/selectApartment" });
    },
    async submit() {
      getItem("userinfo");
      // getItem("department");
      let userinfo = JSON.parse(localStorage.userInfo);
      // let department = JSON.parse(localStorage.department);
      console.log(this.$route.query);
      var data = {
        realName: this.realName,
        pwd: this.pwd,
        userName: this.userName,
        companyId: userinfo.companyId,
        // deptId: department.deptId
        deptId:this.$route.query.deptId
      };
      
      if (!this.$route.query.deptId) {
        this.$message("没有添加部门");
      } else if (!this.userName.trim()) {
        this.$message("账号不能为空");
      } else if (!this.realName.trim()) {
        this.$message("用户名不能为空");
      } else if (!this.pwd.trim()) {
        this.$message("密码不能为空");
      } else {
        let res = await oaAddStaff(data);
        if (res.code === "0000") {
            // console.log(res.data);
          this.$message("添加成功");
          this.$router.push("/oaSystem/staffManagement");
        } else {
          this.$message(res.msg);
        }
      }
    },
    // beforeDestroy:function(){
    //   localStorage.removeItem('department')
    // }
  },
 
};
</script>

<style lang="scss">
@import "../../assets/style/common.scss";
.addStaff {
  .item {
    height: rem(98px);
    font-size: rem(32px);
    color: $black;
    background: #fff;
    border-bottom: 1px solid $bdcolor;
    .middle {
      margin-left: rem(70px);
    }
    .input-wrap {
      padding-left: rem(60px);
    }
    input {
      width: 100%;
      border: none;
    }
  }
  .el-dropdown {
    font-size: rem(32px);
  }
  .rest {
    text-align: right;
    color: #c8c8c8;
  }
  .btn {
    height: rem(98px);
    line-height: rem(98px);
    color: #fff;
    text-align: center;
    border-radius: 5px;
    background: $blue;
  }
  .btn-wrap {
    margin-top: rem(80px);
    font-size: rem(30px);
  }
}
.add-staff-menu {
  .el-dropdown-menu__item {
    font-size: rem(32px);
  }
}
</style>
