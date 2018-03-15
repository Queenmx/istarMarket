<template>
	<div class="report">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">智能报表</p>
		</v-header>
		<div class="wrap picker-wrap">
			<timer-picker @change="getReport"></timer-picker>
		</div>
		<div>
			<!-- <split></split>
			<div class="item">
				<p class="title">外部联系人</p>
				<div class="content">暂不支持，建议切换至昨日查看</div>
			</div> -->
			<split></split>
			<div class="item">
				<p class="title">人员出勤</p>
				<div class="content flex">
					<div class="chart-wrap">
			            <div id="canvas" class="chart" @click="goAttendance"></div>
			        </div>
					<div class="chart-msg">
						<el-row :gutter="20" v-for="(items,index) in stauts" :key="index" class="gap">
						  <el-col :span="8" v-for="(item,i) in items" :key="i">
						  	<div class="grid-content bg-purple">
							  	<p class="num">{{item.value}}</p>
							  	<p class="mes">{{item.text}}</p>
						  	</div>
						  </el-col>
						</el-row>
					</div>
				</div>
				<div class="content">
					<p>前一周团队平均工时{{(+reportInfo.weeklyAverageWorkingHours).toFixed(2)}}小时</p>
					<p class="link" @click="goWeekly">查看人员出勤周报</p>
				</div>
			</div>
			<split></split>
			<div class="item">
				<p class="title">签到</p>
				<div class="content">
					<p class="flex-item" @click="goHistory">
						<span class="left">签到人数</span>
						<span class="middle">{{reportInfo.signPNum}}</span>
						<i class="right el-icon-arrow-right"></i>
					</p>
				</div>
			</div>
			<split></split>
			<div class="item">
				<p class="title">日志</p>
				<div class="content">
					<p class="flex-item" @click="goReporter">
						<span class="left">提交人数</span>
						<span class="middle">{{reportInfo.dailyReportCommitPNum}}</span>
						<i class="right el-icon-arrow-right"></i>
					</p>
				</div>
			</div>
			<split></split>
		</div>    
	</div>
</template>
<script>
import timerPicker from "../components/timePicker";
import reporter from "./reporter";
import { oaIReport } from "@/util/axios.js";
import { getItem } from "@/util/util.js";
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legendScroll");
var myChart;
export default {
  data() {
    return {
      stauts: [
        [
          { text: "迟到", value: 0 },
          { text: "早退", value: 0 },
          { text: "旷工", value: 0 }
        ],
        [{ text: "外出", value: 0 }, { text: "缺卡", value: 0 }]
      ],
      dateRange: sessionStorage.getItem("dateRange") || "今日",
      reportInfo: {},
      attendanceNum: 0,
      reporterFlag: false,
      reporterList: [],
      userInfo: JSON.parse(getItem("userInfo"))
    };
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("dateRange");
    next();
  },
  components: {
    timerPicker,
    reporter
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.drawChart();
      await this.initData();
    },
    async initData() {
      await this.getReport("今日");
    },
    async getReport(item) {
      this.dateRange = item;
      let data = {
        dateRange: item,
        userId: this.userInfo.userId,
        companyId: this.userInfo.companyId
      };
      let res = await oaIReport(data);
      this.reportInfo = res;
      this.reporterList = res.dailyReportCommitList;
      this.attendanceNum = res.actualAttendancePNum;
      this.updateChart();
    },
    updateChart() {
      let self = this;
      myChart.setOption({
        title: {
          text: `${self.attendanceNum}\/${self.reportInfo.shouldAttendancePNum}`
        }
      });
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(document.getElementById("canvas"));
      // 绘制图表
      var self = this;
      myChart.setOption({
        title: {
          text: `${self.attendanceNum}\/${
            self.reportInfo.shouldAttendancePNum
          }`,
          subtext: "出勤人数",
          textAlign: "center",
          x: "47%",
          y: "25%",
          textStyle: {
            fontWeight: "normal",
            fontSize: 18
          },
          subtextStyle: {
            fontSize: 18
          }
        },
        color: ["#53a6ff", "#e4e4e4"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            silent: true,
            radius: ["80%", "100%"],
            center: ["50%", "50%"],
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
            data: [{ value: 1 }, { value: 3 }]
          }
        ]
      });
    },
    showReproter() {
      this.$refs.reporter.show();
    },
    goWeekly() {
      this.$router.push({ path: "/oaSystem/smartWeekly" });
    },
    goReporter() {
      this.$router.push({
        path: "/oasystem/reporter",
        query: {
          dateRange: this.dateRange
        }
      });
    },
    goAttendance() {
      this.$router.push({ path: "/oasystem/attendance" });
    },
    goHistory() {
      this.$router.push({ path: "/oaSystem/history" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.report {
  position: relative;
  .item {
    .title {
      padding: 0 rem(30px);
      height: rem(78px);
      line-height: rem(78px);
      font-size: rem(28px);
      border: 1px solid $bdcolor;
    }
    .content {
      padding: rem(38px) rem(30px) rem(42px) rem(30px);
      text-align: center;
      color: $grey;
      font-size: rem(28px);
      border-bottom: 1px solid $bdcolor;
    }
  }
  .chart {
    width: rem(210px);
    height: rem(210px);
    margin: 0 auto;
  }
  .chart-wrap {
    flex: 1;
  }
  .chart-msg {
    flex: 1;
    padding-left: rem(38px);
    .mes {
      font-size: rem(28px);
      line-height: rem(38px);
      color: $grey;
    }
    .num {
      font-size: rem(36px);
      color: $black;
      line-height: rem(38px);
    }
  }
  .flex {
    display: flex;
    padding: 0 rem(85px);
  }
  .gap {
    margin: rem(20px) 0;
  }
  .link {
    color: $blue;
    line-height: rem(38px);
  }
  .flex-item {
    display: flex;
    align-items: center;
    .middle {
      flex: 1;
    }
    .left,
    .right {
      width: rem(167px);
    }
    .left {
      text-align: left;
    }
    .right {
      text-align: right;
    }
  }
  .picker-wrap {
    background-color: $blue;
  }
  .reporter-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    min-height: 100%;
    z-index: 5;
    background: #fff;
  }
}
</style>
<style lang="scss">
@import "../assets/style/common.scss";
.grid-content {
  .el-button {
    font-size: rem(20px);
  }
}
</style>
