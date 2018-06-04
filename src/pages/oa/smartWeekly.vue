<template>
	<div class="rooterEle weekly">
		<v-header title="智能报表">
		</v-header>
        <split></split>
        <section class="wrap">
             <h3 class="title">周出勤率</h3>
            <div class="chart-wrap">
                <div id="main" class="chart"></div>
            </div>
            <div class="wrap chart-hint"><span>周出勤率{{(reportInfo.weelyAttRate*1).toFixed(2)}}%</span></div>
        </section>
        <split></split>
        <section class="wrap">
            <h3 class="title">周统计</h3>
            <van-row>
                <van-col class="item" span="6">
                    <p class="strong">{{(reportInfo.weeklyAverageWorkingHours*1).toFixed(2)}}</p>
		  	        <p>周平均工时</p>
                    <p>(小时)</p>
                </van-col>
                <van-col class="item" span="6">
                    <p class="strong">{{reportInfo.absenteeismPNum}}</p>
		  	        <p>周旷工</p>
                    <p>(人)</p>
                </van-col>
               <van-col class="item" span="6">
                   <p class="strong">{{reportInfo.leaveEarlyPNum}}</p>
		  	        <p>周早退</p>
                    <p>(人)</p>
                </van-col>
              <van-col class="item" span="6">
                  <p class="strong">{{reportInfo.isLatePNum}}</p>
		  	        <p>周迟到</p>
                      <p>(人)</p>
                      </van-col>
            </van-row>
        </section>
	</div>
</template>
<script>
import { oaIReport } from "@/util/axios.js";
import { getItem } from "@/util/util.js";
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legendScroll");
export default {
  data() {
    return {
      info: [],
      rate: 0, //出勤率
      detailRate: [], //每周详细出勤记录
      userInfo: getItem("userInfo"),
      reportInfo: {},
      dayRates: [],
      daysLabel: ["星期一", "星期二", "星期三", "星期四", "星期五"]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.getReport();
      await this.drawChart();
    },
    async getReport() {
      let data = {
        dateRange: "上周",
        userId: this.userInfo.userId,
        companyId: this.userInfo.companyId
      };
      let res = await oaIReport(data);
      this.reportInfo = res;
      console.log(res);
      this.setWeekRate();
    },
    //设置每日出勤率
    setWeekRate() {
      var rates = this.reportInfo.weeklyAttendanceRate;
      this.daysLabel.forEach(item => {
        this.dayRates.push(rates[item].split("%")[0]);
      });
      console.log(this.dayRates);
    },
    //设置颜色区域
    setColor(val) {
      var colorList = {};
      if (val <= 0.2) {
        colorList.colorStart = "#FB4018";
        colorList.colorEnd = "#F9211C ";
      } else if (val > 0.2 && val <= 0.6) {
        colorList.colorStart = "#ECB967";
        colorList.colorEnd = "#FF8626";
      } else {
        colorList.colorStart = "#599FFE";
        colorList.colorEnd = "#3158E0";
      }
      return colorList;
    },
    drawChart() {
      var self = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        color: ["#83bff6"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "2%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: self.daysLabel,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#999"
              }
            }
          }
        ],
        yAxis: [
          {
            // name: "出勤率(%)",
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#999"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "出勤率",
            type: "bar",
            barWidth: "20",
            data: self.dayRates,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}"
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  let color = self.setColor(params.data);
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: color.colorStart
                    },
                    {
                      offset: 1,
                      color: color.colorEnd
                    }
                  ]);
                },
                opacity: 1
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.weekly {
  .chart {
    width: 100%;
    height: rem(451px);
    margin: 0 auto;
  }
  section {
    padding-top: rem(30px);
    text-align: center;
    background: #fff;
  }
  .chart-wrap {
    padding-top: rem(20px);
    padding-bottom: rem(32px);

    // height: rem(400px);
  }
  .title {
    margin-bottom: rem(40px);
    padding-left: rem(14px);
    font-size: rem(32px);
    color: #020202;
    text-align: left;
    letter-spacing: rem(-0.78px);
    border-left: rem(4px) solid #4d7bff;
  }
  .chart-hint {
    padding-bottom: rem(7px);
    font-size: rem(24px);
    color: #333333;
    letter-spacing: rem(-0.58px);
    text-align: right;
    span {
      &::before {
        content: "";
        display: inline-block;
        margin-right: rem(8px);
        width: rem(12px);
        height: rem(12px);
        vertical-align: middle;
        background: #d8d8d8;
      }
    }
  }
  .item {
    font-size: rem(28px);
    color: #333333;
    line-height: 1.5;
    letter-spacing: rem(-0.68px);
    .strong {
      font-size: rem(36px);
      color: #020202;
      letter-spacing: rem(-0.86px);
    }
  }
  .grid-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: rem(150px);
    font-size: rem(32px);
    text-align: center;
    border-top: 1px solid $bdcolor;
    &.brborder {
      border-right: 1px solid $bdcolor;
    }
  }
}
</style>