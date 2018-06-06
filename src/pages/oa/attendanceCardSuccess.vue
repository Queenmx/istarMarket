<template>
    <div class="rooterEle attendanceCardSuccess">
        <v-header title="打卡"></v-header>
        <div class="container">
            <div class="card-group">
                <div class="icon-wrap">
                    <i class="icon-success"></i>
                </div>
                <p class="hint">上班打卡成功</p>
            </div>
            <div class="info-group-wrap">
            <div class="info-group">
                <p class="flex info">
                    <span class="rest">时间</span>
                    <span>{{time}}</span>
                </p>
                <p class="flex info">
                    <span class="rest">位置</span>
                    <span>{{business}}</span>
                </p>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import { formateTime } from "@/util/util";
export default {
  data() {
    return {
      time: this.$route.query.time,
      business: this.$route.query.business
    };
  }
};
</script>

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
  .icon-wrap {
    padding-top: rem(100px);
    padding-bottom: rem(36px);
  }
  .icon-success {
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

