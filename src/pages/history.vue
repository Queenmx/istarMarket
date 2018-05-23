<template>
  <div class="history">
      <v-header>
          <i slot="left" class="el-icon-arrow-left"></i>
          <p slot="title">足迹</p>
      </v-header>
      <el-row class="sign_base">
          <el-col :span="24">
              <baidu-map class="bm-view" ak="2bYPlioCp4ps4ekwY2AcPFdaG11euqlO" :zoom="zoom" :center="center" :showAddressBar="true" :autoLocation="true" :scroll-wheel-zoom="true">
                  <bm-marker :position="{lng: 114.076595, lat: 22.540446}" :dragging="true"  animation="BMAP_ANIMATION_BOUNCE" >
                      <bm-label content="" :labelStyle="{color:'red',fontSize:'24px'}" :offset="{width:6,height:25}" />
                  </bm-marker>
              </baidu-map>
              <div class="block calendar">
                  <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"></el-date-picker>
              </div>
          </el-col>
      </el-row>
      <div class="history_tab">
          <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="tabPosition">
              <el-tab-pane label="最新签到(1)" name="first">
                  <el-row class="new_list" v-for="(item,index) in signMsg" :key="index">
                    <el-col :span="5"><img :src="item.img" /></el-col>
                    <el-col :span="19">
                        <h4>{{item.name}}<time class="signTime">{{item.time}}</time></h4>
                        <p><i class="el-icon-location-outline"></i>{{item.adress}}</p>
                    </el-col>
                  </el-row>
              </el-tab-pane>
              <el-tab-pane label="未签到(7)" name="second">
                  <el-row class="no_sign">
                      <el-col :span="6" v-for="(item,index) in NotSign" :key="index" class="noSign_list">
                          <img :src="item.imgSrc" />
                          <p>{{item.name}}</p>
                      </el-col>
                  </el-row>
              </el-tab-pane>
          </el-tabs>
      </div>
      <sign-footer :activeIndex="1"></sign-footer>
  </div>
</template>
<script>
import { BaiduMap, BmMarker, BmLabel, BmGeolocation } from "vue-baidu-map";
export default {
  data() {
    return {
      tabPosition: "top",
      center: { lng: 114.076595, lat: 22.540446 },
      zoom: 16,
      value2: "",
      activeName: "first",
      signMsg: [
        {
          img: require("../assets/images/photo.png"),
          name: "王昭君",
          time: "2018-1-12 10:40:07",
          adress: "广东省深圳市福田区彩田路319号兆邦基金融大厦1701"
        },
        {
          img: require("../assets/images/photo.png"),
          name: "王昭君",
          time: "2018-1-12 10:40:07",
          adress: "广东省深圳市福田区彩田路319号兆邦基..."
        },
        {
          img: require("../assets/images/photo.png"),
          name: "王昭君",
          time: "2018-1-12 10:40:07",
          adress: "广东省深圳市福田区彩田路319号兆邦基..."
        }
      ],
      NotSign: [
        {
          imgSrc: require("../assets/images/photo.png"),
          name: "王昭君"
        },
        {
          imgSrc: require("../assets/images/photo.png"),
          name: "李昭君"
        },
        {
          imgSrc: require("../assets/images/photo.png"),
          name: "程昭君"
        },
        {
          imgSrc: require("../assets/images/photo.png"),
          name: "张昭君"
        },
        {
          imgSrc: require("../assets/images/photo.png"),
          name: "赵昭君"
        },
        {
          imgSrc: require("../assets/images/photo.png"),
          name: "吕昭君"
        },
        {
          imgSrc: require("../assets/images/photo.png"),
          name: "白昭君"
        }
      ]
    };
  },
  components: {
    BaiduMap,
    BmMarker,
    BmLabel,
    BmGeolocation
  },
  mounted() {
    document.getElementsByClassName("el-tabs__nav")[0].style.transform =
      "translateX(-50%)";
    document.getElementsByClassName("el-tabs__nav")[0].style.left = "50%";
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.bm-view {
  width: 100%;
  height: rem(323px);
}
.sign_base {
  font-size: rem(26px);
  color: #959595;
  border-bottom: 1px solid #eee;
  display: block;
  position: relative;
  .calendar {
    position: absolute;
    bottom: rem(40px);
    right: rem(30px);
    .el-input--prefix .el-input__inner {
      box-shadow: 0 rem(5px) rem(15px) rgba(183, 183, 183, 0.54);
    }
  }
  .el-date-editor.el-input {
    width: rem(272px);
  }
}
.new_list {
  padding: rem(15px) rem(30px) rem(15px);

  img {
    width: rem(120px);
    height: rem(120px);
  }
  h4 {
    color: #333;
    font-size: rem(32px);
    padding: rem(15px) 0;
    time {
      color: #969696;
      font-size: rem(24px);
      float: right;
      line-height: rem(32px);
    }
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: rem(28px);
    color: #646464;
  }
}
.no_sign {
  text-align: center;
  font-size: rem(32px);
  color: #333;
  img {
    width: rem(120px);
    height: rem(120px);
    padding-bottom: rem(10px);
  }
  .noSign_list {
    padding: rem(15px) 0;
  }
}
</style>
<style lang="scss">
@import "../assets/style/common.scss";
.history{
  .el-tabs__item {
    height:rem(80px);
    line-height:rem(80px);
    font-size:rem(30px);
    .el-input__icon{
      line-height:rem(25px)
    }
  }
}
</style>
