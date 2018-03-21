<template>
	<div class="product">
		<v-header>
            <i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">{{loanName}}</p>
		</v-header>
		<div class="main">
			<!-- <div class="input-container">
				<div class="item">
					<div class="input-group">
						<span class="lable">金额</span>
                        <div class="input-wrap">
						<div class="flex input-item">
							<input class="input" type="number" :min="detailInfo.moneyMin" :max="detailInfo.moneyMax" step="1" v-model="money" @blur="getFee('money')"/>
							<span class="unit">{{detailInfo.moneyUnit}}</span>	
						</div>
                        </div>
					</div>
					<p class="range">额度范围：{{detailInfo.moneyMin}}{{detailInfo.moneyUnit}}～{{detailInfo.moneyMax}}{{detailInfo.moneyUnit}}</p>
				</div>
				<div class="item">
					<div class="input-group">
						<span class="lable">期限</span>
						<div class="input-wrap">
                            <div class="flex input-item">
							<input class="input" type="number" :min="detailInfo.limitMin" :max="detailInfo.limitMax" step="1" v-model="periods"  @blur="getFee('periods')"/>
                            <span class="unit">{{detailInfo.limitType}}</span>
                            </div>
								
						</div>
					</div>
					<p class="range">期限范围：{{detailInfo.limitMin}}～{{detailInfo.limitMax}}{{detailInfo.limitType}}</p>
				</div>
			</div>
			<div class="chart-wrap">
	            <div id="main" class="chart"></div>
	        </div>
	        <div>
	        	<p class="go-detail">查看详情<i class="el-icon-arrow-down"></i></p>
	        </div> -->
	        <split></split>
	        <div class="flow">
	        	<p class="title">办理流程（门店办理）</p>
	        	<div class="wrap" v-html="detailInfo.loanFlow"></div>
	        </div>
	        <div class="condition">
	        	<h4 class="title">申请条件</h4>
                <div class="wrap" v-html="detailInfo.applicationRequirement"></div>
	        	<h4 class="title">所需材料</h4>
                <div class="wrap" v-html="detailInfo.materialsneed"></div>
	        	<split></split>
	        </div>
		</div>
	<div class="footer">
		  <button class="btn form-control" @click="goLoan">申请借款</button>
	</div>
	</div>
</template>
<script>
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legendScroll");
import { productDetail, getFee } from "@/util/axios";
import { getItem, checkSys } from "@/util/util.js";
var myChart;
export default {
  data() {
    return {
      price: 5,
      deadline: 12,
      detailInfo: {},
      money: "",
      periods: "",
      loanId: this.$route.query.loanId,
      loanName: this.$route.query.loanName
    };
  },
  mounted() {
    this.initData();
  },
  //   computed: {
  //     chartLabel() {
  //       return [
  //         `贷款 ${this.money}${this.detailInfo.moneyUnit}/${this.periods}${
  //           this.detailInfo.limitType
  //         }`,
  //         `利息 ${this.detailInfo.interest}${this.detailInfo.moneyUnit}（${
  //           this.detailInfo.rate
  //         }%/${this.detailInfo.rateType}）`
  //       ];
  //     }
  //   },
  methods: {
    async initData() {
      //   getItem("loanName");
      var data = {
        loanId: this.loanId
      };
      var res = await productDetail(data);
      if (res.code === "0000") {
        // console.log(res.data)
        this.detailInfo = res.data;
        this.money = this.detailInfo.loanAmount;
        this.periods = this.detailInfo.loanPeriod;
        // this.drawChart();
      } else {
      }
    },
    async getFee(str) {
      if (this.money == 0 || this.periods == 0) {
        return;
      }
      if (str === "money") {
        this.money = this.setDataRange(
          this.money,
          this.detailInfo.moneyMin,
          this.detailInfo.moneyMax
        );
      } else if (str === "periods") {
        this.periods = this.setDataRange(
          this.periods,
          this.detailInfo.limitMin,
          this.detailInfo.limitMax
        );
      }
      let data = {
        money: this.money,
        periods: this.periods,
        loanId: this.loanId
      };
      let res = await getFee(data);
      if (res.code === "0000") {
        let label = [
          `贷款 ${this.money}${this.detailInfo.moneyUnit}/${this.periods}${
            this.detailInfo.limitType
          }`,
          `利息 ${res.data.interest}${this.detailInfo.moneyUnit}（${
            res.data.rate
          }%/${res.data.rateUnit}）`
        ];
        let chartData = [
          { value: this.money, name: label[0] },
          { value: res.data.interest, name: label[1] }
        ];
        this.updateChart(res.data.total, label, chartData);
      }
    },
    updateChart(total, label, chartData) {
      let self = this;
      myChart.setOption({
        title: {
          text: total + self.detailInfo.moneyUnit
        },
        legend: {
          data: label
        },
        series: [
          {
            data: chartData
          }
        ]
      });
    },
    setDataRange(val, min, max) {
      console.log(val, min, max);
      if (val < min) {
        val = min;
      } else if (val > max) {
        val = max;
      }
      return val;
    },
    drawChart() {
      var self = this;
      var dataArr = this.chartLabel;
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: self.detailInfo.repayAmount + self.detailInfo.moneyUnit,
          subtext: "还款金额",
          textAlign: "center",
          x: "23%",
          y: "25%",
          textStyle: {
            fontWeight: "normal",
            fontSize: 14
          },
          subtextStyle: {
            fontSize: 12
          }
        },
        color: ["#f94b4b", "#ffcc00", "#4dbeff"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          right: "0",
          top: "10",
          data: dataArr,
          textStyle: {
            fontSize: 12,
            color: "#aaaaaa"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            silent: true,
            radius: ["70%", "100%"],
            center: ["25%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: self.detailInfo.loanAmount, name: dataArr[0] },
              { value: self.detailInfo.interest, name: dataArr[1] }
            ]
          }
        ]
      });
    },
    goLoan() {
      this.$router.push({
        path: "/home/fcgqInfo",
        query: { loanId: this.loanId, loanName: this.loanName }
      });
      //   this.$router.push({ path: "/home/fcgqInfo" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.product {
  padding-bottom: rem(91px);
  box-sizing: border-box;
  .input-container {
    display: flex;
    padding: rem(47px) rem(50px) 0 rem(50px);
    .item {
      flex: 1;
      &:nth-of-type(1) {
        padding-right: rem(50px);
      }
    }
  }
  .range {
    color: #aaaaaa;
    font-size: rem(20px);
  }
  .input-group {
    display: flex;
    align-items: center;
    .lable {
      margin-right: rem(13px);
      font-size: rem(26px);
    }
  }
  .input-wrap {
    display: inline-block;
    flex: 1;

    // position: relative;
    span {
      //   display: inline-block;
      //   position: absolute;
      //   right: rem(20px);
      //   top: rem(5px);
      font-size: rem(20px);
    }
    .input-item {
      display: flex;
      padding: rem(10px) rem(30px);
      border: 1px solid #c5c5c5;
      border-radius: 20px;
    }
    .input {
      //   padding: rem(10px) rem(30px);
      //   width: rem(155px);
      //   font-size: rem(20px);
      //   box-sizing: border-box;
      padding-right: rem(10px);
      flex: 1;
      color: #53a6ff;
      text-align: right;
      border: none;
      //   border: 1px solid #c5c5c5;
      //   border-radius: 20px;
    }
  }
  .go-detail {
    margin: rem(10px) 0;
    height: rem(67px);
    line-height: rem(67px);
    text-align: center;
    color: #aaaaaa;
    border-top: 1px solid $bdcolor;
    font-size: rem(20px);
  }
  .range {
    margin-top: rem(10px);
  }
  .chart {
    width: 100%;
    height: rem(216px);
    margin: 0 auto;
  }
  .chart-wrap {
    // padding-left: rem(30px);
    // padding-right: rem(30px);
    padding-top: rem(76px);
    padding-bottom: rem(32px);
    text-align: center;
  }

  .flow {
    .img-wrap {
      padding-left: rem(50px);
      // height:rem(50px);
      img {
        width: 100%;
        height: rem(130px);
      }
    }
    .title {
      padding-left: rem(50px);
      height: rem(80px);
      line-height: rem(80px);
      font-size: rem(26px);
      color: #333333;
      border: 1px solid $bdcolor;
      font-weight: 600;
    }
  }
  .condition {
    color: #666666;
    .title {
      margin-top: rem(10px);
      padding-left: rem(50px);
      line-height: rem(50px);
      font-size: rem(24px);
      border-bottom: 1px solid $bdcolor;
    }
    li {
      padding-left: rem(50px);
      line-height: rem(40px);
      font-size: rem(22px);
    }
  }
  .footer {
    position: fixed;
    height: rem(91px);
    left: 0;
    right: 0;
    bottom: 0;
    .btn {
      // height: 100%;
      width: 100%;
      // border-radius: 0;
      height: rem(91px);
      background-color: $blue;
      border: 0;
      color: #fff;
      font-size: rem(26px);
    }
  }
}
</style>