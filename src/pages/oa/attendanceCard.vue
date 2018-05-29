<template>
    <div class="rooterEle attendanceCard">
        <v-header title="打卡">
        </v-header>
        <div class="wrap container">
             <div class="wrap flex header">
                <!-- <attendance-card-list @getData="getData" :groupName="groupName"></attendance-card-list> -->
                <span class="rest">考勤组：技术部</span>
                <span>2012-11-12</span>
            </div>
            <div class="main">
                <div class="address-group">
                    <i class="icon-map-wait"></i>
                    <div>
                        <p class="strong">紧急00</p>
                        <p>深圳市深圳</p>
                    </div>
                </div>
                <div class="circle-wrap">
                    <div class="circle">
                        <div class="content">
                            <strong class="strong">20:12</strong>
                            <p>上班打卡</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import attendanceCardList from "../../components/attendanceCardList";
import localPosition from "@/components/localPosition";
import cardAlert from "../../components/cardAlert";
import { getItem, formateTime, callAddress, checkSys } from "@/util/util";
import { strEnc, strDec } from "@/util/aes.js";
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
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      console.log(data.date);
      await this.getCompany();
      await this.getAttendance(data);
      await this.getGroupName();
    },
    async getCompany() {
      let data = {
        companyId: JSON.parse(getItem("userInfo")).companyId
      };
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaGetCompany(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
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
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaGroupCheck(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
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
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaUpdateTime(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
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
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      var res = await oaAttendanceInfo(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
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
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      var res = await oaAttendanceSign(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
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
  padding: rem(40px) rem(24px);
  padding-top: rem(124px);
  .main {
    padding-top: rem(112px);
    text-align: center;
    font-size: rem(28px);
    color: #4d7bff;
  }
  .strong {
    font-size: rem(32px);
  }
  .icon-map-wait {
    @include icon(rem(40px), rem(52px));
  }
  .container {
    height: 100%;
    background: #fff;
    .header {
      padding-top: rem(20px);
      padding-bottom: rem(10px);
      font-size: rem(28px);
      color: #333333;
      border-bottom: rem(1px) solid #eeeeee;
    }
  }
  .address-group {
    margin-bottom: rem(196px);
  }
  .circle-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: rem(142px) auto rem(226px) auto;
    width: rem(304px);
    height: rem(304px);
    color: #333333;
    border-radius: 50%;
    background-image: linear-gradient(-180deg, #f6ba59 0%, #f8913e 100%);
    .circle {
      position: relative;
      width: rem(252px);
      height: rem(252px);
      border-radius: 50%;
      background: #fff;
    }
    .strong {
      font-size: rem(72px);
      color: #020202;
      letter-spacing: rem(0.86px);
    }
    .content {
      position: absolute;
      margin-top: rem(-56px);
      top: 50%;
      width: 100%;
    }
  }
}
</style>
