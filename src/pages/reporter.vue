<template>
	<div class="report">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">日志提交人</p>
		</v-header>
		<ul v-if="list&&list.length">
			<li class="wrap item" v-for="item in list" :key="item.dailyId">
				<div class="item-main">
					<div class="avatar-wrap">
						<img class="avatar" :src="item.headPic">
					</div>
					<span>{{item.realName}}</span>
				</div>
				<div>
					<span>{{item.addTime}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { oaIReport } from "@/util/axios.js";
import { setItem } from "@/util/util.js";
export default {
  data() {
    return {
      arr: { name: "王昭君", date: "2018-1-12" },
      list: [],
      dateRange: this.$route.query.dateRange
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = {
        dateRange: this.dateRange
      };
      let res = await oaIReport(data);
      this.list = res.dailyReportCommitList;
      sessionStorage.setItem("dateRange", this.dateRange);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.report {
  .item {
    display: flex;
    align-items: center;
    height: rem(100px);
    color: $grey;
    .item-main {
      flex: 1;
    }
  }
  .avatar-wrap {
    display: inline-block;
    padding-right: rem(10px);
  }
  .avatar {
    width: rem(60px);
    height: rem(60px);
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>