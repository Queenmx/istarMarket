<template>
    <div class="rooterEle unselectApartment">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">考勤参与部门</p>
        </v-header>
        <ul>
            <li class="wrap flex item">
                <p><i class="el-icon-circle-check active"></i></p>
                <p class="rest"><span>上海星融金服投...理有限公司（6人）</span></p>
                <p class="link">
                    <i class="tree"></i>
                    <span>下级</span>
                </p>
            </li>
        </ul>
        <!-- <div class="wrap footer-btn flex">
            <p class="all-check">
                <i class="el-icon-circle-check active"></i>
                <span>全选</span>
            </p>
            <p class="rest">1个部门（含子部门）</p>
            <p  class="btn-red">
               确定（0/500）
            </p>
        </div> -->
        <footer2></footer2>
    </div>
</template>
<script>
import footer2 from "../../components/footer2";
export default {
  components: {
    footer2
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.unselectApartment {
  .el-icon-circle-check {
    font-size: rem(42px);
    color: #d7d4d4;
    &.active {
      color: $blue;
    }
  }
  .item {
    height: rem(149px);
    font-size: rem(32px);
    color: $black;
    background: #fff;
    border-bottom: 1px solid $bdcolor;
    .el-icon-circle-check {
      margin-right: rem(31px);
    }
    .tree {
      @include icon(rem(28px),rem(28px));
      vertical-align: middle;
      background-image: url("../../assets/images/tree-blue.png");
    }
    .link {
      font-size: rem(24px);
    }
  }
  .footer-btn {
    font-size: rem(28px);
    color: #646464;
    background: #fff;
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
}
</style>

