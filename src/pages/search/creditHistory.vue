<template>
	<div class="rooterEle creditHistory">
		<v-header title="历史记录">
		</v-header>
		<!-- <ul>
			<li class="item" v-for="(items,index) in list" :key="index" @click="goDetails(items)">
				<p>报告编号  {{items.reportId}}</p>
                <p>申请编号  {{items.applyNum}}</p>
                <p>报告时间  {{items.reportTime}}</p>
			</li>
		</ul> -->
        <!-- <div class="container-wrap"> -->
        <div class="container">
            <div class="subContainer" v-for="index in 2" :key="index">
                <h3 class="flex title-wrap">
                    <p class="title">2012年3月</p>
                    <p class="rest subTitle">
                        <span>查看详情</span>
                        <van-icon name="arrow" />
                    </p>
                </h3>
                <ul class="list">
                    <li class="wrap item" v-for="index in 2" :key="index">
                        <div>
                            <p class="flex subItem">
                                <span class="title">报告编号</span>
                                <span>111</span>
                            </p>
                            <p class="flex subItem">
                                <span class="title">姓名</span>
                                <span>111</span>
                            </p>
                            <p class="flex subItem">
                                <span class="title">电话号码</span>
                                <span>111</span>
                            </p>
                        </div>
                        <div class="footer-item">
                            <p class="flex subItem">
                                <span class="title">报告时间</span>
                                <span>111</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- </div> -->
	</div>
</template>
<script>
import { getItem } from "@/util/util";
import { creditHistory } from "@/util/axios";
export default {
  data() {
    return {
      list: [],
      userId: getItem("userInfo").userId
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      var data = {
        salerId: this.userId
      };
      let res = await creditHistory(data);
      if (res.code === "0000") {
        this.list = res.data.reportList;
      } else {
        this.$message(res.msg);
      }
    },
    goDetails(items) {
      // console.log(items);
      // let data={
      //   reportId:items.reportId
      // };
      // console.log(data)
      // let res = getDetails(data);
      // console.log(res)
      // console.log(res)
      this.$router.push({
        path: "/search/creditDetails",
        query: {
          reportId: items.reportId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.creditHistory {
  font-size: rem(28px);
  color: #333333;
  .container {
    padding-left: rem(30px);
    padding-right: rem(56px);
    height: 100%;
    overflow: auto;
  }
  .title-wrap {
    .title {
      position: relative;
      width: rem(162px);
      font-size: rem(32px);
      color: #2b2b2b;
      &::before {
        content: "";
        display: inline-block;
        position: absolute;
        left: rem(-28px);
        top: rem(12px);
        height: rem(16px);
        width: rem(16px);
        border-radius: 50%;
        background: #666666;
      }
    }
    .subTitle {
      margin-left: rem(10px);
      font-size: rem(24px);
      color: #4d7bff;
    }
  }
  .subContainer {
    position: relative;
    padding-top: rem(56px);
    padding-left: rem(22px);
    // border-left: rem(4px) solid #e4e3e3;
    &:not(:last-child):before {
      content: "";
      display: inline-block;
      position: absolute;
      left: 0;
      top: rem(85px);
      height: 100%;
      width: rem(4px);
      background: #e4e3e3;
    }
  }
  .list {
    padding-top: rem(30px);
  }
  .item {
    padding: 0 rem(44px);
    font-size: rem(28px);
    background: #fff;
    border: 1px solid $bdcolor;
    border-radius: rem(8px);
    &:not(:last-child) {
      margin-bottom: rem(32px);
    }
    .title {
      width: rem(162px);
      color: #666666;
    }
    .subItem {
      margin: rem(30px) 0;
    }
  }
  .lightBlack {
    color: #666666;
  }
  .footer-item {
    border-top: rem(1px) solid $bdcolor;
    color: #4d7bff;
    .title {
      color: #4d7bff;
    }
  }
}
</style>