<template>
  <div class="oa_index">
      <v-header>
          <p slot="title">我的OA系统</p>
      </v-header>
      <div class="system_list">
            <div class="system_li" v-for="(items,index) in listArr" :key="index">
                <el-row>
                    <el-col :span="24"><h2>{{items.title}}</h2></el-col>
                </el-row>
                <el-row>
                <el-col :span="6" v-for="(item,i) in items.items" :key="i">
                    <div class="grid-content" @click="goFunc(item.url)">
                        <i :class="item.class"></i>
                        <p class="name">{{item.text}}</p>
                    </div>
                </el-col>
                </el-row>
            </div>
	  </div>
      <v-footer :activeIndex="2"></v-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
              class: "icon-peoplenum",
              text: "出勤人数",
              url: "/oasystem/attendance"
            },
            {
              class: "icon-checkpending",
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
              class: "icon-clockin",
              text: "考勤打卡",
              url: "/oaSystem/attendanceCard"
            },
            { class: "icon-signin", text: "签到", url: "/oaSystem/signIn" },
            { class: "icon-workoff", text: "请假", url: "/oaSystem/leave" },
            { class: "icon-goOut", text: "外出", url: "/oaSystem/out" },
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
            { class: "icon-daily", text: "日报", url: "/oaSystem/dayly" },
            { class: "icon-weekly", text: "周报", url: "/oaSystem/weekly" },
            { class: "icon-monthly", text: "月报", url: "/oaSystem/monthly" },
            {
              class: "icon-performence",
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
      if (url) {
        this.$router.push({ path: url });
      } else {
        this.$message({ message: "正在升级中", duration: 1000 });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.system_list {
  padding-bottom: 100px;
  h2 {
    font-size: rem(32px);
    color: #323232;
    // padding-bottom: rem(40px);
  }
  .system_li {
    margin: rem(50px) rem(30px) rem(30px);
    border-bottom: 1px solid #eee;
  }
}

.grid-content {
  text-align: center;
  padding: rem(40px) 0 rem(30px);
  .name {
    margin-top: rem(20px);
    font-size: rem(28px);
    color: #656565;
  }
}
.icon-report {
  @include icon(rem(58px),rem(68px));
  background-image: url("../assets/images/report.png");
}
.icon-peoplenum {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/peoplenum.png");
}
.icon-checkpending {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/checkpending.png");
}
.icon-usermanage {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/usermanage.png");
}
.icon-clockin {
  @include icon(rem(53px),rem(68px));
  background-image: url("../assets/images/clockin.png");
}
.icon-signin {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/signin.png");
}
.icon-workoff {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/workoff.png");
}
.icon-goOut {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/go-out.png");
}
.icon-overtime {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/overtime.png");
}
.icon-daily {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/daily.png");
}
.icon-weekly {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/weekly.png");
}
.icon-monthly {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/monthly.png");
}
.icon-performence {
  @include icon(rem(64px),rem(68px));
  background-image: url("../assets/images/performence.png");
}
</style>


