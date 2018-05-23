<template>
    <div class="wrap footer2 footer-btn flex">
        <p class="all-check" @click="selectAll">
            <!-- <i class="el-icon-circle-check active"></i> -->
            <i :class="[{'active':isAll},'el-icon-circle-check']"></i>
            <span>全选</span>
        </p>
        <p class="rest">{{text}}</p>
        <p  class="btn-red" @click="sure">
            确定
        </p>
    </div>
</template>
<script>
export default {
  props: {
    isAll: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ""
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/oaSystem/addStaff", query: { deptName: 1 } });
    },
    sure() {
      this.$emit("sure");
    },
    selectAll() {
      this.$emit("selectAll");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
html {
  width: 100%;
  height: 100%;
}
.footer2 {
  margin-top: rem(100px);
  height: rem(100px);
  position: fixed;
  bottom: 0;
  left: 0;
  .el-icon-circle-check {
    font-size: rem(42px);
    color: #d7d4d4;
    &.active {
      color: $blue;
    }
  }
  &.footer-btn {
    font-size: rem(28px);
    color: #646464;
    background: #fff;
  }
  .all-check {
    font-size: rem(32px);
    color: #959595;
  }
  .btn-red {
    padding-top: 0;
    padding-bottom: 0;
    height: rem(60px);
    line-height: rem(60px);
    box-sizing: border-box;
  }
}
</style>
