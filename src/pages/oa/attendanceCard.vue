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
                <div class="circle-wrap">
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
    return {
      info: {},
      date: formateTime(date, "yyyy年M月d日"),
      hour: date.getHours(),
      minute: date.getMinutes(),
      flag: [],
      timeStamp: date,
      userId: getItem("userInfo").userId,
      deptId: getItem("userInfo").deptId,
      // 定位
      center: { lng: 0, lat: 0 },
      zoom: 4,
      aPm: "", //判断上班还是下班 true//下班 false上班
      address: "",
      groupAddress: "",
      groupName: "",
      companyName: "",
      errorMsg: "", //异常信息显示
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
    var res = checkSys();
    var self = this;
    this.initData();
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
    initData() {
      this.getGroupName();
      this.getLocation();
    },
    //获取考勤组名称
    async getGroupName() {
      let data = {
        userId: this.userId,
        deptId: this.deptId
      };
      let res = await oaGroupCheck(data);
      if (res.code === "0000") {
        this.groupName = res.data.groupName;
      } else {
        this.errorMsg = res.msg;
      }
    },
    //打卡
    async updateCard() {
      let data = {
        userId: this.userId,
        time: this.timeStamp,
        location: this.address
      };
      let res = await oaUpdateTime(data);
      if (res.code === "0000") {
        this.$router.push({
          path: "/oaSystem/attendanceCardSuccess",
          query: { address: this.address, time: this.timeStamp }
        });
      } else {
        this.$toast(res.msg);
      }
    },
    //获取位置
    getLocation() {
      var self = this;
      //   var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398, 39.897445);
      //   map.centerAndZoom(point, 12);

      var geolocation = new BMap.Geolocation();
      var geoc = new BMap.Geocoder();
      // 开启SDK辅助定位
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          geoc.getLocation(r.point, function(rs) {
            var addComp = rs.addressComponents;
            self.business = rs.business;
            self.address = rs.address;
          });
        } else {
          alert("failed" + this.getStatus());
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
