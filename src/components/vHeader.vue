<template>
	<div class="v-header">
		<div class="content">
			<div class="left"  @click="back">
				<slot name="left"></slot>
			</div>
			<div class="middle">
				<slot name="title"></slot>
			</div>
			<div class="right" @click="rightEvent">
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  props: {
    isBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back() {
      if (this.isBack) {
        this.$router.go(-1);
      } else {
        this.$emit("leftEvent");
      }
    },
    rightEvent() {
      this.$emit("rightEvent");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.el-icon-arrow-left {
  font-size: rem(48px);
}
.v-header {
  padding: rem(26px) rem(30px);
  background-color: #fff;
  border-bottom: 1px solid #dedede;
  .content {
    display: flex;
    align-items: center;
  }
  .left,
  .right {
    font-size: rem(26px);
    min-width: rem(100px);
  }
  .right {
    text-align: right;
  }
  .middle {
    font-size: rem(35px);
    flex: 1;
    text-align: center;
    p {
      width: rem(280px);
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>