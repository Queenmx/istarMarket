<template>
	<div class="footer">
		<van-row class="list">
            <van-col span="6" v-for="(item,index) in footerData" :key="index">
                <router-link class="item" :to="item.url">
                    <div class="icon-wrap">
                    <i :class="[activeIndex==index?item.class+'-active':item.class]"></i>
                    </div>
                    <p :class="[{'active':activeIndex==index},'title']">{{item.text}}</p>
                </router-link>
            </van-col>
        </van-row>
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
        { class: "icon-search", text: "查询工具", url: "/search" },
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
  padding-top:rem(12px);
  height: rem(100px);
  text-align:center;
  border-top: 1px solid #dedede;
  box-sizing: border-box;
  background-color: #fff;
  .icon-wrap{
      margin:0 auto;
      width:rem(50px);
      height:rem(50px);
      line-height:rem(50px);
  }
  .icon-home,.icon-search,.icon-system,.icon-user{
      @include icon(rem(32px),rem(30px))
          vertical-align: middle;
  }
  .icon-home-active,.icon-search-active,.icon-system-active,.icon-user-active{
      @include icon(rem(50px),rem(50px))
      vertical-align: middle;
  }
  .title{
      font-size: rem(20px);
        color: #444444;
        letter-spacing: rem(0.24px);
  }
  .active{
       color:#4D7BFF;
  }
}
</style>