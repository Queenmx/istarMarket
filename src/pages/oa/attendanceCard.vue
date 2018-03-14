<template>
    <div class="rooterEle attendanceCard">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">{{companyName}}</p>
            <p slot="right" class="link" @click="setting">设置考勤</p>
        </v-header>
        <attendance-card-list @getData="getData" :groupName="groupName"></attendance-card-list>
        <!-- <div class="blank">
            <p class="bg"></p>
            <p class="hit">管理员当天未给你排版</p>
        </div> -->
        <div>
            <p class="wrap title">打卡记录时间和位置</p>
            <div class="wrap main">
                <div v-if="aPm">
                    <div class="item">
                            <i class="circle"></i>
                            <p>
                                <span class="item-title">上班打卡时间{{info.beginTime|formatTime}}</span>
                                <el-tag size="mini">{{flag}}</el-tag>
                            </p>
                            <p class="address">
                                <i class="el-icon-location"></i>
                                <span>{{info.beginLocate}}</span>
                            </p>
                            <p class="updateCard">
                                <span>更新打卡</span>
                                <i class="el-icon-arrow-right"></i>
                            </p>
                    </div>
                    <div class="item">
                            <i class="circle"></i>
                            <p class="item-title">下班打卡时间{{info.endTime|formatTime}}</p>
                            <p class="address">
                                <i class="el-icon-location"></i>
                                <span>{{info.endLocate}}</span>
                            </p>
                    </div>
                </div>
                <div class="ball-wrap">
                    <p class="ball" @click="oaAttendanceSign">
                        <span>{{aPm?"下班":"上班"}}打卡</span>
                        <span class="time">{{circleTime}}</span>
                    </p>
                </div>
            </div>
            <div class="position">
                <i class="el-icon-circle-check blue"></i>
                <span class="ellipsis">已进入考勤范围：{{address}}</span>
                <span class="link" @click="setAddress">去重新定位</span>
            </div>
        </div>
        <card-alert ref="alert" :startDate="info.beginTime"></card-alert>
        <local-position @getAddress="getAddress" ref="localPosition"></local-position>
    </div>
</template>
<script>
import attendanceCardList from "../../components/attendanceCardList";
import localPosition from "@/components/localPosition";
import cardAlert from "../../components/cardAlert";
import { getItem, formateTime } from "@/util/util";
import {
  oaAttendanceInfo,
  oaAttendanceSign,
  oaGroupCheck,
  oaGetCompany
} from "@/util/axios";
import { BaiduMap, BmGeolocation } from "vue-baidu-map";
var map, point, myGeo, geolocation;
export default {
  data() {
    var date = new Date();
    var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    var minutes =
      date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    var sec =
      date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return {
      info: {},
      date: formateTime(date, "yyyy-MM-dd hh:mm:ss"),
      circleTime: hour + ":" + minutes + ":" + sec,
      flag: "",
      timeStamp: date,
      userId: JSON.parse(getItem("userInfo")).userId,
      deptId: JSON.parse(getItem("userInfo")).deptId,
      // 定位
      center: { lng: 0, lat: 0 },
      zoom: 4,
      aPm: "", //判断上班还是下班 true//下班 false上班
      address: "定位中",
      groupName: "",
      companyName: ""
    };
  },
  filters: {
    formatTime(str) {
      if (str) {
        return str.split(" ")[1];
      }
    }
  },
  components: {
    attendanceCardList,
    cardAlert,
    localPosition
  },
  mounted() {
    this.initData();
    this.initMap();
    this.getPosition();
  },
  methods: {
    async initData() {
      var data = {
        userId: this.userId,
        date: formateTime(this.timeStamp, "yyyy-MM-dd") + " 00:00:00"
      };
      console.log(data.date);
      await this.getCompany();
      await this.getAttendance(data);
      await this.getGroupName();
    },
    async getCompany() {
      let data = {
        companyId: JSON.parse(getItem("userInfo")).companyId
      };
      let res = await oaGetCompany(data);
      if (res.code === "0000") {
        this.companyName = res.data.name;
      }
    },
    async getGroupName() {
      let data = {
        userId: this.userId,
        deptId: this.deptId
      };
      let res = await oaGroupCheck(data);
      if (res.code === "0000") {
        this.groupName = res.data.groupName;
      }
    },
    async getAttendance(data) {
      var res = await oaAttendanceInfo(data);
      if (res.code === "0000") {
        this.info = res.data;
        if (!Object.keys(this.info).length) {
          this.aPm = false;
          return;
        }
        if (!this.info.notEarly) {
          this.flag = "早退";
        } else if (!this.info.absenteeism) {
          this.flag = "旷工";
        } else if (!this.info.missingCard) {
          this.flag = "缺卡";
        } else if (!this.info.notlate) {
          this.flag = "迟到";
        } else {
          this.flag = "正常";
        }
        this.aPm = true;
      }
    },
    getData(date) {
      var data = {
        userId: this.userId,
        date: date
      };
      this.getAttendance(data);
    },
    async oaAttendanceSign() {
      var data = {
        userId: this.userId,
        time: this.date,
        location: this.address
      };
      var res = await oaAttendanceSign(data);
      if (res.code === "0000") {
        this.$refs.alert.open();
        data = {
          userId: this.userId,
          date: formateTime(this.timeStamp, "yyyy-MM-dd") + " 00:00:00"
        };
        this.getAttendance(data);
      }
    },
    showAlert() {
      this.$refs.alert.open();
    },
    setting() {
      this.$router.push({ path: "/oaSystem/attendanceGroup" });
    },
    getAddress(address) {
      this.address = address;
    },
    setAddress() {
      this.$refs.localPosition.open();
    },
    //获取经纬度
    initMap() {
      // 创建地理编码实例
      myGeo = new BMap.Geocoder();
      geolocation = new BMap.Geolocation();
    },
    getPosition() {
      var self = this;
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            self.changeToAddress(r.point.lng, r.point.lat);
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );
    },
    changeToAddress(lng, lat) {
      var self = this;
      myGeo.getLocation(new BMap.Point(lng, lat), function(result) {
        if (result) {
          self.address = result.address;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceCard {
  position: relative;
  .title {
    height: rem(78px);
    line-height: rem(78px);
    font-size: rem(26px);
  }
  .main {
    background: #fff;
    padding-bottom: rem(54px);
  }
  .item {
    position: relative;
    padding: rem(30px) rem(44px);
    font-size: rem(28px);
    &:nth-of-type(1) {
      &:after {
        content: "";
        position: absolute;
        top: rem(44px);
        left: rem(8px);
        width: 2px;
        height: 100%;
        background-color: #cfcfcf;
        z-index: 1;
      }
    }
    .circle {
      position: absolute;
      top: rem(44px);
      left: 0;
      display: inline-block;
      width: rem(18px);
      height: rem(18px);
      border-radius: 50%;
      background-color: #cfcfcf;
      z-index: 2;
    }
    .item-title {
      font-size: rem(32px);
    }
    .address {
      margin: rem(10px) 0;
      color: #646464;
    }
    .updateCard {
      color: #979797;
    }
  }
  .ball-wrap {
    padding-top: rem(40px);
    .ball {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: rem(248px);
      height: rem(248px);
      color: #fff;
      font-size: rem(32px);
      background: #53a6ff;
      border-radius: 50%;
      box-shadow: 0px 0px 20px #53a6ff;
      .time {
        margin-top: rem(25px);
        font-size: rem(42px);
      }
    }
  }
  .bg {
    height: rem(246px);
    background-image: url("../../assets/images/none.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .blank {
    margin-top: rem(115px);
  }
  .hit {
    margin-top: rem(50px);
    color: $grey;
    font-size: rem(28px);
    text-align: center;
  }
  .blue {
    color: $blue;
  }
  .ellipsis {
    display: inline-block;
    width: 13em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
  }
  .position {
    margin-top: rem(48px);
    text-align: center;
    font-size: rem(26px);
  }
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.el-date-editor {
}
.el-input__icon.el-icon-date {
  position: relative;
  &:before {
    position: absolute;
    top: 0px;
    left: 0;
  }
}
</style>


