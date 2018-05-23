<template>
  <div class="rooterEle addApartment">
       <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">添加部门</p>
        </v-header>
        <split></split>
        <ul>
            <li class="wrap flex item">
                <div>
                    <span>部门名称</span>
                </div>
                <div class="rest input-wrap">
                    <input type="text" placeholder="请填写部门名称" v-model="deptName">
                </div>
            </li>
            <li class="wrap flex item" @click="jump('leader')">
                <div>
                    <span>部门负责人</span>
                </div>
                <div class="rest">
                    <span>未设置</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </li>
            <li class="wrap flex item" @click="jump('staff')">
                <div>
                    <span>员工</span>
                </div>
                <div class="rest">
                    <span>未设置</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </li>
        </ul>
        <div class="wrap btn-wrap">
            <p class="btn" @click="submit">确定</p>
        </div>
  </div>
</template>
<script>
import { oaAddDepartment } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
export default {
  data(){
    return {
      deptName:"",
    }
  },
   mounted() {
    this.initData();
  },
  methods: {
    async initData(){
    },
    async submit() {
         getItem("userinfo");
      var userinfo=JSON.parse(localStorage.userInfo);
      var data = {
        deptName: this.deptName,
        companyId:userinfo.companyId,
      };
      if (!this.deptName.trim()) {
        this.$message("部门名称不能为空");
      }
       else {
        let res = await oaAddDepartment(data);
        if (res.code === "0000") {
        // this.$message(res.msg);
        this.$router.push('/oaSystem/staffManagement')
        } else {
          this.$message(res.msg);
        }
      }
    },
    jump(str) {
      if (str === "leader") {
        this.$router.push({ path: "/oaSystem/personnel" });
      } else if (str === "staff") {
        this.$router.push({ path: "/oaSystem/personnel" });
      }
    },
    // submit() {
    //   this.$router.push({ path: "/oaSystem/department" });
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.addApartment {
  font-size: rem(32px);
  color: #646464;
  .item {
    height: rem(98px);
    border-bottom: 1px solid $bdcolor;
    background: #fff;
  }
  .input-wrap {
    padding-left: rem(30px);
  }
  input {
    width: 100%;
    text-align: right;
    border: none;
  }
  .rest {
    color: #959595;
    text-align: right;
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
  }
}
</style>

