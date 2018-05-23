<template>
    <div class="rooterEle selectedApartment">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">考勤参与部门</p>
            <p slot="right">确定</p>
        </v-header>
        <split></split>
        <div class="wrap flex info">
            <span class="rest">添加</span>
            <i class="el-icon-arrow-right"></i>
        </div>
        <split></split>
        <ul>
            <li class="wrap flex item">
                <i class="el-icon-circle-check"></i>
                <span class="rest">上海星融金服投...理有限公司（6人）</span>
                <i class="el-icon-circle-close"></i>
            </li>
        </ul>
        
    </div>
</template>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.selectedApartment {
  .item {
    height: rem(150px);
    font-size: rem(32px);
    color: $black;
    background: #fff;
    border-bottom: 1px solid $bdcolor;
    .el-icon-circle-check {
      margin-right: rem(31px);
      color: $blue;
      font-size: rem(42px);
    }
  }
  .info {
    height: rem(98px);
    font-size: rem(32px);
    color: #646464;
    background: #fff;
    border-bottom: 1px solid $bdcolor;
  }
  .el-icon-circle-close {
    color: #c8c8c8;
  }
}
</style>

