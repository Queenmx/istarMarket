<template>
	<div class="rooterEle report">
		<v-header title="智能报表"></v-header>
		<div>
			<split></split>
            <section class="wrap">
                <div class="flex title-group">
                    <h4 class="rest title">人员出勤</h4>
                    <div class="blue">
                        <dropdown :dataArr="dataArr" :textArr="textArr" :title="textArr[0]" @selectedEvent="setDate"></dropdown>
                    </div>
                </div>
                <div class="wrap info-group">
                    <p class="blue">{{reportInfo.actualAttendancePNum}}</p>
                    <p class="grey">出勤人数</p>
                    <p>总人数：{{reportInfo.shouldAttendancePNum}}人</p>
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
                        <van-col span="8" v-for="(value,key) in stauts" :key="key" class="item">
                            <p class="num">{{reportInfo[key]}}</p>
                            <p class="hint">{{value}}</p>
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
                <div class="wrap flex pannel" @click="goReporter">
                    <div class="rest">
                        <p class="strong">提交人数</p>
                        <p>2018-05-12</p>
                    </div>
                    <div>
                        <span class="strong">{{reportInfo.dailyReportCommitPNum}}</span>
                        <i class="icon-arrow-right"></i>
                    </div>
                </div>
            </section>
            <div class="footer">
                <span>前一周团队平均工时{{(+reportInfo.weeklyAverageWorkingHours).toFixed(2)}}小时</span>
            </div>
		</div> 
	</div>
</template>
<script>
import { oaIReport } from "@/util/axios.js";
import { getItem, formateTime } from "@/util/util.js";
export default {
  data() {
    return {
      stauts: {
        isLatePNum: "迟到(天)",
        leaveEarlyPNum: "早退(天)",
        absenteeismPNum: "旷工(天)",
        outPNum: "外出(天)",
        missingCardPNum: "缺卡(天)",
        signPNum: "签到人数"
      },
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
      dateRange: "今日",
      reportInfo: {},
      reporterList: [],
      userInfo: getItem("userInfo")
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    dateRange: function() {
      this.getReport();
    }
  },
  beforeRouteEnter(to, from, next) {
    let path = [
      "/oaSystem/smartWeekly",
      "/oaSystem/history",
      "/oasystem/reporter"
    ];
    let res = path.some(item => {
      return item == from.path;
    });
    if (res) {
      to.meta.isBack = true;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      this.dateRange = "今日";
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
  },
  methods: {
    async init() {
      await this.initData();
    },
    async initData() {
      await this.getReport();
    },
    //获取智能报表
    async getReport() {
      let data = {
        dateRange: this.dateRange,
        userId: this.userInfo.userId,
        companyId: this.userInfo.companyId
      };
      console.log(data);
      let res = await oaIReport(data);
      this.reportInfo = res;
    },
    setDate(val) {
      this.dateRange = val;
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
    font-size: rem(28px);
    color: #999999;
    letter-spacing: rem(-0.68px);
    background: #fff;
    .strong {
      font-size: rem(32px);
      color: #020202;
      letter-spacing: rem(-0.78px);
    }
  }
  .icon-arrow-right {
    @include icon(rem(19px), rem(28px));
    margin-left: rem(5px);
  }
  .title3 {
    height: rem(72px);
    line-height: rem(72px);
    font-size: rem(24px);
    color: #999999;
    letter-spacing: rem(-0.48px);
    background: #f1f0f0;
  }
  .footer {
    margin-top: rem(47px);
    font-size: rem(28px);
    color: #ff8626;
    letter-spacing: rem(0.34px);
    text-align: center;
    span {
      &:before {
        content: "";
        display: inline-block;
        margin-right: rem(24px);
        width: rem(12px);
        height: rem(12px);
        vertical-align: middle;
        background: #ff8626;
      }
    }
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
