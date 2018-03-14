<template>
  <div class="cardAlert" ref="cardAlert" v-if="isShow">
      <div class="mask" @click="close"></div>
      <div class="content">
          <div class="icon-wrap">
                <i class="el-icon-success"></i>
            </div>
            <p class="title">打卡成功</p>
            <div class="btn-wrap">
                <span class="btn">上班 {{startDate|formateTime}}</span>
            </div>
            <p class="text">奋斗才能赢得未来！</p>
            <p class="footer link" @click="close">我知道了</p>
      </div>
      
  </div>
</template>
<script>
export default {
  props: {
    startDate: {
      type: String
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  filters: {
    formateTime(str) {
      if (str) {
        return str.split(" ")[1];
      } else {
        return "缺卡";
      }
    }
  },
  methods: {
    close() {
      this.isShow = false;
    },
    open() {
      this.isShow = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
.cardAlert {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-top: rem(50px);
    width: rem(540px);
    text-align: center;
    background: #fff;
    border-radius: 5px;
    z-index: 10;
    .icon-wrap {
      margin-bottom: rem(21px);
    }
    .el-icon-success {
      font-size: rem(128px);
      color: $blue;
    }
    .title {
      margin-bottom: rem(61px);
      font-size: rem(36px);
      color: $black;
    }
    .btn-wrap {
      margin-bottom: rem(38px);
    }
    .btn {
      display: inline-block;
      width: rem(248px);
      height: rem(60px);
      line-height: rem(60px);
      color: #fff;
      background: #f94b4b;
      box-shadow: 0 2px 10px #f94b4b;
      border-radius: 5px;
    }
    .text {
      margin-bottom: rem(60px);
    }
    .footer {
      height: rem(100px);
      line-height: rem(100px);
      text-align: center;
      font-size: rem(32px);
      border-top: 1px solid $bdcolor;
    }
  }
}
</style>

