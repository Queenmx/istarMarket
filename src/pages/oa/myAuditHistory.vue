<template>
	<div class="audit">
		<v-header class="wrap">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">申请记录</p>
		</v-header>
				<ul v-if="list && list.length">
					<li class="wrap flex item" @click="goAudit(item)"  v-for="(item,index) in list" :key="index" >
						<div class="rest">
							<div class="avatar-wrap">
								<img class="avatar" :src="item.headPic">
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
								<p class="red" v-if="item.status!=0">
                                    <span>{{statusText[item.status]}}</span>
                                </p>
                                <p class="orange" v-else>
                                    <span>待审核</span>
                                </p>
							</div>
						</div>
						<div class="greyTime">
							<span>{{item.addTime}}</span>
						</div>
					</li>
				</ul>
                <p v-else class="none">暂无数据</p>
	</div>
</template>
<script>
import Bus from "../../util/Bus.js";
import { getItem, checkSys } from "@/util/util.js";
import { oaAuditHistory } from "@/util/axios.js";
import { strEnc, strDec } from '@/util/aes.js'
export default {
  data() {
    return {
      list: [],
      userId: JSON.parse(getItem("userInfo")).userId,
      statusText: ["待审批", "同意", "拒绝"]
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = {
        userId: this.userId
      };
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res = await oaAuditHistory(enData);
      let deData1 = strDec(res,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.list = deData.data;
      }
    },
    goAudit(item) {
      this.$router.push({
        path: "/oaSystem/auditDetail",
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
@import "../../assets/style/common.scss";
.audit {
  .avatar-wrap {
    vertical-align: top;
  }
  .avatar {
    width: rem(91px);
    height: rem(94px);
  }
  .item {
    align-items: stretch;
    padding-top: rem(22px);
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
      color: $grey;
      width: rem(135px);
      //   text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .none {
    text-align: center;
    font-size: rem(30px);
  }
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.audit {
  .el-tabs__item {
    height: rem(80px);
    line-height: rem(80px);
    font-size: rem(30px);
  }
}
</style>
