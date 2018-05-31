<template>
	<div class="rooterEle audit">
		<v-header title="待我审核">
            <p slot="right"><router-link to="/oaSystem/myAuditHistory" class="icon-pannel"></router-link></p>
		</v-header>
        <van-tabs v-model="active">
            <van-tab title="待我审核（2）">
                <ul class="wrap">
                    <li class="notepaper item">
                        <h3 class="title">请假单(xxx)</h3>
                        <div class="content">
                            <div class="flex">
                            <p class="hint">
                                <i class="icon-clock-red"></i>
                                <span>开始时间</span>
                            </p>
                            <p class="rest">2010-11-11 09:00</p>
                        </div>
                        <div class="flex">
                            <p class="hint">
                                <i class="icon-clock-yellow"></i>
                                <span>结束时间</span>
                            </p>
                            <p class="rest">2010-11-11 09:00</p>
                        </div>
                        </div>
                        <div class="time">2012-12-12</div>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="已审核">
                <ul class="wrap">
                    <li class="notepaper item">
                        <h3 class="title">
                            <span>请假单(xxx)</span>
                            <van-tag class="tag pass">标签</van-tag>
                            <!-- <van-tag class="tag notpass">标签</van-tag> -->
                        </h3>
                        <div class="content">
                            <div class="flex">
                            <p class="hint">
                                <i class="icon-clock-red"></i>
                                <span>开始时间</span>
                            </p>
                            <p class="rest">2010-11-11 09:00</p>
                        </div>
                        <div class="flex">
                            <p class="hint">
                                <i class="icon-clock-yellow"></i>
                                <span>结束时间</span>
                            </p>
                            <p class="rest">2010-11-11 09:00</p>
                        </div>
                        </div>
                        <div class="time">2012-12-12</div>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
		<!-- <el-tabs v-model="activeName">
			<el-tab-pane label="待我审批的" name="first">
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
                                <p class="orange">
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
			</el-tab-pane>
			<el-tab-pane label="我已审批的" name="second">
				<ul v-if="listData && listData.length">
					<li class="wrap flex item" @click="goAudit(item)" v-for="(item,i) in listData" :key="i">
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
								<p class="red">
                                    <span>{{statusText[item.status]}}</span>
                                </p>
							</div>
						</div>
						<div class="greyTime">
							<span>{{item.addTime}}</span>
						</div>
					</li>
				</ul>
                <p v-else class="none">暂无数据</p>
			</el-tab-pane>
		</el-tabs> -->
	</div>
</template>
<script>
import Bus from "../../util/Bus.js";
import { getItem, checkSys } from "@/util/util.js";
import { oaWaitQuery, oaAlready } from "@/util/axios.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      activeName: "first",
      list: "",
      listData: [],
      index: "",
      status: "",
      value: "",
      statusText: ["进行中", "同意", "拒绝"]
    };
  },
  // created(){
  //   Bus.$on("params",value=>{
  //     console.log(value)
  //   }
  //   )
  // },
  created() {},
  mounted() {
    document.getElementsByClassName("van-tabs__line")[0].style.width = "25px";
    document.getElementsByClassName("van-tabs__line")[0].style.transform =
      "translateX(-50%)";
    this.initData();
    this.query();
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
    },
    async initData() {
      await this.wait();
      await this.already();
    },
    async query() {
      Bus.$on("params", value => {
        console.log(value);
      });
    },
    async wait() {
      getItem("userinfo");
      getItem("approver");
      // getItem('sendto')
      getItem("approverOutId");
      getItem("approverOvertimeWorkId");
      // console.log(localStorage);
      // console.log(value)
      let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        userId: userinfo.userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaWaitQuery(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.list = deData.data;
        // console.log(res.data);
      }
    },
    async already() {
      getItem("userinfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        userId: userinfo.userId
      };
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaAlready(enData);
      let deData1 = strDec(res, "ZND20171030APIMM");
      // console.log(deData1);
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.listData = deData.data;
      }
    },
    goHistory() {
      this.$router.push({ path: "/oaSystem/myAuditHistory" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.audit {
  font-size: rem(32px);
  color: #333333;
  text-align: center;
  .icon-pannel {
    @include icon(rem(36px), rem(36px));
  }
  .icon-clock-red,
  .icon-clock-yellow {
    vertical-align: middle;
    @include icon(rem(30px), rem(30px));
  }
  .title {
    color: #020202;
    height: rem(90px);
    line-height: rem(90px);
    border-bottom: rem(1px) solid #eee;
  }
  .item {
    padding-bottom: rem(14px);
    .time {
      font-size: rem(28px);
      color: #666666;
    }
    .content {
      padding: rem(36px) rem(52px) rem(26px) rem(94px);
    }
    .title {
      position: relative;
      .tag {
        position: absolute;
        right: rem(50px);
        top: rem(30px);
      }
    }
  }
  /////
  .avatar-wrap {
    vertical-align: top;
  }
  .avatar {
    width: rem(91px);
    height: rem(94px);
  }
  //   .item {
  //     align-items: stretch;
  //     padding-top: rem(22px);
  //     padding-bottom: rem(22px);
  //     line-height: rem(44px);
  //     font-size: rem(24px);
  //     border-bottom: 1px solid $bdcolor;
  //     .title {
  //       // margin-bottom: rem(27px);
  //       line-height: rem(64px);
  //       color: #323232;
  //       font-size: rem(32px);
  //       font-weight: 600;
  //     }
  //     .grey {
  //       color: $grey;
  //     }
  //     .orange {
  //       color: #ffa81e;
  //     }
  //     .red {
  //       color: #f94b4b;
  //     }
  //     .greyTime {
  //       color: $grey;
  //       width: rem(135px);
  //       //   text-overflow: ellipsis;
  //       white-space: nowrap;
  //       overflow: hidden;
  //     }
  //   }
  //   .none {
  //     text-align: center;
  //     font-size: rem(30px);
  //   }
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.audit {
  .van-tab--active {
    color: #4d7bff;
  }
  .van-tabs__line {
    background: #4d7bff;
  }
  .van-hairline--top-bottom::after {
    border: none;
  }
}
</style>
