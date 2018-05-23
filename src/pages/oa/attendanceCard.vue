<template>
    <div class="rooterEle attendanceCard">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">{{companyName}}</p>
            <!-- <p slot="right" class="link" @click="setting">设置考勤</p> -->
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
                                <el-tag size="mini" v-for="(item,index) in flag" :key="index">{{item}}</el-tag>
                            </p>
                            <p class="address">
                                <i class="el-icon-location"></i>
                                <span>{{info.beginLocate}}</span>
                            </p>
                            <p class="updateCard" @click="updateCard">
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
            <!-- <div class="position" v-if="groupAddress">
                <i class="el-icon-circle-check blue"></i>
                <span class="ellipsis">已进入考勤范围：{{groupAddress}}</span> -->
                <!-- <span class="link" @click="setAddress">去重新定位</span> -->
            <!-- </div> -->
            <!-- <div class="position" v-else>{{errorMsg}}</div> -->
        </div>
        <card-alert ref="alert" :startDate="info.beginTime"></card-alert>
        <local-position @getAddress="getAddress" ref="localPosition"></local-position>
    </div>
</template>
<script>
import attendanceCardList from "../../components/attendanceCardList";
import localPosition from "@/components/localPosition";
import cardAlert from "../../components/cardAlert";
import { getItem, formateTime, callAddress, checkSys } from "@/util/util";
import { strEnc, strDec } from '@/util/aes.js'
import {
  oaAttendanceInfo,
  oaAttendanceSign,
  oaGroupCheck,
  oaGetCompany,
  oaUpdateTime
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
      flag: [],
      timeStamp: date,
      userId: JSON.parse(getItem("userInfo")).userId,
      deptId: JSON.parse(getItem("userInfo")).deptId,
      // 定位
      center: { lng: 0, lat: 0 },
      zoom: 4,
      aPm: "", //判断上班还是下班 true//下班 false上班
      address: "",
      groupAddress: "",
      groupName: "",
      companyName: "",
      errorMsg: "" //异常信息显示
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
    var res = checkSys();
    var self = this;
    this.initData();
    this.$message({
      message: "定位中",
      duration: 3
    });
    if (res === "ios") {
      setTimeout(function() {
        self.initMap();
        self.getPosition();
      }, 1000);
    } else {
      //   this.initData();
      callAddress();
      setTimeout(function() {
        self.address = getItem("location");
        // initMap(self.address);
      }, 1000);
    }
    // this.initMap();
    // this.getPosition();
  },
  methods: {
    async initData() {
      var data = {
        userId: this.userId,
        date: formateTime(this.timeStamp, "yyyy-MM-dd") + " 00:00:00"
      };
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      console.log(data.date);
      await this.getCompany();
      await this.getAttendance(data);
      await this.getGroupName();
    },
    async getCompany() {
      let data = {
        companyId: JSON.parse(getItem("userInfo")).companyId
      };
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res = await oaGetCompany(enData);
      let deData1 = strDec(res,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.companyName = deData.data.name;
      }
    },
    async getGroupName() {
      let data = {
        userId: this.userId,
        deptId: this.deptId
      };
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res = await oaGroupCheck(enData);
       let deData1 = strDec(res,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.groupName = deData.data.groupName;
        this.groupAddress = deData.data.location;
      } else if (deData.code === "9999") {
        this.errorMsg = deData.msg;
      }
    },
    async updateCard() {
      let data = {
        userId: this.userId,
        time: this.date,
        location: this.address
      };
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res = await oaUpdateTime(enData);
      let deData1 = strDec(res,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.$message("更新时间成功");
        let time = formateTime(this.timeStamp, "yyyy-MM-dd") + " 00:00:00";
        this.getData(time);
      } else {
        this.$message(deData.code);
      }
    },
    async getAttendance(data) {
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      var res = await oaAttendanceInfo(enData);
      let deData1 = strDec(res,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.flag = [];
        this.info = deData.data;
        if (!Object.keys(this.info).length) {
          this.aPm = false;
          return;
        }
        let arr = {
          notEarly: "早退",
          absenteeism: "旷工",
          missingCard: "缺卡",
          notlate: "迟到"
        };
        for (let key in arr) {
          if (!this.info[key]) {
            this.flag.push(arr[key]);
          }
        }
        if (!this.flag.length) {
          this.flag.push("正常");
        }
        this.aPm = true;
        console.log(this.flag);
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
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      var res = await oaAttendanceSign(enData);
      let deData1 = strDec(res,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
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
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
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
// .el-date-editor {
// }
// .el-input__icon.el-icon-date {
//   position: relative;
//   &:before {
//     position: absolute;
//     top: 0px;
//     left: 0;
//   }
// }
</style>
<style lang="scss">
.attendanceCard {
  .el-input__icon.el-icon-date {
    display: flex;
    align-items: center;
  }
}
</style>



