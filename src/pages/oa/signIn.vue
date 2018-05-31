<template>
  <div class="rooterEle signIn">
      <v-header title="签到">
      </v-header>
        <div class="bm-wrap">
            <div id="container" class="bm-view"></div>
            <div class="address-wrap">
                <div class="address">
                    <p>{{address}}</p>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="wrap flex item">
                <div class="rest">拜访对象</div>
                <div><input v-model="visitor" placeholder="请输入拜访对象"></div>
            </div>
            <div class="wrap textarea-wrap">
                <textarea placeholder="请简单描述一下"/>
                <p class="hint">0/500字</p>
            </div>
        </div>
        <div class="wrap btn-wrap">
            <p class="btn-blue-lg"  @click="submit">立即签到</p>
        </div>
  </div>
</template>
<script>
import { strEnc, strDec } from "@/util/aes.js";
import { oaSignIn, oaGetCompany } from "@/util/axios.js";
import {
  getItem,
  checkSys,
  formateTime,
  callAddress,
  initMap
} from "@/util/util.js";
import { BaiduMap, BmGeolocation } from "vue-baidu-map";
var map, point, myGeo, geolocation;
export default {
  data() {
    var date = new Date();
    var hour = date.getHours();
    var minitues = date.getMinutes();
    hour = hour >= 10 ? hour : "0" + hour;
    minitues = minitues >= 10 ? minitues : "0" + minitues;
    return {
      center: { lng: 0, lat: 0 },
      zoom: 4,
      time: `${hour}:${minitues}`,
      address: "定位中",
      date: `${date.getFullYear()}
        年
        ${date.getMonth() + 1} 
        月
        ${date.getDate()}
        日`,
      timeStamp: date,
      visitor: "",
      companyName: ""
    };
  },
  computed: {
    signData() {
      var obj = {
        location: this.address,
        userId: JSON.parse(getItem("userInfo")).userId,
        signDate: formateTime(this.timeStamp, "yyyy-MM-dd hh:mm:ss"),
        visitor: this.visitor
      };
      return obj;
    }
  },
  mounted() {
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   x = position.coords.longitude;
    //   y = position.coords.latitude;
    // });
    // setTimeout(function() {
    //   console.log("========", x, y);
    // }, 3000);
    // this.initMap();
    // this.getPosition();
    // this.initData();
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
        initMap(self.address);
      }, 1000);
    }
  },
  components: {
    BaiduMap,
    BmGeolocation
  },
  methods: {
    async initData() {
      let data = {
        companyId: JSON.parse(getItem("userInfo")).companyId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaGetCompany(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      this.companyName = deData.data.name;
    },
    //获取经纬度
    initMap() {
      map = new BMap.Map("container");
      point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 12);
      // 创建地理编码实例
      myGeo = new BMap.Geocoder();
      map.addControl(new BMap.NavigationControl());
      geolocation = new BMap.Geolocation();
    },
    getPosition() {
      //   var xlng = 0.04819374,
      //     ylat = -0.0058955;
      var xlng = 0,
        ylat = 0;
      var self = this;
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            map.centerAndZoom(point, 16);
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            self.changeToAddress(r.point.lng + xlng, r.point.lat + ylat);
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
    },
    async submit() {
      console.log("submit");
      let data = this.signData;
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaSignIn(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.$message("提交成功");
        // this.$router.push("/oaSystem");
      } else {
        this.$message(deData.msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.signIn {
  font-size: rem(30px);
  .address-input {
    width: 100%;
    border: none;
  }
  .bm-view {
    width: 100%;
    height: rem(352px);
    box-sizing: border-box;
  }
  .item {
    height: rem(100px);
    line-height: rem(100px);
    font-size: rem(30px);
    color: #333333;
    background: #fff;
    border-bottom: rem(1px) solid #eee;
  }
  textarea {
    padding-top: rem(36px);
    width: 100%;
    height: rem(166px);
    resize: none;
    border: none;
  }
  .container {
    padding-top: rem(36px);

    .hint {
      text-align: right;
      color: #666666;
    }
  }
  .textarea-wrap {
    padding-bottom: rem(32px);
    background: #fff;
  }
  .btn-wrap {
    padding-top: rem(94px);
  }
  .location_msg {
    padding: rem(40px) rem(30px) rem(20px);
    font-size: rem(32px);
    .fr {
      text-align: right;
      color: #53a6ff;
    }
  }
  .sign_base {
    padding: rem(25px) rem(30px) rem(30px);
    font-size: rem(26px);
    color: #959595;
    //   vertical-align: middle;
    border-bottom: 1px solid #eee;
    display: block;
    align-items: center;
    .base_label {
      color: #313131;
      font-size: rem(30px);
    }
    input {
      width: 100%;
      background: none;
      border: none;
      font-size: rem(30px);
      vertical-align: middle;
    }
  }
  .sign_time {
    text-align: center;
    background-color: #f8f8f8;
    padding: rem(60px) 0 rem(150px);
    .time_bg {
      width: rem(400px);
      height: rem(400px);
      border-radius: 50%;
      background-color: #53a6ff;
      box-shadow: 0 rem(12px) rem(27px) rgba(118, 184, 255, 0.75);
      font-size: rem(50px);
      line-height: rem(80px);
      color: #fff;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .time_num {
        font-size: rem(62px);
      }
    }
  }
  .sign_msg {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    img {
      width: rem(29px);
      height: rem(28px);
      padding-right: rem(10px);
    }
  }
  .bm-wrap {
    position: relative;
    .address-wrap {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align: center;
      background-image: linear-gradient(
        -180deg,
        rgba(255, 255, 255, 0) 0%,
        #ffffff 100%
      );
    }
    .address {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: rem(28px);
      color: #020202;
      p {
        padding-top: rem(20px);
        padding-bottom: rem(24px);
      }
    }
  }
  //   .address {
  //     height: rem(99px);
  //     font-size: rem(32px);
  //     color: #646464;
  //     background: #fff;
  //     border-bottom: 1px solid $bdcolor;
  //   }
}

.addAddress {
  position: relative;
}
</style>
