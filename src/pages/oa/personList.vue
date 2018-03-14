<template>
<div class="personList">
    <v-header>
        <i slot="left" class="el-icon-arrow-left"></i>
        <p slot="title">技术组</p>
        <router-link to="/oaSystem/personnel" slot="right">添加人员</router-link>
    </v-header>  
    <split></split>
    <select-member-list></select-member-list>
    <router-link to="/oaSystem/department">
        <el-button class="submit_btn" type="primary">确定</el-button>
    </router-link>
</div>
</template>
<script>
import selectMemberList from "../../components/selectMemberList";
export default {
  data() {
    return {};
  },
  components: {
    selectMemberList
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.personList {
  text-align: center;
  .submit_btn {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
}
</style>

