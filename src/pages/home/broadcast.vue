<template>
	<div class="broadcast">
		<v-header class="wrap">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">广播信息</p>
		</v-header>
		<!-- <ul class="wrap">
			<li class="item" v-for="(item, index) in list">
				<p class="title">{{item.title}}</p>
				<p class="text">{{item.text}}</p>
			</li>
		</ul> -->
        <div class="wrap" v-html="content">
            <!-- {{content}} -->
        </div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      content: this.$route.params.content
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.broadcast {
  .item {
    padding-top: rem(36px);
    .title {
      padding-bottom: rem(30px);
      font-size: rem(32px);
      color: #646464;
    }
    .text {
      line-height: rem(40px);
      font-size: rem(28px);
      color: #969696;
    }
  }
}
</style>