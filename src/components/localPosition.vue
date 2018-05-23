<template>
  <div class="rooterEle localPosition" v-show = "isShow" ref="localPosition">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">{{title}}</p>
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
        <div class="footer-btn" @click="submit">确定</div>
  </div>
</template>
<script>
import { BaiduMap, BmGeolocation } from "vue-baidu-map";
var map, point, myGeo, geolocation;
export default {
  props: {
    title: {
      type: String,
      default: "添加办公地点"
    }
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      address: "",
      isShow: false
    };
  },
  mounted() {
    this.$refs.localPosition.style.height =
      this.$refs.localPosition.clientHeight + "px";
    this.initMap();
    this.getPosition();
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
    open() {
      this.isShow = true;
    },
    submit() {
      this.$emit("getAddress", this.address);
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.localPosition {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
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


