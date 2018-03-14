<template>
	<div class="lateRecord">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">迟到</p>
		</v-header>
		<div>
			<attendance-list></attendance-list>
		</div>
	</div>
</template>
<script>
import attendanceList from "../components/attendanceList";
export default {
  components: {
    attendanceList
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
</style>