<template>
	<div class="rooterEle product">
		<v-header :title="loanName">
		</v-header>
		<div class="main">
	        <div class="wrap condition">
	        	<h4 class="title">
                    <i class="icon-pen"></i>
                    <span>申请条件</span></h4>
                <div v-html="detailInfo.applicationRequirement"></div>
	        </div>
		</div>
	<div class="footer">
		  <button class="btn form-control" @click="goLoan">申请借款</button>
	</div>
	</div>
</template>
<script>
import { productDetail, getFee, getJumpWay } from "@/util/axios";
import { getItem, checkSys } from "@/util/util.js";
var myChart;
export default {
  data() {
    return {
      detailInfo: {},
      loanId: this.$route.query.loanId,
      loanName: this.$route.query.loanName
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      var data = {
        loanId: this.loanId
      };
      var res = await productDetail(data);
      if (res.code === "0000") {
        this.detailInfo = res.data;
      } else {
        this.$toast(res.msg);
      }
    },
    async goLoan() {
      //获取该产品是否为第三方产品，type=1小贷产品
      let res = await getJumpWay({ loanId: this.loanId });
      console.log(res);
      if (res.code === "0000") {
        if (res.data.type == 1) {
          this.$router.push({
            path: "/home/applyInfo",
            query: { loanId: this.loanId, loanName: this.loanName }
          });
        } else {
          this.$router.push({
            path: "/home/thirdApplyInfo",
            query: {
              loanId: this.loanId,
              loanName: this.loanName,
              companyName: res.data.companyName,
              url: res.data.url
            }
          });
        }
      } else {
        this.$toast(res.msg);
      }
      //   this.$router.push({
      //     path: "/home/fcgqInfo",
      //     query: { loanId: this.loanId, loanName: this.loanName }
      //   });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.product {
  padding-bottom: rem(102px);
  background: #fff;
  .condition {
    padding-top: rem(36px);
    .title {
      padding-bottom: rem(22px);
      font-size: rem(32px);
      color: #2b2b2b;
    }
  }

  .icon-pen {
    @include icon(rem(40px), rem(40px));
    vertical-align: middle;
  }
  .footer {
    position: fixed;
    height: rem(102px);
    left: 0;
    right: 0;
    bottom: 0;
    .btn {
      width: 100%;
      height: rem(102px);
      color: #fff;
      font-size: rem(34px);
      background-image: linear-gradient(-180deg, #599ffe 0%, #3158e0 100%);
      border: none;
    }
  }
}
</style>