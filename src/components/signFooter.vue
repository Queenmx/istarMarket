<template>
<div>
    <el-row class="sign_footer">
        <el-col :span="12" v-for="(item,index) in signData" :key="index">
            <div class="sign" @click="go(index)">
                <i :class="[{active:activeIndex==index},item.class]"></i>
                <p :class="[{active:activeIndex==index},'name']">{{item.text}}</p>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import { oaSignIn } from "@/util/axios.js";
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      signData: [
        { class: "icon-sign", text: "签到", url: "/oaSystem/signIn" },
        { class: "icon-history", text: "足迹", url: "/oaSystem/history" }
      ]
    };
  },
  methods: {
    go(index) {
      //   if (index === 0) {
      //     let res = await oaSignIn(this.info);
      //     if (res.code === "0000") {
      //       this.$message("签到成功");
      //     } else {
      //       this.$message(res.msg);
      //     }
      //   }
      this.$router.push({ path: this.signData[index].url });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
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
    background-image: url("../assets/images/sign.png");
    &.active {
      background-image: url("../assets/images/sign-active.png");
    }
  }
  .icon-history {
    margin-top: rem(10px);
    @include icon(rem(33px),rem(45px));
    background-image: url("../assets/images/history.png");
    &.active {
      background-image: url("../assets/images/history-active.png");
    }
  }
}
</style>
