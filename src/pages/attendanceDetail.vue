<template>
	<div class="attendanceDetail">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">出勤天数</p>
		</v-header>
		<ul class="wrap">
			<li v-for="index in 5" class="wrap flex item">
				<span class="rest">{{list.time}}</span>
				<span>{{list.day}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				list:{time:'2018-1-11',day:'星期四'}
			}
		}
	}
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.attendanceDetail{
	.item{
		margin:rem(10px) 0;
		height: rem(80px);
		border:1px solid $bdcolor;
		border-radius: 5px;
	}
}
</style>