<template>
  <div class="rooterEle attendanceApartment">
      <v-header class="wrap" :isBack="false" @leftEvent="cancel">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">考勤参与部门</p>
        </v-header>
      <ul v-if="departments.length">
          <li class="wrap flex item" @click="toggleDep(item)" v-for="item in departments" :key="item.deptId">
              <p><i class="el-icon-circle-check" :class="{'active':newSeletedDepartment[item.deptId]}"></i></p>
              <p class="title rest">{{item.deptName}}</p>
              <p class="right">
                  <span>{{item.num}}人</span>
                  <i class="el-icon-arrow-right"></i>
              </p>
          </li>
      </ul>
      <footer2 :backUrl="backUrl" :text="getLength+'个部门（含子部门）'" :isAll="isAll" @selectAll="seletedAll" @sure="sure"></footer2>
  </div>
</template>
<script>
import footer2 from "../../components/footer2";
import { oaQuery } from "@/util/axios";
import { getItem } from "@/util/util";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  props: ["seletedDepartment"],
  data() {
    return {
      userInfo: JSON.parse(getItem("userInfo")),
      backUrl: {},
      departments: [],
      length: 0,
      isAll: false,
      newSeletedDepartment: {}
    };
  },
  watch: {
    seletedDepartment: function() {
      this.newSeletedDepartment = JSON.parse(
        JSON.stringify(this.seletedDepartment)
      );
    }
  },
  components: {
    footer2
  },
  computed: {
    getLength() {
      let length =
        Object.getOwnPropertyNames(this.newSeletedDepartment).length - 1;
      if (length == this.departments.length) {
        this.isAll = true;
      } else {
        this.isAll = false;
      }
      return length;
    }
  },
  mounted() {
    console.log("777");
    this.initData();
  },
  methods: {
    async initData() {
      // for(let [key,val] in Object.entries(this.seletedDepartment)){
      //   this.$set(this.newSeletedDepartment,key,val)
      // }
      let data = {
        companyId: this.userInfo.companyId
      };
      data = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaQuery(data);
      console.log(res);
      res = JSON.parse(strDec(res, "ZND20171030APIMM"));
      if (res.code === "0000") {
        res.data.forEach(item => {
          if (item.status === 0) {
            this.departments.push({
              deptName: item.deptName,
              deptId: item.deptId,
              num: item.users.length
            });
          }
        });
      }
    },
    toggleDep(item) {
      let id = item.deptId;
      if (this.newSeletedDepartment[id]) {
        this.$delete(this.newSeletedDepartment, id);
      } else {
        this.$set(this.newSeletedDepartment, id, 1);
      }
      console.log(this.seletedDepartment);
    },
    seletedAll() {
      if (this.isAll) {
        this.newSeletedDepartment = {};
      } else {
        this.departments.forEach(item => {
          let id = item.deptId;
          if (!this.newSeletedDepartment[id]) {
            this.$set(this.newSeletedDepartment, id, 1);
          }
        });
      }
    },
    sure() {
      this.$emit("update:seletedDepartment", this.newSeletedDepartment);
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceApartment {
  padding-bottom: rem(100px);
  .el-icon-circle-check {
    font-size: rem(42px);
    color: #d7d4d4;
    &.active {
      color: $blue;
    }
  }
  .item {
    height: rem(150px);
    border-bottom: 1px solid $bdcolor;
    background: #fff;
    .title {
      padding: 0 rem(30px);
      font-size: rem(32px);
      color: $black;
    }
    .right {
      color: #969696;
      font-size: rem(30px);
      i {
        color: #c8c8c8;
      }
    }
  }
}
</style>

