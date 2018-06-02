<template>
  <div class="index">
      <section class="banner">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="item in bannerList" :key="item.id">
                <router-link :to="item.url"><img :src="item.src"></router-link></van-swipe-item>
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
                <van-col span="6" v-for="item in cateArr" :key="item.categoryId" >
                    <div @click="goProductList(item.categoryName,item.categoryId)">
                        <i :class="item.class"></i>
                        <p class="cate-name">{{item.categoryName}}</p>
                    </div>
                </van-col>
                <van-col span="6">
                    <router-link to="home/interestedClient">
                        <i class="icon-client"></i>
                        <p class="cate-name">意向客户</p>
                    </router-link>
                </van-col>
              </van-row>
          </div>
          </div>
          <div class="list">
              <h3>热门产品</h3>
              <van-list  v-model="loading" :finished="finished" @load="onLoad">
              <ul>
                  <li class="item" v-for="item in productList" :key="item.loanId" @click="applyLoan(item.loanName,item.loanId)"><img :src="item.logo"></li>
              </ul>
              </van-list>
              <p v-if="finished" class="nomore">到底啦</p>
          </div>
      </div>
      <v-footer></v-footer>
  </div>
</template>
<script>
import { getAd, cateAndPro, hotProduct, bannerList } from "@/util/axios.js";
import { setItem, getItem } from "../util/util";
export default {
  data() {
    return {
      ad: "",
      adMes: "",
      productList: [],
      activeIndex: 0,
      cateArr: [],
      bannerList: [],
      userInfo: getItem("userInfo"),
      loading: false,
      finished: false,
      pageSize: 10,
      pageNum: 1,
      totalPage: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.msg_list();
      this.getCate();
      this.getBannerList();
    },
    //获取分类
    async getCate() {
      let data = { userId: this.userInfo.userId };
      let res = await cateAndPro(data);
      let cateObj = {
        车贷: {
          class: "icon-car"
        },
        房贷: {
          class: "icon-house"
        },
        信贷: {
          class: "icon-card"
        }
      };
      if (res.code === "0000") {
        this.cateArr = res.data.categoryList.map(item => {
          return Object.assign(item, cateObj[item.categoryName]);
        });
      }
    },
    //获取热门产品
    async getHotProduct(fn) {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        userId: this.userInfo.userId
      };
      let res = await hotProduct(data);
      if (res.code === "0000") {
        this.productList = this.productList.concat(res.data.loansList);
        this.totalPage = res.data.totalPage;
        this.pageNum++;
        fn && fn();
      } else {
        this.$toast(res.msg);
      }
    },
    //获取轮播图
    async getBannerList() {
      let res = await bannerList();
      if (res.code === "0000") {
        this.bannerList = res.data.bannerList.map(item => {
          return {
            url: item.objUrl,
            src: item.imgUrl,
            id: item.objId
          };
        });
      }
    },
    //产品列表跳转
    goProductList(name, id) {
      this.$router.push({
        path: "/home/productList",
        query: { title: name, categoryId: id }
      });
    },
    applyLoan(loanName, loanId) {
      this.$router.push({ path: "/home/product", query: { loanName, loanId } });
    },
    async msg_list() {
      let res = await getAd();
      if (res.code === "0000") {
        this.ad = res.data.adList;
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
    changeBroadcast(index) {
      this.activeIndex = index;
    },
    //加载更多
    onLoad() {
      this.getHotProduct(() => {
        this.loading = false;
        if (this.totalPage < this.pageNum) {
          this.finished = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.index {
  padding-bottom: rem(100px);
  color: #020202;
  .banner {
    img {
      height: rem(400px);
      width: 100%;
    }
  }
  a {
    color: #020202;
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
    @include icon(rem(76px), rem(76px));
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
