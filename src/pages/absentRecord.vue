<template>
	<div class="absentRecord">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">旷工</p>
		</v-header>
		<div>
			<attendance-list></attendance-list>
		</div>
	</div>
</template>
<script>
import attendanceList from "../components/attendanceList"
export default{
	components:{
		attendanceList
	}
}
</script>