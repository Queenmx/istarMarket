<template>
  <div class="fail">
      <div class="wrap icon-wrap">
      <i class="el-icon-error"></i>
      </div>
      <div class="msg"><span>提交失败</span></div>
      <div class="wrap flex">
          <div @click="goOrder">
          <el-button type="primary" plain>订单详情</el-button>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  methods: {
    goIndex() {
      this.$router.push({ path: "/" });
    },
    goOrder() {
      this.$message("升级中");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
.fail {
  .flex {
    justify-content: center;
  }
  .first {
    margin-right: rem(50px);
  }
  .msg {
    margin-bottom: rem(50px);
    font-size: rem(32px);
    color: #c0baba;
    text-align: center;
  }
  .icon-wrap {
    margin-top: rem(200px);
    padding-bottom: rem(50px);
    text-align: center;
    .el-icon-error {
      color: #409eff;
      font-size: rem(150px);
    }
  }
}
</style>
