<template>
    <div class="productList">
        <v-header title="车贷"></v-header>
        <div class="container">
            <ul class="list">
                <li class="item" v-for="index in 5" :key="index">
                    <div class="img-wrap">
                        <img src="http://img95.699pic.com/photo/50059/4805.jpg_wh300.jpg!/fh/300//quality/90">
                    </div>
                    <div class="wrap flex">
                        <div class="rest">
                            <p class="title">车贷1</p>
                            <p class="introduct">fsfsdfadfad</p>
                            <p class="price-group">
                                <span class="symbol">￥</span>
                                <span class="price">sdfsdfs</span><small class="unit">fsdfsdf</small></p>
                        </div>
                        <div><i class="icon-edit"></i></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
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
    @include icon(rem(84px), rem(84px));
  }
}
</style>

