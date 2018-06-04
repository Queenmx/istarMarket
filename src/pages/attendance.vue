<template>
	<div class="rooterEle report">
		<v-header title="出勤人数">
		</v-header>
        <div class="container">
            <ul>
                <li v-for="index in 2" :key="index">
                    <h3 class="wrap title">2012-12-12</h3>
                    <ul class="wrap sublist">
                        <li v-for="index in 2" :key="index" class="item">
                            <div class="flex">
                                <div class="time">17:00</div>
                                <div class="rest">
                                    <p class="strong">销售</p>
                                    <p>深圳市</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
		<ul>
			<li class="wrap item" v-for="(item,index) in arr" :key="index">
				<div class="item-main">
					<div class="avatar-wrap">
						<img class="avatar" :src="item.headPic">
					</div>
					<span>{{item.userName}}</span>
				</div>
				<div class="right">
					<span>{{item.date}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { getItem } from "@/util/util.js";
import { oaAttendance } from "@/util/axios.js";
export default {
  data() {
    return {
      arr: [],
      userInfo: getItem("userInfo")
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      var data = {
        companyId: this.userInfo.companyId,
        userId: this.userInfo.userId
      };
      let res = await oaAttendance(data);
      if (res.code == "0000") {
        this.arr = res.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.report {
  font-size: rem(28px);
  color: #666666;
  .title {
    height: rem(72px);
    line-height: rem(72px);
    font-size: rem(24px);
    color: #999999;
  }
  .sublist {
    background: #fff;
  }
  .item {
    padding: rem(12px) 0;
    &:not(:last-child) {
      border-bottom: rem(1px) solid $bdcolor;
    }
    .time {
      width: rem(136px);
      font-size: rem(32px);
      color: #333333;
    }
    .strong {
      font-size: rem(32px);
      color: #020202;
    }
  }
}
</style>