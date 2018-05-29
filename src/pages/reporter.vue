<template>
	<div class="rooterEle report">
		<v-header title="日志提交人">
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
                <p class="title">2012-12月</p>
                <div class="flex item">
                    <div class="icon-wrap"><i class="icon-user-upload"></i></div>
                    <div class="rest flex">
                        <span class="name">行行行</span>
                        <span class="time">2110-11-12</span>
                    </div>
                </div>
			</li>
		</ul>
        <section>
        <p class="title">2012-12月</p>
        <ul>
            <li class="flex item">
                    <div class="icon-wrap"><i class="icon-user-upload"></i></div>
                    <div class="rest flex">
                        <span class="name">行行行</span>
                        <span class="time">2110-11-12</span>
                    </div>
            </li>
            <li class="flex item">
                    <div class="icon-wrap"><i class="icon-user-upload"></i></div>
                    <div class="rest flex">
                        <span class="name">行行行</span>
                        <span class="time">2110-11-12</span>
                    </div>
            </li>
        </ul>
        </section>
	</div>
</template>
<script>
import { oaIReport } from "@/util/axios.js";
import { setItem, getItem } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      arr: { name: "王昭君", date: "2018-1-12" },
      list: [],
      dateRange: this.$route.query.dateRange,
      userInfo: JSON.parse(getItem("userInfo"))
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = {
        dateRange: this.dateRange,
        userId: this.userInfo.userId,
        companyId: this.userInfo.companyId
      };
      data = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await oaIReport(data);
      res = JSON.parse(strDec(res, "ZND20171030APIMM"));
      console.log(res);
      this.list = res.dailyReportCommitList;
      sessionStorage.setItem("dateRange", this.dateRange);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.report {
  //   .item {
  //     display: flex;
  //     align-items: center;
  //     height: rem(100px);
  //     color: $grey;
  //     .item-main {
  //       flex: 1;
  //     }
  //   }
  .title {
    padding: 0 rem(44px);
    height: rem(76px);
    line-height: rem(76px);
    font-size: rem(24px);
    color: #999;
  }
  .item {
    height: rem(86px);
    font-size: rem(32px);
    color: #333333;
    background: #fff;
    &:not(:last-child) .rest {
      border-bottom: rem(1px) solid #eee;
    }
    .name {
      width: rem(218px);
      color: #020202;
    }
    .rest {
      padding-right: rem(44px);
      height: 100%;
    }
    .time {
      flex: 1;
      text-align: right;
    }
  }
  .icon-wrap {
    padding-left: rem(44px);
    width: rem(210px);
    box-sizing: border-box;
  }
  .icon-user-upload {
    @include icon(rem(44px), rem(44px));
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