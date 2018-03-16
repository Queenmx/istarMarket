<template>
	<div class="rooterEle creditAuthorize">
		<v-header @rightEvent="history">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">授权</p>
			<p slot="right" class="link">历史记录</p>
		</v-header>
        <split></split>
		<div class="wrap input">
			<span class="lable">信用查询费用</span>
			<span class="price">20星币</span>
		</div>
		<div class="info wrap">
			<span>当前剩余星币 {{xb}}，请不要重复确认</span>
		</div>
		<div class="wrap btn-wrap">
			<button  class="btn" @click="sure" >确认</button>
		</div>
	</div>
</template>
<script>
import { checkMoney, queryMoney } from "@/util/axios";
import { getItem } from "@/util/util";
import { costXb } from "@/config/baseVar";
export default {
  data() {
    return {
      xb: 0,
      userId: JSON.parse(getItem("userInfo")).userId
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      console.log(localStorage)
      //   await checkMoney();
      var data = {
        userId: this.userId
      };
      let res = await queryMoney(data);
      if (res.code === "0000") {
        this.xb = res.data.xb;
        data = {};
      }
    },
    async sure() {
      var data = {
        userId: this.userId,
        xb: costXb
      };
      var res = await checkMoney(data);
      if (res.code === "0000") {
        if (res.data.status == 1) {
          this.$router.push({ path: "/search/credit" });
        } else {
          this.$message("星币不足");
        }
      }
    },
    history() {
      this.$router.push({ path: "/search/creditHistory" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.creditAuthorize {
  height: 100%;
  .link {
    color: $blue;
  }
  .input {
    height: rem(98px);
    line-height: rem(98px);
    font-size: rem(26px);
    color: #646464;
    border: 1px solid $bdcolor;
    background: #fff;
    .price {
      margin-left: rem(30px);
      color: #f94b4b;
    }
  }
  .info {
    margin-top: rem(18px);
    margin-bottom: rem(68px);
    color: $grey;
    font-size: rem(24px);
    line-height: 1;
    // span {
    //   font-size: rem(20px);
    // }
  }
  .btn {
    width: 100%;
    height: rem(80px);
    background-color: $blue;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-size: rem(32px);
  }
}
</style>