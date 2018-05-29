<template>
	<div class="creditAuthorize">
		<v-header title="授权">
			<p slot="right"><router-link to="/search/creditHistory" class="header-right">历史记录</router-link></p>
		</v-header>
        <section class="main">
            <div><span class="title">信用查询费用</span></div>
            <div class="circle-wrap">
            <div class="circle">
                <div class="content">
                    <strong class="strong">20</strong>
                    <p>总费用(星币)</p>
                </div>
            </div>
            </div>
        </section>
		<div class="info-wrap">
			<span class="info">当前剩余星币 {{xb}}，请不要重复确认</span>
		</div>
		<div class="wrap">
			<p class="btn-blue-lg" @click="sure" >确认</p>
		</div>
	</div>
</template>
<script>
import { checkMoney, queryMoney } from "@/util/axios";
import { getItem } from "@/util/util";
import { costXb } from "@/config/baseVar";
import { strEnc, strDec } from "@/util/aes.js";
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
      console.log(localStorage);
      //   await checkMoney();
      var data = {
        userId: this.userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await queryMoney(enData);

      if (res.code === "0000") {
        let deData1 = strDec(res.data, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        this.xb = deData.xb;
        data = {};
      }
    },
    async sure() {
      var data = {
        userId: this.userId,
        xb: costXb
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      var res = await checkMoney(enData);

      if (res.code === "0000") {
        let deData1 = strDec(res.data, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        if (deData.status == 1) {
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
  padding-top: rem(88px);
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  .header-right {
    font-size: rem(28px);
    color: #333333;
    letter-spacing: rem(0.34px);
  }
  .main {
    margin-top: rem(38px);
  }
  .title {
    position: relative;
    padding-bottom: rem(10px);
    font-size: rem(32px);
    color: #4d7bff;
    letter-spacing: rem(0.38px);
    &:after {
      content: "";
      position: absolute;
      margin-left: rem(-20px);
      bottom: 0;
      left: 50%;
      height: rem(4px);
      width: rem(40px);
      background-color: #4d7bff;
    }
  }
  .circle-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: rem(142px) auto rem(226px) auto;
    width: rem(304px);
    height: rem(304px);
    border-radius: 50%;
    background-image: linear-gradient(-180deg, #f6ba59 0%, #f8913e 100%);
    .circle {
      position: relative;
      width: rem(252px);
      height: rem(252px);
      border-radius: 50%;
      background: #fff;
    }
    .strong {
      font-size: rem(72px);
      color: #020202;
      letter-spacing: rem(0.86px);
    }
    .content {
      position: absolute;
      margin-top: rem(-56px);
      top: 50%;
      width: 100%;
    }
  }
  .info {
    font-size: rem(32px);
    color: #666666;
    letter-spacing: rem(0.38px);
    &::before {
      content: "";
      display: inline-block;
      margin-right: rem(24px);
      width: rem(12px);
      height: rem(12px);
      vertical-align: middle;
      background: #4d7bff;
    }
  }
  .info-wrap {
    margin-bottom: rem(96px);
  }
}
</style>