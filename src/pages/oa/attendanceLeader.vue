<template>
  <div class="rooterEle attendanceLeader">
      <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">考勤组负责人</p>
        </v-header>
        <div class="wrap search">
            <input type="text" placeholder="请填写搜索人员">
        </div>
      <select-member-list></select-member-list>
      <footer2></footer2>
  </div>
</template>
<script>
import selectMemberList from "../../components/selectMemberList";
import footer2 from "../../components/footer2";
export default {
  components: {
    selectMemberList,
    footer2
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceLeader {
  .search {
    padding-top: rem(20px);
    padding-bottom: rem(20px);
    input {
      padding: rem(20px);
      width: 100%;
      font-size: rem(32px);
      border: none;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
}
</style>


