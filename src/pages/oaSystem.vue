<template>
  <div class="oaSystem">
      <header class="header">
          OA系统
      </header>
      <div class="system_list">
            <section v-for="(items,index) in listArr" :key="index">
                <h3 class="title flex">
                    <span>{{items.title}}</span>
                    <span class="rest line"></span>
                </h3>
                <van-row>
                    <van-col span="6" v-for="(item,i) in items.items" :key="i" class="item">
                        <div @click="goFunc(item.url)" >
                            <i :class="item.class"></i>
                            <p class="name">{{item.text}}</p>
                        </div>
                    </van-col>
                </van-row>
            </section>
	  </div>
      <v-footer :activeIndex="2"></v-footer>
  </div>
</template>
<script>
import { getItem } from "@/util/util.js";
export default {
  data() {
    return {
      //   accountType:
      //     JSON.parse(getItem("userInfo")).accountType === "主账号" ? 1 : 0, //1是主账号0是子账号
      listArr: [
        {
          title: "经营统计",
          items: [
            {
              class: "icon-report",
              text: "智能报表",
              url: "/oasystem/report"
            },
            {
              class: "icon-calendar",
              text: "出勤人数",
              url: "/oasystem/attendance"
            },
            {
              class: "icon-seal",
              text: "待我审核",
              url: "/oaSystem/audit"
            }
            // {
            //   class: "icon-usermanage",
            //   text: "员工管理",
            //   url: "/oaSystem/staffManagement"
            // }
          ]
        },
        {
          title: "内外勤管理",
          items: [
            {
              class: "icon-touch",
              text: "考勤打卡",
              url:
                JSON.parse(getItem("userInfo")).accountType === "主账号"
                  ? "/oaSystem/attendanceGroup"
                  : "/oaSystem/attendanceCard"
            },
            { class: "icon-signin", text: "签到", url: "/oaSystem/sign" },
            { class: "icon-offwork", text: "请假", url: "/oaSystem/leave" },
            { class: "icon-out", text: "外出", url: "/oaSystem/out" },
            {
              class: "icon-overtime",
              text: "加班",
              url: "/oaSystem/overtimeWork"
            }
          ]
        },
        {
          title: "业务汇报",
          items: [
            { class: "icon-dayly", text: "日报", url: "/oaSystem/dayly" },
            { class: "icon-weekly", text: "周报", url: "/oaSystem/weekly" },
            { class: "icon-monthly", text: "月报", url: "/oaSystem/monthly" },
            {
              class: "icon-evaluation",
              text: "绩效自评",
              url: "/oaSystem/performence"
            }
            // {
            //   class: "icon-performence",
            //   text: "绩效自评",
            //   url: ""
            // }
          ]
        }
      ]
    };
  },
  mounted() {
    this.initDate();
    // let accountType =
    //   JSON.parse(getItem("userInfo")).accountType == "主账号" ? 1 : 0;
    // this.listArr[1].item[0].url = accountType
    //   ? "/oaSystem/attendanceGroup"
    //   : "/oaSystem/attendanceCard";
  },
  methods: {
    initDate() {
      localStorage.removeItem("leave");
      localStorage.removeItem("out");
      localStorage.removeItem("overtime");
      localStorage.removeItem("dayly");
      localStorage.removeItem("weekly");
      localStorage.removeItem("monthly");
      localStorage.removeItem("performence");
      localStorage.removeItem("approver");
      localStorage.removeItem("sendTo");
      localStorage.removeItem("approverOut");
      localStorage.removeItem("sendToOut");
      localStorage.removeItem("approverOvertimeWork");
      localStorage.removeItem("sendToOvertimeWork");
      localStorage.removeItem("daylyApprover");
      localStorage.removeItem("daylySendTo");
      localStorage.removeItem("weeklyApprover");
      localStorage.removeItem("weeklySendTo");
      localStorage.removeItem("monthlyApprover");
      localStorage.removeItem("monthlySendTo");
      localStorage.removeItem("performenceApprover");
      localStorage.removeItem("performenceSendTo");
    },
    goFunc(url) {
      this.$toast.clear();
      if (url) {
        this.$router.push({ path: url });
      } else {
        this.$toast("正在升级中");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.oaSystem {
  padding-bottom: rem(100px);
  header {
    height: rem(88px);
    line-height: rem(88px);
    font-size: rem(34px);
    color: #fefefe;
    text-align: center;
    background-image: linear-gradient(
      135deg,
      rgba(89, 159, 254, 0.9) 0%,
      rgba(49, 88, 224, 0.9) 100%
    );
  }
  .title {
    position: relative;
    padding: rem(28px) 0 rem(16px) rem(24px);
    font-size: rem(32px);
    color: #444444;
    letter-spacing: rem(0.38px);
    .line {
      margin-left: rem(28px);
      height: rem(2px);
      background: #e7e4e4;
    }
  }
  .item {
    margin: rem(40px) 0;
    font-size: rem(28px);
    color: #020202;
    letter-spacing: rem(0.34px);
    text-align: center;
  }
  .system_list {
    padding-top: rem(18px);
  }
  .icon-report,
  .icon-calendar,
  .icon-seal,
  .icon-touch,
  .icon-signin,
  .icon-offwork,
  .icon-out,
  .icon-overtime,
  .icon-dayly,
  .icon-weekly,
  .icon-monthly,
  .icon-evaluation {
    @include icon(rem(84px), rem(84px));
  }
}
</style>


