<template>
	<ul class="attendanceList">
		<li class="wrap item flex" v-for="(index) in 5">
			<div class="rest">
				<div class="avatar-wrap">
					<img class="avatar" src="../assets/images/avatar.jpg" >
				</div>
				<div class="inblock">
					<p>舜</p>
					<p>上海星融金服</p>
				</div>
			</div>
			<div>
				<span>一班上班</span>
			</div>
		</li>
	</ul>
</template>
<script>
export default{
	props:{
		data:{
			type:Array
		}
	}
}
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.attendanceList{
	.item{
		height: rem(100px);
		border-bottom: 1px solid $bdcolor;
	}
	.inblock{
		vertical-align: middle;
	}
}
</style>