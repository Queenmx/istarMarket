<template>
    <div class="rooterEle attendanceCardSuccess">
        <v-header title="打卡"></v-header>
        <div class="container">
            <div class="card-group">
                <i class="icon-success"></i>
                <p class="hint">上班打卡成功</p>
            </div>
            <div class="info-group-wrap">
            <div class="info-group">
                <p class="flex info">
                    <span class="rest">时间</span>
                    <span>9:20</span>
                </p>
                <p class="flex info">
                    <span class="rest">位置</span>
                    <span>深圳</span>
                </p>
            </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceCardSuccess {
  padding: rem(40px) rem(24px);
  padding-top: rem(124px);
  .container {
    height: 100%;
    text-align: center;
    background: #fff;
  }
  .icon-success {
    margin-top: rem(100px);
    margin-bottom: rem(36px);
    @include icon(rem(220px), rem(220px));
  }
  .hint {
    font-size: rem(32px);
    color: #ff8626;
  }
  .info-group-wrap {
    border-top: rem(1px) solid #eee;
  }
  .info-group {
    display: inline-block;
    width: rem(414px);
    font-size: rem(28px);
    color: #020202;
    text-align: left;

    .title {
      color: #333333;
    }
    .info {
      padding-top: rem(36px);
    }
  }
  .card-group {
    padding-bottom: rem(122px);
  }
}
</style>

