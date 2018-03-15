<template>
  <div class="signIn addAddress" ref="addAddress">
      <v-header>
          <i slot="left" class="el-icon-arrow-left"></i>
          <p slot="title">签到</p>
      </v-header>
      <el-row class="sign_base">
          <el-col :span="10" class="sign_msg"><img src="../../assets/images/icon-time.png" />{{date}}</el-col>
          <el-col :span="14" class="sign_msg"><img src="../../assets/images/tree.png" />当前企业：{{companyName}}</el-col>
      </el-row>
      <el-row class="location_msg">
          <el-col :span="24" class="sign_msg"><input v-model="address" class="address-input" style="border:none;width:100%"></el-col>
          <!-- <el-col :span="8" class="fr sign_msg"><span>地址微调</span></el-col> -->
      </el-row>
      <div class="wrap">
            <div id="container" class="bm-view"></div>
        </div>
      <el-row class="sign_base">
          <el-col class="base_label" :span="6">拜访对象</el-col>
          <el-col class="base_input" :span="18"><input v-model="visitor" placeholder="请输入拜访对象" /></el-col>
      </el-row>
      <div class="sign_time">
          <div class="time_bg" @click="submit">
            <p>签到<br><span class="time_num">{{time}}</span></p>
          </div>
      </div>
  </div>
</template>
<script>
import { oaSignIn, oaGetCompany } from "@/util/axios.js";
import { getItem, checkSys, formateTime } from "@/util/util.js";
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
    this.$refs.addAddress.style.height =
      this.$refs.addAddress.clientHeight + "px";
    this.initMap();
    this.getPosition();
    this.initData();
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
      let res = await oaGetCompany(data);
      this.companyName = res.data.name;
    },
    //获取经纬度
    initMap() {
      map = new BMap.Map("container");
      point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 11);
      // 创建地理编码实例
      myGeo = new BMap.Geocoder();
      map.addControl(new BMap.NavigationControl());
      geolocation = new BMap.Geolocation();
    },
    getPosition() {
      var self = this;
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
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
    },
    async submit() {
      console.log("submit");
      let data = this.signData;
      let res = await oaSignIn(data);
      if (res.code === "0000") {
        this.$message("提交成功");
        // this.$router.push("/oaSystem");
      } else {
        this.$message(res.msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.location_msg {
  padding: rem(40px) rem(30px) rem(20px);
  font-size: rem(32px);
  .fr {
    text-align: right;
    color: #53a6ff;
  }
}
.signIn {
  .address-input {
    width: 100%;
    border: none;
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
.addAddress {
  position: relative;
  .bm-view {
    width: 100%;
    height: rem(200px);
  }
  .address {
    height: rem(99px);
    font-size: rem(32px);
    color: #646464;
    background: #fff;
    border-bottom: 1px solid $bdcolor;
  }
}
</style>
