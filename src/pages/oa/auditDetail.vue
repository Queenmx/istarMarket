<template>
	<div class="rooterEle auditDetail">
		<v-header title="详情">
		</v-header>
        <div class="wrap">
            <div class="notepaper">
                <h3 class="title">{{applyInfo.addTime}}</h3>
                <div class="content">
                    <div class="base">
                        <p class="small">{{applyInfo.userName}}</p>
                        <p class="strong">{{applyInfo.lengthTime}}</p>
                        <p class="hint">
                            <span>{{type}}</span>
                            <span>时长(小时)</span>
                        </p>
                    </div>
                    <ul class="detail">
                        <li class="flex item">
                            <span class="item-title">审核编号</span>
                            <span class="rest black">{{serialNo}}</span>
                        </li>
                        <li class="flex item">
                            <span class="item-title">所在部门</span>
                            <span class="rest black">{{applyInfo.deptName}}</span>
                        </li>
                        <li class="flex item">
                            <span class="item-title">类型</span>
                            <span class="rest black">{{type}}</span>
                        </li>
                        <li class="item small">
                            <div>
                                <p>开始时间：{{applyInfo.beginTime}}</p>
                                <p>结束时间：{{applyInfo.endTime}}</p>
                                <p>事由：{{applyInfo.reason}}</p>
                            </div>
                            <div class="history">
                                <router-link to="/">
                                    <span>查看历史记录</span>
                                    <i class="icon-arrow-right"></i>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                    <van-row class="btn-group" v-if="applyInfo.status==0">
                        <van-col span="12" class="btn">
                            <div @click="deal(1)">拒绝</div>
                        </van-col>
                        <van-col span="12" class="btn blue">
                            <div @click="deal(0)">同意</div></van-col>
                    </van-row>
                </div>
            </div>
        </div>

		<!-- <split></split>
		<ul>
			<li class="wrap flex list-item">
				<span class="left">审核编号</span>
				<span class="rest">{{this.serialNo}}</span>
			</li>
            <li class="wrap flex list-item">
				<span class="left">所在部门</span>
				<span class="rest">{{list.deptName}}</span>
			</li>
      <li class="wrap flex list-item" v-if="listType[list.type-1]">
				<span class="left">类型</span>
				<span class="rest">{{listType[list.type-1]}}</span>
			</li>
       <li class="wrap flex list-item"  v-if="!listType[list.type-1]">
				<span class="left">类型</span>
				<span class="rest">{{this.type}}</span>
			</li>
      <li class="wrap flex list-item" v-if="type!='日报'&&type!='周报'&&type!='月报'&&type!='绩效'">
				<span class="left">开始时间</span>
				<span class="rest">{{list.beginTime}}</span>
			</li>
            <li class="wrap flex list-item" v-if="type!='日报'&&type!='周报'&&type!='月报'&&type!='绩效'">
				<span class="left">结束时间</span>
				<span class="rest">{{list.endTime}}</span>
			</li>
      <li class="wrap flex list-item" v-if="type!='日报'&&type!='周报'&&type!='月报'&&type!='绩效'">
				<span class="left">时长(小时)</span>
				<span class="rest">{{list.lengthTime}}</span>
			</li>
      <li class="wrap flex list-item" v-if="type!='日报'&&type!='周报'&&type!='月报'&&type!='绩效'">
				<span class="left">事由</span>
				<span class="rest">{{list.reason}}</span>
			</li>
       <li class="wrap flex list-item"  v-if="type!='日报'&&type!='周报'&&type!='月报'&&type!='绩效'">
				<span class="left">审批意见</span>
				<span class="rest">{{remarks}}</span>
			</li>
      <li class="wrap flex list-item"  v-if="type!='请假'&&type!='外出'&&type!='加班'&&type!='绩效' && type ==='日报'">
				<span class="left">今日已完成</span>
				<span class="rest">{{list.done}}</span>
			</li>
       <li class="wrap flex list-item"  v-if="type!='请假'&&type!='外出'&&type!='加班'&&type!='绩效' && type ==='周报'">
				<span class="left">本周已完成</span>
				<span class="rest">{{list.done}}</span>
			</li>
       <li class="wrap flex list-item"  v-if="type!='请假'&&type!='外出'&&type!='加班'&&type!='绩效' && type ==='月报'">
				<span class="left">本月已完成</span>
				<span class="rest">{{list.done}}</span>
			</li>
       <li class="wrap flex list-item"  v-if="list.notDone">
				<span class="left">未完成</span>
				<span class="rest">{{list.notDone}}</span>
			</li>
       <li class="wrap flex list-item"  v-if="list.summary">
				<span class="left">工作总结</span>
				<span class="rest">{{list.summary}}</span>
			</li>
      <li class="wrap flex list-item"  v-if="list.workPlan && type!='绩效'">
				<span class="left">工作计划</span>
				<span class="rest">{{list.workPlan}}</span>
			</li>
      <li class="wrap flex list-item"  v-if="list.coordinate">
				<span class="left">需协调工作</span>
				<span class="rest">{{list.coordinate}}</span>
			</li>
      <li class="wrap flex list-item"  v-if="type!='请假'&&type!='外出'&&type!='加班'&&type!='绩效'">
				<span class="left">备注</span>
				<span class="rest">{{list.remark}}</span>
			</li>
     <li class="wrap flex list-item" v-if="list.preTask">
				<span class="left">上月工作任务</span>
				<span class="rest">{{list.preTask}}</span>
			</li>
      <li class="wrap flex list-item" v-if="list.preFinishTask">
				<span class="left">上月完成任务</span>
				<span class="rest">{{list.preFinishTask}}</span>
			</li>
      <li class="wrap flex list-item" v-if="list.rate">
				<span class="left">达成率</span>
				<span class="rest">{{list.rate}}</span>
			</li>
      <li class="wrap flex list-item" v-if="list.selfEvaluate">
				<span class="left">自评</span>
				<span class="rest">{{list.selfEvaluate}}</span>
			</li>
      <li class="wrap flex list-item" v-if="list.workTask">
				<span class="left">工作任务</span>
				<span class="rest">{{list.workTask}}</span>
			</li>
       <li class="wrap flex list-item" v-if="list.workPlan && type ==='绩效'">
				<span class="left">工作计划</span>
				<span class="rest">{{list.workPlan}}</span>
			</li>
		</ul> -->
	</div>
</template>
<script>
import { oaFlowInfo, oaAuditSuggestion } from "@/util/axios.js";
export default {
  data() {
    return {
      applyId: this.$route.query.applyId,
      mainId: this.$route.query.mainId,
      type: this.$route.query.type,
      serialNo: this.$route.query.serialNo,
      listPlan: [],
      listType: ["事假", "病假", "产假", "陪产假", "调休", "婚假"],
      labelList: ["通过", "拒绝", "发起审批", "进行中"],
      applyInfo: {},
      remarks: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      var data = {
        type: this.type,
        mainId: this.mainId,
        applyId: this.applyId
      };
      let res = await oaFlowInfo(data);
      if (res.code === "0000") {
        this.applyInfo = res.data.info;
        console.log(res.data);
      } else {
        this.$toast(res.msg);
      }
    },
    async deal(flag) {
      let data = {
        mainId: this.mainId,
        flag: flag
      };
      let res = await oaAuditSuggestion(data);
      this.$toast(res.msg);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.auditDetail {
  font-size: rem(32px);

  color: #333333;
  .detail {
    .item-title {
      width: rem(174px);
    }
  }
  .small {
    font-size: rem(28px);
  }
  .hint {
    font-size: 0;
    span {
      font-size: rem(28px);
    }
  }
  .base {
    padding-top: rem(32px);
    padding-bottom: rem(28px);
    text-align: center;
    .strong {
      line-height: rem(84px);
      font-size: rem(72px);
      color: #020202;
    }
  }
  .item {
    padding: rem(33px) rem(28px);
    border-bottom: rem(1px) solid $bdcolor;
  }
  .black {
    color: #020202;
  }
  .btn-group {
    padding: rem(28px) 0;
  }
  .btn {
    height: rem(54px);
    line-height: rem(54px);
    &:not(:last-child) {
      border-right: rem(1px) solid $bdcolor;
    }
  }
  .history {
    margin-top: rem(16px);
    text-align: center;
    font-size: rem(24px);
    a {
      color: #666666;
    }
  }
  .icon-arrow-right {
    @include icon(rem(19px), rem(28px));
    vertical-align: middle;
  }
  .btn-group {
    text-align: center;
  }
}
</style>