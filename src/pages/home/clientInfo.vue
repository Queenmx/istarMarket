<template>
	<div class="clientInfo">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">客户信息</p>
		</v-header>
		<div class="header">
			<p class="name">{{cusInfo.name}}</p>
			<p class="phone">{{cusInfo.phone}}</p>
			<div class="detail">
				<div class="inblock">
					<p>{{cusInfo.applyMoney}}</p>
					<p class="mes">申请金额</p>
				</div>
				<div class="inblock">
					<p>{{cusInfo.limitDay}}</p>
					<p class="mes">贷款期限</p>
				</div>
				<div class="inblock">
					<p>{{cusInfo.income}}{{cusInfo.moneyUnit}}</p>
					<p class="mes">月收入</p>
				</div>
			</div>
		</div>
        <div v-for="(items,index) in listInfo" :key="index">
			<split></split>
			<div class="wrap item">
				<p class="title">{{items.title}}</p>
				<ul>
					<li v-for="(item,i) in items.list" :key="i">
						<span>{{item}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer-btn" v-if="isGrab" @click="callPhone(cusInfo.phone)">
			<p class="main">拨打电话</p>
		</div>
        <div class="footer-btn" @click="bookOrder" v-else :class="{'grey':!isEnough}">
			<p class="main" v-if="isEnough">抢单</p>
            <p class="main" v-else>星币不足</p>
			<p class="sub">抢单{{xbCost}}星币，剩余{{money}}星币</p>
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
      customerId: this.$route.params.customerId,
      userInfo: JSON.parse(getItem("userInfo")),
      cusInfo: {},
      listInfo: [],
      money: 0,
      xbCost: costXb,
      isGrab: this.$route.params.isGrab || false,
      isEnough: true,
      // customer:''
    };
  },
  mounted() {
    this.initData();
  },
  filters: {
    phoneMask(phone) {
      if (phone) {
        return phoneMask(phone);
      }
    }
  },
  methods: {
    async initData() {
      var data = {
        customerId: this.customerId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      var res = await customerInfo(enData);
      if (res.code === "0000") {
        let deData1 = strDec(res.data,"ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        this.cusInfo = deData.customer;
        let data2 = {
          userId: this.userInfo.userId
        };
        console.log(res.data)
        var enData1 = strEnc(JSON.stringify(data2), "ZND20171030APIMM" );
        let moneyres = await queryMoney(enData1);
        let deData2 = strDec(moneyres.data,"ZND20171030APIMM");
        let deData3 = JSON.parse(deData2);
        console.log(deData3);
        console.log(moneyres)
        if (moneyres.code === "0000") {
          this.money = deData3.xb;
          if (this.money >= this.xbCost) {
            this.isEnough = true;
          } else {
            this.isEnough = false;
          }
        }
        this.listInfo = this.slitData();
      }
    },
    callPhone(str) {
      console.log(str);
      var native = function(data) {
        console.log(data);
      };
      return this.nativeInteractive(native, str);
    },
    setupWebViewJavascriptBridge: function(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];

      var WVJBIframe = document.createElement("iframe");
      WVJBIframe.style.display = "none";
      WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    },
    nativeInteractive: function(fn, obj) {
      // console.log(123);
      var self = this;
      self.setupWebViewJavascriptBridge(function(bridge) {
        if (obj) {
          bridge.callHandler("webview_call_native_phone", obj, function(
            response
          ) {});
        }
        bridge.registerHandler("native_call_webview_phone", function(
          data,
          response
        ) {
          fn(data);
        });
      });
      if (window.xingrongjinfu && obj) {
        var str = JSON.stringify(obj);
        window.xingrongjinfu.webview_call_native_phone(str);
      }

      window.native_call_webview_phone = function(data) {
        var obj = eval("(" + data + ")");
        fn(obj);
      };
    },
    slitData() {
      var self = this,
        data = {},
        finalArr = [];
      var title = ["基本信息", "资产信息", "描述"];
      var arr = [
        {
          car: ["有车", "无车"],
          house: ["有房", "无房"],
          marriage: ["已婚", "未婚"],
          socialSecurity: ["有社保", "无社保"],
          accumulationFund: ["有公积金", "无公积金"],
          age: [],
          work: ["白领", "蓝领", "个体户", "企业主"],
          hasLoan: ["有微粒贷", "无微粒贷"]
        },
        {
          creditCondition: ["征信情况 好", "征信情况 差"],
          liabilityCondition: ["负债情况 无", "负债情况 有", "负债情况 多"]
        },
        { remark: [] }
      ];
      for (var i = 0, len = arr.length; i < len; i++) {
        let tempArr = [];
        for (var key in arr[i]) {
          if (arr[i].hasOwnProperty(key)) {
            let val = self.cusInfo[key];
            if (arr[i][key].length) {
              tempArr.push(arr[i][key][val]);
            } else {
              tempArr.push(val);
            }
          }
        }
        data.title = title[i];
        data.list = tempArr;

        finalArr.push(data);
        data = {};
      }
      return finalArr;
    },
    changeData(obj, values) {
      return values[obj];
    },
    async bookOrder() {
      if (!this.isEnough) {
        this.$message("星币不足");
        return;
      }
      var self = this;
      var data = {
        userId: this.userInfo.userId,
        customerId: this.customerId,
        companyId: this.userInfo.companyId,
        xbCost: this.xbCost
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      var res = await grabCustomer(enData);
      let deData1 = strDec(res.data,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (res.code === "0000") {
        this.isGrab = true;
        this.$message({
          message: "抢单成功"
        });
      } else {
        this.$message(res.msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.clientInfo {
  padding-bottom: rem(120px);
  min-height: 100%;
  box-sizing: border-box;
  .header {
    position: relative;
    padding: rem(56px) 0 0;
    height: rem(300px);
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    background-image: url("../../assets/images/bg-client.png");
    background-size: 100% 100%;
    .name {
      font-size: rem(48px);
    }
    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      padding: rem(24px) rem(85px);
      font-size: rem(34px);
      background: #ffffff4a;
    }
    .mes {
      font-size: rem(24px);
    }
    .phone {
      line-height: rem(38px);
      font-size: rem(30px);
    }
  }
  .item {
    padding-top: rem(39px);
    padding-bottom: rem(26px);
    color: #636363;
    .title {
      margin-bottom: rem(28px);
      font-size: rem(30px);
    }
    li {
      margin-bottom: rem(20px);
      font-size: rem(28px);
      &:before {
        content: "";
        display: inline-block;
        margin-right: 5px;
        width: rem(12px);
        height: rem(12px);
        vertical-align: middle;
        background: #f3693b;
      }
    }
  }
  .footer-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: rem(120px);
    color: #fff;
    text-align: center;
    box-sizing: border-box;
    background: $blue;
    .main {
      line-height: rem(40px);
      font-size: rem(32px);
    }
    .sub {
      font-size: rem(20px);
      line-height: rem(40px);
    }
    &.grey {
      background: #eee;
    }
  }
}
</style>