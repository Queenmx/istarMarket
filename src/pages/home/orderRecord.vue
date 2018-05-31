<template>
	<div class="rooterEle orderRecord">
		<v-header title="抢单记录">
		</v-header>
		<!-- <ul>
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
		</ul> -->
        <div>
            <p class="wrap title">2012-12-12</p>
            <ul class="wrap list-wrap">
                <li class="flex item">
                    <div class="rest">
                        <p class="strong name">小胖</p>
                        <p><span>贷款期限：</span><span>24期</span></p>
                    </div>
                    <div class="strong red">10000元</div>
                </li>
                <li class="flex item">
                    <div class="rest">
                        <p class="strong name">小胖</p>
                        <p><span>贷款期限：</span><span>24期</span></p>
                    </div>
                    <div class="strong red">10000元</div>
                </li>
            </ul>
        </div>
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
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      var res = await grabRecord(enData);
      let deData1 = strDec(res.data, "ZND20171030APIMM");
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
  background-color: $bgcolor;
  .list-wrap {
    background: #fff;
  }
  .title {
    height: rem(72px);
    line-height: rem(72px);
    font-size: rem(24px);
    color: #999999;
  }
  .item {
    align-items: center;
    height: rem(100px);
    font-size: rem(28px);
    &:not(:last-child) {
      border-bottom: rem(1px) solid #eee;
    }
    .name {
      color: #020202;
    }
  }
  .strong {
    font-size: rem(32px);
  }
  .red {
    color: #ff3f5e;
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