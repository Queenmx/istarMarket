<template>
	<div class="auditList">
		<ul>
			<li class="wrap flex item" @click="goAudit(item)" v-for="(item,i) in list" :key="i">
				<div class="rest">
					<div class="avatar-wrap">
						<img class="avatar" src="../assets/images/avatar.jpg">
					</div>
					<div class="inblock">
						<p class="title">{{item.title}}</p>
						<p class="grey">
							<span>类型：</span>
							<span>{{item.type}}</span>
						</p>
						<p class="grey">
							<span>开始时间：</span>
							<span>{{item.beginTime}}</span>
						</p>
						<p class="grey">
							<span>结束时间：</span>
							<span>{{item.endTime}}</span>
						</p>
                        <p class="red" v-if="item.status">
                            <span>已审批</span>
                        </p>
                        <p class="orange" v-else>
                            <span>待审核</span>
                        </p>
					</div>
				</div>
				<div class="greyTime">
					<span>{{item.updateTime}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    goAudit(item) {
      this.$router.push({
        path: "/oaSystem/myAuditing",
        query: {
          applyId: item.applyId,
          mainId: item.mainId,
          type: item.type,
          serialNo: item.serialNo
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.auditList {
  .avatar-wrap {
    vertical-align: top;
  }
  .avatar {
    width: rem(91px);
    height: rem(94px);
  }
  .item {
    align-items: stretch;
    padding-bottom: rem(22px);
    line-height: rem(44px);
    font-size: rem(24px);
    border-bottom: 1px solid $bdcolor;
    .title {
      // margin-bottom: rem(27px);
      line-height: rem(64px);
      color: #323232;
      font-size: rem(32px);
      font-weight: 600;
    }
    .grey {
      color: $grey;
    }
    .orange {
      color: #ffa81e;
    }
    .red {
      color: #f94b4b;
    }
    .greyTime {
      color: #888;
      width: 1.8rem;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>