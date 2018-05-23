<template>
	<div class="search">
		<v-header>
			<p slot="title">查询工具</p>
		</v-header>
		<div class="search_list">
			<el-row v-for="(items,index) in listArr" :key="index">
			  <el-col :span="8" v-for="(item,i) in items" :key="i">
			  	<div class="grid-content" @click="goFunc(item.url)">
			  		<i :class="item.class"></i>
			  		<p class="name">{{item.text}}</p>
			  	</div>
			  </el-col>
			</el-row>
		</div>
		<v-footer :activeIndex="1"></v-footer>
	</div>
</template>
<script>
export default {
  data() {
    return {
      listArr: [
        [
          { class: "icon-card", text: "信用查询", url: "/search/creditAuthorize" },
          { class: "icon-illegal", text: "违章查询", url: "" },
          { class: "icon-car", text: "车险查询", url: "" }
        ],
        [
          { class: "icon-bank", text: "公积金查询", url: "" },
          { class: "icon-insurance", text: "社保查询", url: "" },
          { class: "icon-phone", text: "手机充值", url: "" }
        ],
        [
          { class: "icon-lightning", text: "电费", url: "" },
          { class: "icon-fire", text: "燃气费", url: "" },
          { class: "icon-water", text: "水费", url: "" }
        ]
      ]
    };
  },
  methods: {
    goFunc(url) {
      if (url) {
        this.$router.push({ path: url });
      } else {
        this.$message({ message: "正在升级中", duration: 1000 });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.search {
  height: 100%;
  padding-bottom: rem(98px);
  box-sizing: border-box;
  .grid-content {
    text-align: center;
    padding-top: rem(70px);
   
    .name {
      margin-top: rem(35px);
      margin-bottom: rem(51px);
      font-size: rem(28px)
    }
  }
  .el-col {
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    &:nth-last-child() {
      border-right: none;
    }
  }
  .icon-illegal + .name {
    margin-top: rem(28px);
  }
  .icon-car {
    @include icon(rem(68px),rem(60px));
    background-image: url("../assets/images/car.png");
  }
  .icon-illegal {
    @include icon(rem(68px),rem(68px));
    background-image: url("../assets/images/illegal.png");
  }
  .icon-card {
    @include icon(rem(68px),rem(52px));
    background-image: url("../assets/images/card.png");
    margin-top: rem(8px);
  }
  .icon-bank {
    @include icon(rem(70px),rem(68px));
    background-image: url("../assets/images/bank.png");
  }
  .icon-insurance {
    @include icon(rem(60px),rem(68px));
    background-image: url("../assets/images/insurance.png");
  }
  .icon-phone {
    @include icon(rem(54px),rem(68px));
    background-image: url("../assets/images/phone.png");
  }
  .icon-lightning {
    @include icon(rem(68px),rem(68px));
    background-image: url("../assets/images/lightning.png");
  }
  .icon-fire {
    @include icon(rem(56px),rem(68px));
    background-image: url("../assets/images/fire.png");
  }
  .icon-water {
    @include icon(rem(46px),rem(68px));
    background-image: url("../assets/images/water.png");
  }
}
</style>