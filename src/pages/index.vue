<template>
  <div class="index">
      <section class="banner">
        <van-swipe :autoplay="3000">
            <van-swipe-item><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527064268552&di=7f40e2c4e7aa7313294920c4ef20a878&imgtype=0&src=http%3A%2F%2Fs9.rr.itc.cn%2Fr%2FwapChange%2F20172_9_17%2Fa226fp5761270330555.jpeg"></van-swipe-item>
            <van-swipe-item><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527064336167&di=73127305316ef8dffbebf8ff4ee1d2dd&imgtype=0&src=http%3A%2F%2Fuploads.oh100.com%2Fallimg%2F1707%2F125-1FG5121113.png"></van-swipe-item>
            <van-swipe-item><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527064336165&di=d1e1969d5dea698209e72f6574800760&imgtype=0&src=http%3A%2F%2Fimg.smzy.com%2Fimges%2F2017%2F0614%2F20170614103919460.png"></van-swipe-item>
        </van-swipe>
      </section>
      <div class="wrap main-container">
          <div class="header">
          <div class="flex broadcast">
                <div class="font-group">
                  <i class="font-jinrong"></i>
                  <i class="font-xiaotiao"></i>
                </div>
                <div class="rest banner-content">
                    <van-swipe :autoplay="3000"  @change="changeBroadcast" :show-indicators="false" vertical class="swiper-vertical">
                        <van-swipe-item v-for="item in this.ad" :key="item.adId">
                            <span class="text" @click="broadcast">{{item.title}}</span>
                        </van-swipe-item>
                    </van-swipe>
                </div>
              <div @click="broadcast"><i class="icon-go"></i></div>
          </div>
          <div class="cate">
              <van-row>
                <van-col span="6" v-for="(item,index) in cateArr" :key="index">
                    <i :class="item.class"></i>
                    <p class="cate-name">{{item.text}}</p>
                </van-col>
              </van-row>
          </div>
          </div>
          <div class="list">
              <h3>热门产品</h3>
              <ul>
                  <li class="item"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527064336165&di=d1e1969d5dea698209e72f6574800760&imgtype=0&src=http%3A%2F%2Fimg.smzy.com%2Fimges%2F2017%2F0614%2F20170614103919460.png"></li>
                  <li class="item"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527064336165&di=d1e1969d5dea698209e72f6574800760&imgtype=0&src=http%3A%2F%2Fimg.smzy.com%2Fimges%2F2017%2F0614%2F20170614103919460.png"></li>
              </ul>
          </div>
      </div>
      <v-footer></v-footer>
  </div>
</template>
<script>
import { getAd, product } from "@/util/axios.js";
import { setItem, getItem } from "../util/util";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      ad: "",
      adMes: "",
      list: "",
      activeIndex: 0,
      cateArr: [
        { class: "icon-car", text: "车贷", url: "" },
        { class: "icon-house", text: "房贷", url: "" },
        { class: "icon-card", text: "信贷", url: "" },
        { class: "icon-client", text: "意向客户", url: "" }
      ],
      userInfo: JSON.parse(getItem("userInfo"))
    };
  },
  mounted() {
    // 初始化数据
    this.msg_list();
    // this.initData();
  },
  methods: {
    async initData() {
      var data = {
        pageNum: 1,
        pageSize: 500,
        userId: this.userInfo.userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await product(enData);
      let deData1 = strDec(res.data, "ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      console.log(deData);
      if (res.code === "0000") {
        this.list = deData.loansList;
      } else {
        this.list = res.msg;
      }
    },
    async msg_list() {
      let res = await getAd();
      if (res.code === "0000") {
        let deData1 = strDec(res.data, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        this.ad = deData.adList;
      } else {
        this.adMes = res.msg;
      }
    },
    broadcast() {
      let item = this.ad[this.activeIndex];
      this.$router.push({
        name: "broadcast",
        params: { content: item.content }
      });
    },
    applyLoan(loanId, loanName) {
      this.$router.push({
        path: "/product",
        query: { loanId: loanId, loanName: loanName }
      });
    },
    changeBroadcast(index) {
      this.activeIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.index {
  padding-bottom: rem(100px);
  .banner {
    img {
      height: rem(400px);
      width: 100%;
    }
  }
  .main-container {
    position: relative;
    margin-top: rem(-90px);
  }
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: rem(270px);
    border-radius: rem(40px) rem(40px) 0 0;
    background: #fff;
  }
  .broadcast {
    margin: 0 rem(24px);
    padding-top: rem(27px);
    padding-bottom: rem(14px);
    border-bottom: rem(1px) solid #e7e4e4;
  }
  .font-group {
    margin-right: rem(40px);
    i {
      @include icon(rem(50px), rem(24px));
      display: block;
      &:not(:last-child) {
        margin-bottom: rem(6px);
      }
    }
  }
  .swiper-vertical {
    height: rem(48px);
    width: 100%;
  }
  .icon-go {
    @include icon(rem(30px), rem(30px));
  }
  .icon-car,
  .icon-house,
  .icon-card,
  .icon-client {
    @include icon(rem(70px), rem(70px));
  }
  .cate {
    padding-top: rem(30px);
    text-align: center;
  }
  .cate-name {
    text-align: center;
  }
  .list {
    padding-top: rem(270px);
    text-align: center;
    h3 {
      margin-top: rem(12px);
      margin-bottom: rem(34px);
      font-size: rem(30px);
      color: #2b2b2b;
      letter-spacing: rem(0.36px);
      &::before,
      &::after {
        content: "";
        display: inline-block;
        width: rem(32px);
        height: rem(2px);
        vertical-align: middle;
        background: #2b2b2b;
      }
      &::before {
        margin-right: rem(10px);
      }
      &::after {
        margin-left: rem(10px);
      }
    }
    .item {
      img {
        margin-bottom: rem(18px);
        height: rem(268px);
        width: 100%;
        border-radius: rem(20px);
      }
    }
  }
}
</style>
<style lang="scss">
@import "../assets/style/common.scss";
.index {
  .van-swipe__indicators {
    bottom: rem(100px);
  }
  .van-swipe__indicator {
    width: rem(28px);
    height: rem(4px);
    background: #fff;

    border-radius: 0;
  }
  .van-swipe__indicator--active {
    background: #4374ff;
  }
}
</style>