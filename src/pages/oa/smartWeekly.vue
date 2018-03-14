<template>
	<div class="weekly">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">智能报表</p>
		</v-header>
		<div class="chart-wrap">
            <div id="main" class="chart"></div>
        </div>
        <split></split>
        <el-row>
		  <el-col :span="12"><div class="grid-content brborder">
		  	<p>{{info[0]}}小时</p>
		  	<p>周平均工时</p>
		  </div></el-col>
		  <el-col :span="12"><div class="grid-content"><p>{{info[1]}}人</p>
		  	<p>周旷工</p></div></el-col>
		</el-row>
		<el-row>
		  <el-col :span="12"><div class="grid-content brborder">
		  	<p>{{info[2]}}人</p>
		  	<p>周早退</p>
		  </div></el-col>
		  <el-col :span="12"><div class="grid-content"><p>{{info[3]}}人</p>
		  	<p>周迟到</p></div></el-col>
		</el-row>
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
      userInfo: JSON.parse(getItem("userInfo"))
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.initData();
      await this.drawChart();
    },
    async initData() {
      let arrWeek = ["星期一", "星期二", "星期三", "星期四", "星期五"];
      let data = {
        dateRange: "今日",
        userId: this.userInfo.userId,
        companyId: this.userInfo.companyId
      };
      let res = await oaIReport(data);
      this.info.push((+res.weeklyAverageWorkingHours).toFixed(2));
      this.info.push(+res.absenteeismPNum);
      this.info.push(+res.leaveEarlyPNum);
      this.info.push(+res.isLatePNum);
      let attendceNum = res.shouldAttendancePNum;
      this.info.forEach(val => {
        attendceNum -= val;
      });
      this.rate = (attendceNum / res.shouldAttendancePNum * 100).toFixed(2);
      let weeklyAttendanceRate = res.weeklyAttendanceRate;
      arrWeek.forEach(item => {
        this.detailRate.push(weeklyAttendanceRate[item].split("%")[0]);
      });
      console.log(this.detailRate);
    },
    drawChart() {
      var self = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: `周出勤率 ${self.rate}%`
        },
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
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["星期一", "星期二", "星期三", "星期四", "星期五"],
            axisTick: {
              alignWithLabel: true
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
            name: "出勤率(%)",
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#999"
              }
            }
          }
        ],
        series: [
          {
            name: "出勤率",
            type: "bar",
            barWidth: "60%",
            // label: {
            //   normal: {
            //     show: true,
            //     position: "inside"
            //   }
            // },
            data: self.detailRate
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
    height: rem(300px);
    margin: 0 auto;
  }
  .chart-wrap {
    padding-top: rem(20px);
    height: rem(400px);
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