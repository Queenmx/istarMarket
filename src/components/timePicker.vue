<template>
	<div class="timePicker">
		<div class="flex">
			<!-- <i class="el-icon-arrow-left"></i> -->
			<p class="middle" @click="showFlag = !showFlag">{{dateRange}}{{dateRange=='今日'?'('+date+')':''}}<i class="el-icon-arrow-down"></i></p>
			<!-- <i class="el-icon-arrow-right"></i> -->
		</div>
		<div class="picker" v-show="showFlag">
<!-- 			<div class="header wrap">
				<i class="el-icon-arrow-left"></i>
				<p class="middle">{{day}}({{date}})</p>
				<i class="el-icon-arrow-right"></i>
			</div> -->
			<h4 class="wrap title">日期</h4>
			<div class="wrap">
				<el-row :gutter="20"  v-for="(items,index) in listDate" :key="index">
				  <el-col :span="8" v-for="(item,i) in items" :key="i">
				  	<div class="grid-content" @click="change(item)">
					  	<el-button class="form-control">{{item}}</el-button>
					  </div>
				  </el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    const now = new Date();
    let month = now.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    let data = now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();
    data = data >= 10 ? data : "0" + data;
    return {
      day: "今日",
      date: `${now.getFullYear()}-${month}-${data}`,
      listDate: [["今日", "昨日", "本周"], ["上周", "本月", "上月"]],
      showFlag: false,
      dateRange: "今日"
    };
  },
  methods: {
    change(item) {
      if (this.dateRange != item) {
        this.dateRange = item;
        this.$emit("change", item);
        this.showFlag = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.timePicker {
  position: relative;
  .picker {
    position: absolute;
    top: rem(98px);
    width: 100%;
    padding-bottom: rem(30px);
    border: 1px solid $bdcolor;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 5;
    h4 {
      font-size: rem(20px);
    }
  }
  .header {
    display: flex;
    align-items: center;
    height: rem(80px);
    color: #fff;
    background-color: $blue;
    .middle {
      flex: 1;
      text-align: center;
    }
  }
  .title {
    margin: rem(20px);
  }
  .grid-content {
    margin: rem(10px) 0;
  }
  .flex {
    display: flex;
    align-items: center;
    height: rem(98px);
    font-size: rem(32px);
    color: #fff;
    background-color: $blue;
    .middle {
      flex: 1;
      text-align: center;
    }
  }
}
</style>



