<template>
	<div class="wrap flex v-header">
			<div class="left">
				<slot name="left">
                    <i class="icon-back" @click="back"></i>
                </slot>
			</div>
			<div class="rest middle">
				<slot name="title">
                    <span>{{title}}</span>
                </slot>
			</div>
			<div class="right">
				<slot name="right"></slot>
			</div>
	</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "星融金服"
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    rightEvent() {
      this.$emit("rightEvent");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.v-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: rem(88px);
  background-color: #fff;
  z-index: 5;
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
    text-align: center;
    p {
      width: rem(280px);
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .icon-back {
    vertical-align: bottom;
    @include icon(rem(42px), rem(42px));
  }
}
</style>