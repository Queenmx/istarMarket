<template>
  <div class="sign">
      <div v-show="curIndex===0">
          <sign-in></sign-in>
      </div>
      <div v-show="curIndex===1">
          <history></history>
      </div>
      <div>
      <el-row class="sign_footer">
        <el-col :span="12" v-for="(item,index) in signData" :key="index">
            <div class="sign" @click="curIndex=index">
                <i :class="[{active:curIndex==index},item.class]"></i>
                <p :class="[{active:curIndex==index},'name']">{{item.text}}</p>
            </div>
        </el-col>
    </el-row>
      </div>
  </div>
</template>
<script>
import signIn from "./signIn";
import history from "./history";
export default {
  data() {
    return {
      curIndex: 0,
      signData: [
        { class: "icon-sign", text: "签到" },
        { class: "icon-history", text: "足迹" }
      ]
    };
  },
  components: {
    signIn,
    history
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.sign {
  .sign_footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: rem(100px);
    border-top: 1px solid #dedede;
    box-sizing: border-box;
    background-color: #fff;
    .sign {
      text-align: center;
    }
    .name {
      font-size: rem(24px);
      color: #969696;
      &.active {
        color: #53a6ff;
      }
    }
    .icon-sign {
      margin-top: rem(10px);
      @include icon(rem(33px),rem(45px));
      background-image: url("../../assets/images/sign.png");
      &.active {
        background-image: url("../../assets/images/sign-active.png");
      }
    }
    .icon-history {
      margin-top: rem(10px);
      @include icon(rem(33px),rem(45px));
      background-image: url("../../assets/images/history.png");
      &.active {
        background-image: url("../../assets/images/history-active.png");
      }
    }
  }
}
</style>

