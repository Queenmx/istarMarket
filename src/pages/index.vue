<template>
  <div class="contain_index">
      <v-header>
        <p slot="title">星融金服</p>
      </v-header>
      <div class="index_banner">
          <dl @click="jumpRouter('product')">
              <dt><img src="../assets/images/daili.png" /></dt>
              <dd>代理进件</dd>
          </dl>
          <dl @click="jumpRouter('client')">
              <dt><img src="../assets/images/yixiang.png" /></dt>
              <dd>意向客户</dd>
          </dl>
      </div>
      <div class="newsmsg">
          <div v-if="!adMes">
          <el-carousel indicator-position="none" arrow="never" height='100px' id="message">
            <div class="tipImg">
                <img  src="../assets/images/tip.png" />
            </div>
            <el-carousel-item v-for="item in ad" :key="item.adId">
                <h3 @click="broadcast(item)">{{ item.title }}</h3>
            </el-carousel-item>
          </el-carousel>
          </div>
          <div v-else class="flex adBox">
              <div class="img-wrap">
                <img  src="../assets/images/tip.png" />
            </div>
             <h3 class="rest"> {{adMes}}</h3>
          </div>
      </div>
      <div class="product_list">
          <ul class="product_contain">
              <el-row>
                  <el-col :span="24">
                    <li class="product_info" v-for="item in list" :key="item.loanId" @click="applyLoan(item.loanId,item.loanName)">
                        <h3 class="list_title">
                            <img :src="item.logo" />
                            <span>{{item.loanName}}</span>
                        </h3>
                        <div class="list_body">
                            <div class="list_price">
                                <h4>{{item.moneyMin}}~{{item.moneyMax}}</h4>
                                <p>额度范围（{{item.moneyUnit}}）</p>
                            </div>
                            <ul class="list_ad">
                                <li v-html="item.spread"></li>
                                <!-- <li>{{item.loanTime}}</li>
                                <li>{{item.rateType}}{{(item.rate*1).toFixed(2) + '%'}}</li>
                                <li>贷款期限{{item.limitMin}}~{{item.limitMax}}{{item.limitType}}</li> -->
                            </ul>
                            <button @click="applyLoan(item.loanId,item.loanName)" class="apply_btn">申请贷款</button>
                        </div>
                    </li>
                  </el-col>
              </el-row>
          </ul>
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
      userInfo: JSON.parse(getItem("userInfo"))
    };
  },
  mounted() {
    // 初始化数据
    this.msg_list();
    this.initData();
  },
  methods: {
    async msg_list() {
      let res = await getAd();

      if (res.code === "0000") {
        let deData1 = strDec(res.data, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        // console.log(res.data.adList);
        this.ad = deData.adList;
      } else {
        this.adMes = res.msg;
      }
    },
    broadcast(item) {
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
    jumpRouter(str) {
      if (str === "product") {
        this.$router.push({ path: "/index/agencyProduct" });
      } else if (str === "client") {
        this.$router.push({ path: "/home/interestedClient" });
      } else if (str === "productCenter") {
        this.$router.push({
          path: "/product",
          query: { loanId: loanId, loanName: loanName }
        });
      }
    },
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.index_banner {
  padding: rem(44px) 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #dedede;
  color: #666;
  text-align: center;
  dl {
    flex: 2;
    dt {
      img {
        width: rem(122px);
        height: rem(122px);
      }
    }
    dd {
      font-size: rem(32px);
      padding-top: rem(20px);
    }
  }
}
.newsmsg {
  border-bottom: rem(20px) solid #f8f8f8;
  height: rem(90px);
  //   padding-bottom: rem(10px);
  img {
    width: rem(125px);
    height: rem(32px);
  }
  .tipImg {
    background-color: #fff;
    // height: 38px;
    width: rem(150px);
    position: absolute;
    left: 0;
    top: 0;
    padding: rem(30px) 0 0 rem(30px);
    z-index: 99;
    text-align: center;
  }
  .el-carousel {
    right: rem(30px);
    overflow: hidden;
  }
  .el-carousel__item {
    text-align: left;
    left: rem(200px);
    padding-top: rem(30px);
    h3 {
      color: #969696;
      font-size: rem(28px);
      line-height: rem(38px);
      margin: 0;
      span {
        font-size: rem(20px);
      }
    }
  }
  .el-carousel__indicators {
    display: none;
  }
}
.product_list {
  border-bottom: rem(20px) solid #f8f8f8;
  padding-bottom: rem(100px);
  .product_contain {
    .product_info {
      border-bottom: rem(20px) solid #f8f8f8;
      .list_title {
        padding: 0 rem(30px);
        line-height: rem(78px);
        vertical-align: middle;
        text-align: left;
        img {
          width: rem(41px);
          height: rem(41px);
          display: inline;
          vertical-align: middle;
        }
        span {
          font-size: rem(28px);
          padding-left: rem(10px);
        }
      }
      .list_body {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        display: flex;
        flex: 3;
        justify-content: space-between;
        align-items: center;
        padding: rem(50px) rem(30px);
        color: #adadad;
      }
      .list_price {
        text-align: left;
        border-right: 1px solid #eee;
        padding-right: rem(70px);
        height: rem(100px);
        h4 {
          color: #f94b4b;
          font-size: rem(32px);
          font-weight: 600;
        }
        p {
          font-size: rem(18px);
        }
      }
      .list_ad {
        width: 36%;
        text-align: left;
        line-height: rem(40px);
        li {
          font-size: rem(24px);
        }
      }
      .apply_btn {
        background-color: #f94b4b;
        box-shadow: 0 rem(5px) rem(15px) rgba(249, 75, 75, 0.54);
        border: none;
        border-radius: rem(8px);
        color: #fff;
        font-size: rem(28px);
        width: rem(152px);
        height: rem(65px);
      }
    }
  }
}
.el-dialog {
  width: 80%;
}
.adBox {
  height: rem(100px);
  .img-wrap {
    padding-right: rem(30px);
    width: rem(150px);
    text-align: center;
  }
}
</style>