<template>
	<div class="footer">
		<el-row class="row">
		  <el-col :span="6" v-for="(item,index) in footerData" :key="index">
		  	<div class="grid-content" @click="go(index)">
		  		<i :class="[{active:activeIndex==index},item.class]"></i>
		  		<p :class="[{active:activeIndex==index},'name']">{{item.text}}</p>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      footerData: [
        { class: "icon-home", text: "首页", url: "/" },
        { class: "icon-bag", text: "查询工具", url: "/search" },
        { class: "icon-system", text: "OA系统", url: "/oaSystem" },
        { class: "icon-user", text: "个人中心", url: "/user" }
      ]
    };
  },
  methods: {
    go(index) {
      this.$router.push({ path: this.footerData[index].url });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: rem(100px);
  border-top: 1px solid #dedede;
  box-sizing: border-box;
  background-color: #fff;
  .row {
    top: 50%;
    transform: translateY(-50%);
    p{
      font-size: rem(20px);
    }
  }
  .grid-content {
    text-align: center;
  }
  .icon-home {
    @include icon(rem(44px),rem(44px));
    background-image: url("../assets/images/home-grey.png");
    &.active {
      background-image: url("../assets/images/home-blue.png");
    }
  }
  .icon-system {
    @include icon(rem(43px),rem(45px));
    background-image: url("../assets/images/system-grey.png");
    &.active {
      background-image: url("../assets/images/system-blue.png");
    }
  }
  .icon-system {
    @include icon(rem(43px),rem(45px));
    background-image: url("../assets/images/system-grey.png");
    &.active {
      background-image: url("../assets/images/system-blue.png");
    }
  }
  .icon-bag {
    @include icon(rem(40px),rem(41px));
    background-image: url("../assets/images/bag-grey.png");
    &.active {
      background-image: url("../assets/images/bag-blue.png");
    }
  }
  .icon-user {
    @include icon(rem(42px),rem(42px));
    background-image: url("../assets/images/user-grey.png");
    &.active {
      background-image: url("../assets/images/user-blue.png");
    }
  }
  .name {
    color: #969696;
    &.active {
      color: #53a6ff;
    }
  }
}
</style>