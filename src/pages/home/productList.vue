<template>
    <div class="rooterEle productList">
        <v-header :title="title"></v-header>
        <div class="container">
            <ul class="list">
                <li class="item" v-for="item in productList" :key="item.loanId">
                    <div class="img-wrap">
                        <img :src="item.logo">
                    </div>
                    <div class="wrap flex">
                        <div class="rest">
                            <p class="title">{{item.loanName}}</p>
                            <p class="introduct">{{item|formatInfo}}</p>
                            <p class="price-group">
                                <span class="symbol">￥</span>
                                <span class="price">{{item.moneyMin}}~{{item.moneyMax}}</span><small class="unit">额度范围（{{item.moneyUnit}}）</small></p>
                        </div>
                        <div><router-link :to="{path:'/home/product',query:{loanId:item.loanId,loanName:item.loanName}}" class="icon-edit"></router-link></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { typeProduct } from "@/util/axios.js";
import { setItem, getItem } from "@/util/util";
export default {
  data() {
    return {
      title: this.$route.query.title,
      categoryId: this.$route.query.categoryId,
      userId: getItem("userInfo").userId,
      productList: []
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      let data = {
        categoryId: this.categoryId,
        userId: this.userId
      };
      let res = await typeProduct(data);
      if (res.code === "0000") {
        this.productList = res.data.Products;
      } else {
        this.$toast(res.msg);
      }
    }
  },
  filters: {
    formatInfo(item) {
      let dateType = { D: "日", M: "月", Y: "年" };
      let str = `${item.loanTime},${dateType[item.rateType]}利率${
        item.rate
      }%,贷款期限${item.limitMin}-${item.limitMax}${dateType[item.limitType]}`;
      return str;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.productList {
  padding-top: rem(88px);
  .container {
    padding-top: rem(22px);
  }
  .list {
    background: #f1f0f0;
  }
  .item {
    margin-bottom: rem(18px);
    background: #fff;
    .title {
      font-size: rem(28px);
      color: #020202;
      letter-spacing: rem(0.34px);
    }
    .introduct {
      font-size: rem(24px);
      color: #666666;
      letter-spacing: rem(0.28px);
    }
    .price-group {
      font-size: 0;
      margin: rem(12px) 0;
    }
    .symbol {
      font-size: rem(20px);
      color: #fc1212;
      letter-spacing: rem(0.24px);
    }
    .price {
      font-size: rem(32px);
      color: #fc1212;
      letter-spacing: rem(0.38px);
    }
    .unit {
      margin-left: rem(6px);
      font-size: rem(20px);
      color: #666666;
      letter-spacing: rem(0.24px);
    }
  }
  .img-wrap {
    height: rem(300px);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .icon-edit {
    @include icon(rem(84px), rem(90px));
  }
}
</style>

