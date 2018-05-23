<template>
  <div class="rooterEle apartmentMember">
      <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">参与考勤员工</p>
        </v-header>
      <select-member-list :isAll="isAll"  @selectAll="selectAll"></select-member-list>
      <footer2 :isAll="isAll"></footer2>
  </div>
</template>
<script>
import selectMemberList from "../../components/selectMemberList";
import footer2 from "../../components/footer2";
export default {
  data() {
    return {
      isAll: false
    };
  },
  components: {
    selectMemberList,
    footer2
  },
  methods: {
    selectAll() {
      this.isAll = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.apartmentMember {
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


