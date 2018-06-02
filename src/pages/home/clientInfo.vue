<template>
	<div class="rooterEle clientInfo">
		<v-header title="客户信息">
		</v-header>
        <section>
            <h3 class="wrap title">贷款信息</h3>
            <div class="main">
                <div>
                    <p class="name">{{cusInfo.name}}</p>
                    <p>
                        <i class="icon-phone"></i>
                        <span class="lightBlack">{{cusInfo.phone}}</span>
                    </p>
                </div>
                <van-row class="loanInfo">
                    <van-col span="8" class="col-item" v-for="(value,key) in loanInfoLable" :key="key">
                        <p class="data">{{cusInfo[key]}}</p>
                        <p>
                            <i :class="value.icon"></i>
                            <small>{{value.text}}</small>
                        </p>
                    </van-col>
                </van-row>
            </div>
        </section>
        <section>
            <h3 class="wrap title">基本信息</h3>
                <van-row class="wrap baseInfo">
                    <van-col span="6" class="item" v-for="(value,key) in baseInfoLabel" :key="key">
                        <span v-if="value">{{value[cusInfo[key]]}}</span>
                        <span v-else>{{cusInfo[key]}}</span>
                        <i class="icon-tick"></i>
                    </van-col>
                </van-row>
        </section>
        <section>
            <h3 class="wrap title">资产信息</h3>
            <ul class="propertyInfo">
                <li class="wrap flex item" v-for="(value,key) in creditInfoLabel" :key="key">
                    <span class="rest point-title">{{value.text}}</span>
                    <span class="lightBlack">{{value.value[cusInfo[key]]}}</span>
                </li>
            </ul>
        </section>
        <div class="wrap btn-wrap">
            <i v-if="isGrab" @click="callPhone(cusInfo.phone)" class="icon-phone2"></i>
            <p v-else class="btn-blue-lg" @click="bookOrder">抢单</p>
        </div>
	</div>
</template>
<script>
import { customerInfo, queryMoney, grabCustomer } from "@/util/axios";
import { costXb } from "@/config/baseVar";
import { getItem, phoneMask } from "@/util/util";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      customerId: this.$route.query.customerId,
      userInfo: getItem("userInfo"),
      cusInfo: {},
      listInfo: [],
      money: 0,
      xbCost: costXb,
      isGrab: this.$route.query.isGrab || false,
      isEnough: true,
      loanInfoLable: {
        applyMoney: {
          text: "申请金额",
          icon: "icon-money"
        },
        limitDay: {
          text: "贷款期限",
          icon: "icon-dashboard"
        },
        income: {
          text: "月收入",
          icon: "icon-piggy"
        }
      },
      baseInfoLabel: {
        car: ["有车", "无车"],
        house: ["有房", "无房"],
        marriage: ["已婚", "未婚"],
        socialSecurity: ["有社保", "无社保"],
        accumulationFund: ["有公积金", "无公积金"],
        age: "",
        work: ["白领", "蓝领", "个体户", "企业主"],
        hasLoan: ["有微粒贷", "无微粒贷"]
      },
      creditInfoLabel: {
        creditCondition: {
          text: "征信情况",
          value: ["好", "差"]
        },
        liabilityCondition: {
          text: "负债情况",
          value: ["无", "有", "多"]
        }
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getCustomerInfo();
      this.getMoney();
    },
    //获取客户信息
    async getCustomerInfo() {
      var data = {
        customerId: this.customerId
      };
      var res = await customerInfo(data);
      if (res.code === "0000") {
        this.cusInfo = res.data.customer;
      } else {
        this.$toast(res.msg);
      }
    },
    //获取星币
    async getMoney() {
      let data = {
        userId: this.userInfo.userId
      };
      let res = await queryMoney(data);
      if (res.code === "0000") {
        this.money = res.data.xb;
      } else {
        this.$toast(res.msg);
        return;
      }
      if (this.money >= this.xbCost) {
        this.isEnough = true;
      } else {
        this.isEnough = false;
      }
    },
    //抢单
    async bookOrder() {
      if (!this.isEnough) {
        this.$toast("星币不足");
        return;
      }
      var data = {
        userId: this.userInfo.userId,
        customerId: this.customerId,
        companyId: this.userInfo.companyId,
        xbCost: this.xbCost
      };
      var res = await grabCustomer(data);
      if (res.code === "0000") {
        this.isGrab = true;
        this.$toast("抢单成功");
      } else {
        this.$toast(res.msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.clientInfo {
  font-size: rem(28px);
  color: #020202;
  .title {
    height: rem(80px);
    line-height: rem(80px);
    color: #333333;
  }
  .main {
    padding-top: rem(42px);
    padding-bottom: rem(48px);
    text-align: center;
    background: #fff;
    .name {
      margin-bottom: rem(14px);
      font-size: rem(32px);
    }
    .data {
      margin-bottom: rem(16px);
    }
    .loanInfo {
      margin-top: rem(64px);
    }
  }
  .col-item {
    &:not(:nth-child(3)) {
      border-right: rem(1px) solid #eee;
    }
  }
  .icon-phone {
    vertical-align: middle;
    @include icon(rem(32px), rem(32px));
  }
  .icon-money {
    vertical-align: middle;
    @include icon(rem(32px), rem(36px));
  }
  .icon-dashboard {
    vertical-align: middle;
    @include icon(rem(36px), rem(36px));
  }
  .icon-piggy {
    vertical-align: middle;
    @include icon(rem(36px), rem(36px));
  }
  .icon-tick {
    vertical-align: middle;
    @include icon(rem(28px), rem(30px));
  }
  .icon-phone2 {
    @include icon(rem(120px), rem(120px));
  }
  .lightBlack {
    color: #333333;
  }
  .baseInfo {
    background: #fff;
    &:not(:last-child) {
      border-bottom: rem(1px) solid #eee;
    }
  }
  .item {
    // padding: 0;
    height: rem(100px);
    line-height: rem(100px);
    text-align: center;
  }
  .point-title {
    text-align: left;
    color: #020202;
    &::before {
      content: "";
      display: inline-block;
      margin-right: rem(12px);
      width: rem(12px);
      height: rem(12px);
      background-image: linear-gradient(-180deg, #599ffe 0%, #3158e0 100%);
      border-radius: 50%;
    }
  }
  .propertyInfo {
    background: #fff;
    .item {
      &:not(:last-child) {
        border-bottom: rem(1px) solid #eee;
      }
    }
  }
  .btn-wrap {
    margin-top: rem(62px);
    text-align: center;
  }
}
</style>