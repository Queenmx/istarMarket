<template>
  <div class="rooterEle addAddress" ref="addAddress">
        <v-header class="wrap" :isBack="false" @leftEvent="cancel">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">添加办公地点</p>
        </v-header>
        <split></split>
        <div class="wrap flex address">
            <div class="lable"><span>办公地点</span></div>
            <div class="rest input-wrap">
                <input type="text" class="ellipsis" placeholder="请填写办公地点" v-model="address">
            </div>
        </div>
        <split></split>
        <div class="wrap">
            <div id="container" class="bm-view"></div>
        </div>
        <div class="footer-btn" @click="submit">{{btnText}}</div>
  </div>
</template>
<script>
import { BaiduMap, BmGeolocation } from "vue-baidu-map";
var map, point, myGeo, geolocation;
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      address: "",
      btnText: this.$route.query.btnText || "提交"
    };
  },
  mounted() {
    this.$refs.addAddress.style.height =
      this.$refs.addAddress.clientHeight + "px";
    this.initMap();
    this.getPosition();
    // this.changeToAddress();
  },
  components: {
    BaiduMap,
    BmGeolocation
  },
  methods: {
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
    submit() {
      // sessionStorage.setItem("location", this.address);
      // this.$router.go(-1);
      this.$emit('submit', this.address)
    },
    cancel(){
      this.$emit('close')
    }
  }
  //   beforeRouteLeave(to, from, next) {
  //     console.log(from.path);
  //     if (from.path == "/oaSystem/addAttendanceGroup") {

  //     }
  //     next();
  //   }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
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
    .lable {
      margin-right: rem(86px);
    }
    input {
      width: 100%;
      border: none;
    }
  }
}
</style>


