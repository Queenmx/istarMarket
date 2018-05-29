<template>
  <div class="contain_index" ref="container">
      <div ref="header">
      <v-header >
        <i slot="left" class="el-icon-arrow-left"></i>
        <p slot="title">产品中心</p>
      </v-header>
      </div>
      <div class="product_list">
          <ul class="product_contain">
            <el-tabs v-model="activeName" v-if="categoryList.length" @tab-click="handleClick">
                <el-tab-pane  v-for="item in categoryList" :label="item.categoryName" :name="item.categoryId" :key="item.categoryId">
                    <el-row>
                        <el-col :span="5">
                            <el-menu class="el-menu-vertical-demo" :default-active="subActiveName" @select="setsubActiveName">
                                <el-menu-item :index="subItem.categoryId" v-for="subItem in item.subcategoryList" :key="subItem.categoryId">{{subItem.categoryName}}</el-menu-item>
                            </el-menu>
                        </el-col>
                        <el-col :span="19" v-show="productList.length" >
                            <ul refs="list" class="list-wrap">
                            <li class="product_info" v-for="itemSecond in productList" :key="itemSecond.loanId" @click="jumpRouter('productCenter',itemSecond)" >
                                <h3 class="list_title">
                                    <img :src="itemSecond.logo" />
                                    <span>{{itemSecond.loanName}}</span>
                                </h3>
                                <div class="list_body">
                                    <div class="list_price">
                                        <h4>{{itemSecond.moneyMin}}~{{itemSecond.moneyMax}}</h4>
                                        <p>额度范围（{{itemSecond.moneyUnit}}）</p>
                                    </div>
                                    <ul class="list_ad">
                                         <li v-html="itemSecond.spread"></li>
                                    </ul>
                                    <button @click="jumpRouter('productCenter',itemSecond)" class="apply_btn">申请借款</button>
                                </div>
                                <split></split>
                            </li>
                            </ul>
                        </el-col>
                        <el-col :span="19" v-show="!productList.length"><p class="none" >暂无产品</p></el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
          </ul>
      </div>
  </div>
</template>
<script>
import { cateAndPro, typeProduct } from "@/util/axios";
import { centerTabs, getItem } from "@/util/util";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      categoryList: [],
      loansList: [],
      typeList: [],
      activeName: "", //当前一级菜单
      subActiveName: "", //当前二级菜单
      productList: [],
      activeCache: {}, //二级菜单缓存
      contentHeight: 0
    };
  },
  mounted() {
    // 初始化数据
    // this.initData();
    // this.$nextTick(() => { this.$refs.tabs.$forceUpdate(); })
    // centerTabs();
    this.init();
  },
  watch: {
    subActiveName: function() {
      this.getTypeData(this.subActiveName);
    }
  },
  methods: {
    async init() {
      await this.initData();
      let nav = document.getElementsByClassName("el-tabs__nav")[0];
      let headerNav = document.getElementsByClassName("el-tabs")[0];
      let navWidth = nav.offsetWidth;
      let headerWidth = headerNav.offsetWidth;
      //   console.log(navWidth, headerWidth);
      if (headerWidth > 0 && navWidth < headerWidth) {
        centerTabs();
      }
      this.calSubmenu();
    },
    async initData() {
      var data = {
        pageNum: 1,
        pageSize: 500,
        userId: JSON.parse(getItem("userInfo")).userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await cateAndPro(enData);
      if (res.code === "0000") {
        let deData1 = strDec(res.data, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        this.categoryList = deData.categoryList;
        this.activeName = this.categoryList[0].categoryId;
        this.subActiveName = this.categoryList[0].subcategoryList[0].categoryId;
        this.saveSubActiveName(this.activeName, this.subActiveName);
        // this.getTypeData(this.subActiveName);
      }
    },
    //保存一级菜单的active二级菜单
    saveSubActiveName(categoryId, subCategoryId) {
      if (!subCategoryId) {
        let categoryList = this.categoryList;
        for (let i = 0, len = categoryList.length; i < len; i++) {
          if (categoryList[i].categoryId == categoryId) {
            this.$set(
              this.activeCache,
              categoryId,
              categoryList[i].subcategoryList[0].categoryId
            );
            break;
          }
        }
      } else {
        this.$set(this.activeCache, categoryId, subCategoryId);
      }
    },
    //计算子菜单高度
    calSubmenu() {
      var pageHeight = this.$refs.container.clientHeight;
      var headerHeight = this.$refs.header.clientHeight;
      var paneHeight = document.getElementsByClassName("el-tabs__nav-scroll")[0]
        .clientHeight;
      var restHeight = pageHeight - headerHeight - paneHeight;
      var menuNodes = document.getElementsByClassName("el-menu-vertical-demo");

      var listNode = document.getElementsByClassName("list-wrap");
      menuNodes = Array.prototype.slice.apply(menuNodes);
      listNode = Array.prototype.slice.apply(listNode);
      for (let i = 0, len = menuNodes.length; i < len; i++) {
        menuNodes[i].style.height = restHeight + "px";
        listNode[i].style.height = restHeight + "px";
      }
    },
    broadcast() {
      this.$router.push({ path: "/home/broadcast" });
    },
    applyLoan(item) {
      this.$router.push({
        name: "product",
        query: { loanId: item.loanId, loanName: item.loanName }
      });
    },
    jumpRouter(str, item) {
      console.log(item.loanId);
      if (str === "product") {
        this.$router.push({ path: "/index/agencyProduct" });
      } else if (str === "client") {
        this.$router.push({ path: "/home/interestedClient" });
      } else if (str === "productCenter") {
        this.$router.push({
          path: "/product",
          query: { loanId: item.loanId, loanName: item.loanName }
        });
      }
    },
    setsubActiveName(categoryId) {
      this.subActiveName = categoryId;
      this.saveSubActiveName(this.activeName, categoryId);
    },
    //获取产品数据
    async getTypeData(categoryId) {
      this.saveSubActiveName(this.activeName, categoryId);
      let data = {
        categoryId: categoryId,
        userId: JSON.parse(getItem("userInfo")).userId,
        pageSize: 500,
        pageNum: 1
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await typeProduct(enData);
      let deData1 = strDec(res.data, "ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (res.code === "0000") {
        let deData1 = strDec(res.data, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        this.productList = deData.Products;
        console.log("999" + JSON.stringify(deData.Products));
      }
    },
    handleClick(tab, event) {
      var activeId = tab.name;
      if (this.activeCache[this.activeName]) {
        this.subActiveName = this.activeCache[this.activeName];
      } else {
        for (let i = 0, len = this.categoryList.length; i < len; i++) {
          if (this.categoryList[i].categoryId == this.activeName) {
            this.subActiveName = this.categoryList[
              i
            ].subcategoryList[0].categoryId;
            break;
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.contain_index {
  height: 100%;
  .list-wrap {
    overflow: auto;
  }
}
.none {
  font-size: rem(28px);
  color: $grey;
  text-align: center;
}
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
  //   border-bottom: rem(20px) solid #f8f8f8;
  //   padding-bottom: rem(100px);
  .product_contain {
    .product_info {
      //   border-bottom: rem(20px) solid #f8f8f8;
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
</style>
<style lang="scss" >
@import "../../assets/style/common.scss";
.contain_index {
  .el-tabs__item {
    height: rem(80px);
    line-height: rem(80px);
    font-size: rem(30px);
  }
  .el-tabs__header {
    margin: 0;
  }
}
</style>
