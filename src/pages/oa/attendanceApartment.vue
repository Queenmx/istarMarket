<template>
  <div class="rooterEle attendanceApartment">
      <v-header title="考勤参与部门"></v-header>
      <div class="wrap">
        <selectData :allData="allDept" :selectedData="selectDept" value="deptName" compareKey="deptId"></selectData>
      </div>
      <footer class="wrap flex footer" :class="[selectDept.length==allDept.length?'active':'']">
                <div class="rest">
                    <i :class="[selectDept.length==allDept.length?'icon-checked-circle-active':'icon-checked-circle']"></i>
                    <span>全选</span>
                </div>
                <div class="btn-wrap" @click="sure">
                    <span>确认({{selectDept.length}})</span>
                </div>
        </footer>
  </div>
</template>
<script>
import selectData from "../../components/selectData";
import { mapMutations } from "vuex";
import { oaQuery } from "@/util/axios";
import { getItem } from "@/util/util";
export default {
  props: ["seletedDepartment"],
  data() {
    return {
      userInfo: getItem("userInfo"),
      selectDept: this.$route.query.selectDept || [],
      allDept: [], //全部部门
      departments: []
    };
  },
  components: {
    selectData
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(["SET_INDEPTS"]),
    async initData() {
      let data = {
        companyId: this.userInfo.companyId
      };
      let res = await oaQuery(data);
      if (res.code === "0000") {
        this.allDept = res.data;
      }
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
      this.SET_INDEPTS(this.selectDept);
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceApartment {
  padding-bottom: rem(100px);
  font-size: rem(30px);
  color: #020202;
  background: #fff;
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: rem(100px);
    font-size: rem(30px);
    color: #999999;
    background: #fcfafa;
    border-top: rem(1px) solid #cccccc;
    .btn-wrap {
      color: #4d7bff;
      text-align: right;
      width: rem(120px);
    }
    &.active {
      color: #4d7bff;
    }
  }
  .icon-checked-circle,
  .icon-checked-circle-active {
    @include icon(rem(41px), rem(43px));
    vertical-align: middle;
  }
}
</style>

