<template>
	<div class="clockDetail">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">打卡明细</p>
		</v-header>
		<el-tabs v-model="activeName">
		    <el-tab-pane label="已打卡(1)" name="first">
		    	<div class="wrap">
		    		<el-tag>全部已打卡(1)</el-tag>
		    		<el-tag type="info">正常打卡(1)</el-tag>
		    	</div>
		    	<attendance-list></attendance-list>
		    </el-tab-pane>
		    <el-tab-pane label="应到但未打卡(3)" name="second">
		    	<div class="wrap">
		    		<el-tag>全部未打卡(1)</el-tag>
		    		<el-tag type="info">缺卡(1)</el-tag>
		    	</div>
		    	<div class="wrap hit">当日应打卡但未打卡的人，不包含全天请假、休息或未排班</div>
		    	<attendance-list></attendance-list>
		    </el-tab-pane>
		 </el-tabs>
	</div>
</template>
<script>
	import attendanceList from "../components/attendanceList"
	export default{
		data () {
			return {
				activeName:'first'
			}
		},
		components:{
			attendanceList
		}
	}
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.clockDetail{
	.hit{
		margin-top: rem(20px);
		height: rem(80px);
		line-height: rem(80px);
		background: $bgcolor;
	}
}
</style>