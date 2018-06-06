<template>
    <div class="rooterEle attendanceCard">
        <v-header title="打卡">
        </v-header>
        <div class="wrap container">
             <div class="wrap flex header">
                <span class="rest">考勤组：{{groupName}}</span>
                <span>{{date}}</span>
            </div>
            <div class="main">
                <div class="address-group">
                    <i class="icon-map-wait"></i>
                    <div>
                        <p class="strong">{{business}}</p>
                        <p>{{address}}</p>
                    </div>
                </div>
                <div class="circle-container">
                    <div class="circle-wrap" @click="updateCard">
                        <div class="circle">
                            <div class="content">
                                <strong class="strong">{{hour}}:{{minute}}</strong>
                                <p>上班打卡</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getItem, formateTime, callAddress, checkSys } from "@/util/util";
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
    console.log(date);
    return {
      date: formateTime(date, "yyyy年M月d日"),
      hour: date.getHours(),
      minute: date.getMinutes(),
      timeStamp: date,
      userInfo: getItem("userInfo"),
      address: "", //位置
      groupName: "", //考勤组名称
      business: "" //定位商圈
    };
  },
  filters: {
    formatTime(str) {
      if (str) {
        return str.split(" ")[1];
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getGroupName();
      this.getLocation();
    },
    //获取考勤组名称
    async getGroupName() {
      let data = {
        userId: this.userInfo.userId,
        deptId: this.userInfo.deptId
      };
      let res = await oaGroupCheck(data);
      if (res.code === "0000") {
        this.groupName = res.data.groupName;
      } else {
        this.$toast(res.msg);
      }
    },
    //打卡
    async updateCard() {
      let data = {
        userId: this.userInfo.userId,
        time: formateTime(this.timeStamp, "yyyy-MM-dd hh:mm:ss"),
        location: this.address
      };
      let res = await oaUpdateTime(data);
      if (res.code === "0000") {
        this.$router.push({
          path: "/oaSystem/attendanceCardSuccess",
          query: {
            business: this.business,
            time: formateTime(this.timeStamp, "h:m")
          }
        });
      } else {
        this.$toast(res.msg);
      }
    },
    //获取位置
    getLocation() {
      var self = this;
      var point = new BMap.Point(116.331398, 39.897445);
      var geolocation = new BMap.Geolocation();
      var geoc = new BMap.Geocoder();
      // 开启SDK辅助定位
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          geoc.getLocation(r.point, function(rs) {
            self.business = rs.business;
            self.address = rs.address;
          });
        } else {
          self.$toast(this.getStatus());
        }
      });
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
    getAddress(address) {
      this.address = address;
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
    overflow: auto;
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
    // padding-bottom: rem(196px);
  }
  .circle-container {
    padding-top: rem(142px);
    text-align: center;
    // padding-bottom: rem(226px);
  }
  .circle-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    // margin: rem(142px) auto rem(226px) auto;
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
