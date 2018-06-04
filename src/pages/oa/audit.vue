<template>
	<div class="rooterEle audit">
		<v-header title="待我审核">
            <p slot="right"><router-link to="/oaSystem/myAuditHistory" class="icon-pannel"></router-link></p>
		</v-header>
        <div class="container">
        <van-tabs v-model="active">
            <van-tab :title="'待我审核('+waitList.length+')'">
                <ul class="wrap" v-if="waitList.length">
                    <li class="notepaper item" v-for="item in waitList" :key="item.applyId">
                        <h3 class="title">{{item.type}}单({{item}})</h3>
                        <div class="content">
                            <div class="flex">
                            <p class="hint">
                                <i class="icon-clock-red"></i>
                                <span>开始时间</span>
                            </p>
                            <p class="rest">{{item.beginTime}}</p>
                        </div>
                        <div class="flex">
                            <p class="hint">
                                <i class="icon-clock-yellow"></i>
                                <span>结束时间</span>
                            </p>
                            <p class="rest">{{item.endTime}}</p>
                        </div>
                        </div>
                        <div class="time">{{item.addTime}}</div>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="已审核">
                <ul class="wrap" v-if="alreadyList.length">
                    <li class="notepaper item" v-for="item in alreadyList" :key="item.applyId" @click="goAudit(item)">
                        <h3 class="title">
                            <span>{{item.type}}单(xxx)</span>
                            <van-tag v-if="item.status==0" class="tag tag-orange">进行中</van-tag>
                            <van-tag v-else-if="item.status==1" class="tag tag-blue">同意</van-tag>
                            <van-tag v-else-if="item.status==2" class="tag tag-red">不同意</van-tag>
                        </h3>
                        <div class="content">
                            <div class="flex">
                            <p class="hint">
                                <i class="icon-clock-red"></i>
                                <span>开始时间</span>
                            </p>
                            <p class="rest">{{item.beginTime}}</p>
                        </div>
                        <div class="flex">
                            <p class="hint">
                                <i class="icon-clock-yellow"></i>
                                <span>结束时间</span>
                            </p>
                            <p class="rest">{{item.endTime}}</p>
                        </div>
                        </div>
                        <div class="time">{{item.addTime}}</div>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
        </div>
	</div>
</template>
<script>
import { getItem, formateTime } from "@/util/util.js";
import { oaWaitQuery, oaAlready } from "@/util/axios.js";
export default {
  data() {
    return {
      active: 0,
      userInfo: getItem("userInfo"),
      waitList: [], //待审核
      alreadyList: [], //已审核
      statusText: ["进行中", "同意", "拒绝"]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
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
    },
    async init() {
      await this.wait();
      await this.already();
    },
    //获取待审核
    async wait() {
      var data = {
        userId: this.userInfo.userId
      };
      let res = await oaWaitQuery(data);
      if (res.code === "0000") {
        this.waitList = res.data;
      } else {
        this.$toast(res.msg);
      }
    },
    //获取已审核
    async already() {
      var data = {
        userId: this.userInfo.userId
      };
      let res = await oaAlready(data);
      if (res.code === "0000") {
        console.log(res.data);
        this.alreadyList = res.data;
      } else {
        this.$toast(res.msg);
      }
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
  .container {
    padding-bottom: rem(40px);
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
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
