<template>
	<div class="myAuditing">
		<v-header class="wrap">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">详情</p>
		</v-header>
		<split></split>
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
            <li class="wrap flex list-item">
				<span class="left">开始时间</span>
				<span class="rest">{{list.beginTime}}</span>
			</li>
            <li class="wrap flex list-item">
				<span class="left">结束时间</span>
				<span class="rest">{{list.endTime}}</span>
			</li>
      <li class="wrap flex list-item" v-if="list.lengthTime">
				<span class="left">时长(小时)</span>
				<span class="rest">{{list.lengthTime}}</span>
			</li>
      <li class="wrap flex" id="spread" v-if="list.reason">
				<span class="left">事由</span>
				<span class="rest">{{list.reason}}</span>
			</li>
       <li class="wrap flex list-item" v-if="list.done">
				<span class="left">完成工作</span>
				<span class="rest">{{list.done}}</span>
			</li>
      <li class="wrap flex list-item" v-if="list.notDone">
				<span class="left">未完成工作</span>
				<span class="rest">{{list.notDone}}</span>
			</li>
      <li class="wrap flex list-item" v-if="list.coordinate">
				<span class="left">需协调</span>
				<span class="rest">{{list.coordinate}}</span>
			</li>
       <li class="wrap flex list-item" v-if="list.summary">
				<span class="left">总结</span>
				<span class="rest">{{list.summary}}</span>
			</li>
      <!-- <li class="wrap flex list-item" v-if="list.workPlan">
				<span class="left">工作计划</span>
				<span class="rest">{{list.workPlan}}</span>
			</li> -->
      <li class="wrap flex list-item" v-if="list.remark">
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
       <li class="wrap flex list-item" v-if="list.workPlan">
				<span class="left">工作计划</span>
				<span class="rest">{{list.workPlan}}</span>
			</li>
		</ul>
        <div v-if="type!='日报'&&type!='周报'&&type!='月报'&&type!='绩效'">
		<split></split>
        
		<div class="wrap flex list-item" @click="goHistory">
			<span class="rest">查看历史记录</span>
			<i class="grey el-icon-arrow-right"></i>
		</div>
		<div class="wrap">
			<div class="flex item" :class="index > 0 ? 'line-top' : ''" v-for="(item,index) in listPlan" :key="index">
				<div class="first">
					<div class="avatar-wrap">
						<img class="avatar" :src="item.headPic">
					</div>
					<div class="inblock name-wrap">
						<span class="name">{{item.userName}}</span>
					</div>
				</div>
				<div class="rest">
					<span class="status">{{labelList[item.flag]}}</span>
				</div>
				<div>
					<span class="time">{{item.updateTime}}</span>
				</div>
			</div>
		</div>
        </div>
        <!-- {{item.type}} -->
            <div class="footer flex" v-if="list.status =='0'&&type!='日报'&&type!='周报'&&type!='月报'&&type!='绩效'">
                <span class="rest" @click="detailApply('agree')">同意</span>
                <span class="rest" @click="detailApply('disagree')">拒绝</span>
            </div>
            <!-- <div class="footer2" v-else-if="list.status=='0'" @click="detailApply('agree')">提交</div> -->
		
	</div>
</template>
<script>
import { oaFlowInfo } from "@/util/axios.js";
export default {
  data() {
    return {
      applyId: this.$route.query.applyId,
      mainId: this.$route.query.mainId,
      type: this.$route.query.type,
      serialNo: this.$route.query.serialNo,
      status: this.$route.params.status == "auditing" ? 1 : 0,
      listPlan: [],
      listType: ["事假", "病假", "产假", "陪产假", "调休", "婚假"],
      labelList: ["通过", "拒绝", "发起审批", "进行中"],
      list: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    goHistory() {
      this.$router.push({
        path: "/oaSystem/auditHistory",
        query: {
          type: this.type
        }
      });
    },
    detailApply(str) {
      this.$router.push({
        name: "auditSuggestion",
        params: { status: str, mainId: this.mainId }
      });
    },
    async initData() {
      var data = {
        type: this.type,
        mainId: this.mainId,
        applyId: this.applyId
      };

      let res = await oaFlowInfo(data);
      if (res.code === "0000") {
        this.list = res.data.info;
        console.log(res.data.info);
        console.log(this.list.status);
        this.listPlan = res.data.operateList;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.myAuditing {
  min-height: 100%;
  padding-bottom: rem(105px);
  box-sizing: border-box;
  ul {
    background: #fff;
  }
  .grey {
    color: $grey;
  }
  .item {
    padding-top: rem(30px);
  }
  .list-item {
    height: rem(98px);
    line-height: rem(32px);
    font-size: rem(30px);
    color: $black;
    border-bottom: 1px solid $bdcolor;
    .left {
      width: rem(192px);
      color: $grey;
    }
  }
  #spread {
    // height: rem(98px);
    line-height: rem(70px);
    font-size: rem(30px);
    color: $black;
    border-bottom: 1px solid $bdcolor;
    // background-color: #f00;
    .left {
      color: #888;
      width: 2.56rem;
    }
    .rest {
      //  overflow: hidden;
      // text-overflow:ellipsis;
      // display:-webkit-box;
      // -webkit-box-orient:vertical;
      // -webkit-line-clamp:2;
    }
  }
  // .spread{
  //   font-size:rem(30px)
  //   .left{
  //     font-size:rem(30px);
  //     display: inline-block;
  //     width: rem(192px);
  //     color: $grey;
  //   }
  // }
  .line-top {
    position: relative;
    &:before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      left: rem(45px);
      height: rem(30px);
      width: 1px;
      background: $blue;
    }
  }
  .first {
    width: rem(262px);
  }
  .avatar {
    width: rem(91px);
    height: rem(91px);
  }
  .name-wrap {
    vertical-align: middle;
    width: rem(80px);
    white-space: nowrap;
    text-overflow: ellipsis;
    // overflow: hidden;
  }
  .name {
    font-size: rem(32px);
    color: #656565;
  }
  .time {
    font-size: rem(24px);
    color: #979797;
  }
  .rest {
    text-align: center;
    .status {
      font-size: rem(32px);
      color: $black;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: rem(22px) 0;
    height: rem(100px);
    justify-content: center;
    box-sizing: border-box;
    border-top: 1px solid $bdcolor;
    background-color: #fff;
    span {
      font-size: rem(32px);
      text-align: center;
    }
    span:first-child {
      color: $blue;
      border-right: 1px solid $bdcolor;
    }
  }
  .footer2 {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: rem(100px);
    line-height: rem(100px);
    text-align: center;
    font-size: rem(28px);
    color: #fff;
    background-color: $blue;
  }
}
</style>