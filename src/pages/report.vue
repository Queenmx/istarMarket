<template>
	<div class="report">
		<v-header title="智能报表"></v-header>
		<!-- <div class="wrap picker-wrap">
			<timer-picker @change="getReport"></timer-picker>
		</div> -->
		<div>
			<split></split>
			<!-- <div class="item">
				<p class="title">人员出勤</p>
				<div class="content flex">
					<div class="chart-wrap">
			            <div id="canvas" class="chart"></div>
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
			</div> -->
            <section class="wrap">
                <div class="flex title-group">
                    <h4 class="rest title">人员出勤</h4>
                    <div class="blue">
                        <dropdown :dataArr="dataArr" :textArr="textArr" :title="textArr[0]"></dropdown>
                    </div>
                </div>
                <div class="wrap info-group">
                    <p class="blue">20</p>
                    <p class="grey">出勤人数</p>
                    <p>总人数：100人</p>
                </div>
                <div class="link-group">
                    <router-link to="/oaSystem/smartWeekly" class="link">查看人员出勤周报</router-link>
                    <i class="icon-arrow-right-active"></i>
                </div>
            </section>
			<split></split>
            <section class="wrap">
                <h4>
                    <p class="title-lines title2">
                        <i class="icon-chart"></i>
                        <span>本日出勤</span>
                    </p>
                </h4>
                <div>
                    <van-row>
                        <van-col span="8" v-for="index in 6" :key="index" class="item">
                            <p class="num">3</p>
                            <p class="hint">迟到(天)</p>
                        </van-col>
                    </van-row>
                </div>
                <div class="link-group">
                    <router-link to="/oaSystem/history" class="link">查看签到详情</router-link>
                    <i class="icon-arrow-right-active"></i>
                </div>
            </section>
            <section>
                <h4 class="wrap title3">日志</h4>
                <div class="flex pannel">
                    <div class="rest">
                        <p>提交人数</p>
                        <p>2018-05-12</p>
                    </div>
                    <div>
                        <span>18</span>
                        <i class="icon-arrow-right"></i>
                    </div>
                </div>
            </section>
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
import { getItem, formateTime } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
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
      dataArr: [
        { text: "今日" },
        { text: "昨日" },
        { text: "本周" },
        { text: "上周" },
        { text: "本月" },
        { text: "上月" }
      ],
      textArr: [
        `今日(${formateTime(new Date(), "yyyy-MM-dd")})`,
        "昨日",
        "本周",
        "上周",
        "本月",
        "上月"
      ],
      dateRange: sessionStorage.getItem("dateRange") || "今日",
      reportInfo: {},
      attendanceNum: 0,
      reporterFlag: false,
      reporterList: [],
      userInfo: JSON.parse(getItem("userInfo")),
      shouldAttendancePNum: 0
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
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaIReport(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
      //   console.log(deData1);
      let deData = JSON.parse(deData1);
      console.log(deData);
      // console.log(deData.code)
      this.reportInfo = deData;
      this.reporterList = deData.dailyReportCommitList;
      this.attendanceNum = deData.actualAttendancePNum;
      this.shouldAttendancePNum = deData.shouldAttendancePNum;
      this.stauts[0][0].value = deData.isLatePNum;
      this.stauts[0][1].value = deData.leaveEarlyPNum;
      this.stauts[0][2].value = deData.absenteeismPNum;
      this.stauts[1][0].value = deData.outPNum;
      this.stauts[1][1].value = deData.missingCardPNum;
      this.updateChart();
    },
    updateChart() {
      let self = this;
      myChart.setOption({
        title: {
          text: `${self.attendanceNum}\/${self.shouldAttendancePNum}`
        },
        series: [
          {
            data: [
              { value: self.attendanceNum },
              { value: self.shouldAttendancePNum }
            ]
          }
        ]
      });
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(document.getElementById("canvas"));
      // 绘制图表
      var self = this;

      console.log(self.attendanceNum, self.shouldAttendancePNum);
      myChart.setOption({
        title: {
          text: `${self.attendanceNum}\/${self.shouldAttendancePNum}`,
          subtext: "出勤人数",
          textAlign: "center",
          x: "47%",
          y: "25%",
          textStyle: {
            fontWeight: "normal",
            fontSize: 18
          },
          subtextStyle: {
            fontSize: 16
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
            data: [
              { value: self.attendanceNum },
              { value: self.shouldAttendancePNum }
            ]
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
  padding-top: rem(88px);
  background: #f1f0f0;
  .blue {
    color: #4d7bff;
  }
  section {
    background: #fff;
  }
  .title-group {
    padding: rem(30px) 0 rem(52px) 0;
    font-size: rem(32px);
    line-height: 1;
    color: #020202;
    letter-spacing: rem(0.38px);
    .title {
      &:before {
        content: "";
        display: inline-block;
        margin-right: rem(14px);
        width: rem(4px);
        height: rem(32px);
        vertical-align: top;
        background: #4d7bff;
      }
    }
  }
  .icon-arrow-right-active {
    vertical-align: text-bottom;
    @include icon(rem(19px), rem(28px));
  }
  .link {
    height: rem(100px);
    line-height: rem(100px);
    font-size: rem(28px);
    color: #4d7bff;
    letter-spacing: rem(0.34px);
  }
  .info-group {
    padding-bottom: rem(30px);
    text-align: center;
    font-size: rem(28px);
    color: #333333;
    letter-spacing: rem(0.34px);
    border-bottom: rem(2px) solid #e7e4e4;
    .blue {
      line-height: rem(86px);
      font-size: rem(72px);
      color: #4d7bff;
      letter-spacing: rem(0.86px);
    }
    .grey {
      color: #666666;
    }
  }
  .link-group {
    text-align: center;
  }
  .icon-chart {
    vertical-align: text-bottom;
    @include icon(rem(30px), rem(30px));
  }
  .title2 {
    height: rem(96px);
    line-height: rem(96px);
    font-size: rem(30px);
    color: #020202;
    letter-spacing: rem(-0.72px);
    text-align: center;
    border-bottom: rem(2px) solid #e7e4e4;
    &::before,
    &::after {
      margin: 0 rem(12px);
      background: #e7e4e4;
    }
  }
  .item {
    padding: rem(10px) 0;
    text-align: center;
    border-bottom: rem(2px) solid #ddd;
    &:not(:nth-child(3n)) {
      border-right: rem(1px) solid #ddd;
    }
    .num {
      line-height: rem(42px);
      font-size: rem(36px);
      color: #020202;
      letter-spacing: rem(-0.86px);
    }
    .hint {
      font-size: rem(28px);
      color: #333333;
      letter-spacing: rem(-0.68px);
    }
  }
  .pannel {
    height: rem(103px);
  }
  .icon-arrow-right {
    @include icon(rem(19px), rem(28px));
  }
  .title3 {
    height: rem(36px);
    line-height: rem(36px);
    font-size: rem(24px);
    color: #999999;
    letter-spacing: rem(-0.48px);
    background: #f1f0f0;
  }
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
  .gap {
    margin: rem(20px) 0;
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
