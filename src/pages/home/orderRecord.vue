<template>
	<div class="orderRecord">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">抢单记录</p>
		</v-header>
		<ul>
			<li v-for="item in customerList" :key="item.customerId">
				<split></split>
				<div class="flex wrap item" @click="goDetail(item.customerId)">
					<div class="rest">
						<div class="avatar-wrap">
							<img class="avatar" src="http://xrjf.oss-cn-shanghai.aliyuncs.com/xgf/platform/f4328fd041ca46859e37.png" >
						</div>
						<div class="inblock">
							<p>{{item.name}}</p>
							<p class="orange">{{item.applyMoney}}元</p>
							<p class="grey">贷款期限：{{item.limitDay}}</p>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { grabRecord } from "@/util/axios";
import { getItem } from "@/util/util";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      userId: JSON.parse(getItem("userInfo")).userId,
      customerList: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      var data = {
        userId: this.userId,
        pageSize: 10,
        pageNum: 1
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      var res = await grabRecord(enData);
      let deData1 = strDec(res.data,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (res.code === "0000") {
        this.customerList = deData.customerList;
      }
    },
    grabOrder(customerId) {
      this.$router.push({ path: "/home/clientInfo" });
    },
    goDetail(customerId) {
      this.$router.push({
        name: "clientInfo",
        params: { customerId: customerId, isGrab: true }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.orderRecord {
  min-height: 100%;
  background-color: $bgcolor;
  .item {
    align-items: center;
    height: rem(200px);
    font-size: rem(30px);
    background-color: #fff;
  }
  .orange {
    color: #f3693b;
  }
  .grey {
    color: $grey;
  }
  .avatar {
    width: rem(120px);
    height: rem(120px);
    vertical-align: middle;
  }
  .inblock {
    vertical-align: middle;
  }
}
</style>