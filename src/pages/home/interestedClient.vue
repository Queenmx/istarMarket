<template>
	<div class="interestedClient">
		<v-header @rightEvent="goRecord">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">意向客户</p>
			<span slot="right">抢单记录</span>
		</v-header>
		<ul>
			<li v-for="item in customerList" :key="item.customerId">
				<split></split>
				<div class="flex wrap item">
					<div class="rest">
						<div class="avatar-wrap">
							<img class="avatar" :src="item.headPic" >
						</div>
						<div class="inblock">
							<p>{{item.name}}</p>
							<p class="orange">{{item.applyMoney}}</p>
							<p class="grey">贷款期限：{{item.limitDay}}</p>
						</div>
					</div>
					<div class="btn" @click="grabOrder(item.customerId)"><span>抢单</span></div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { customerList } from "@/util/axios";
import { getItem } from "@/util/util";
export default {
  data() {
    return {
      companyId: JSON.parse(getItem("userInfo")).companyId,
      customerList: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      var data = {
        companyId: this.companyId,
        pageNum: 1,
        pageSize: 20
      };
      var res = await customerList(data);
      if (res.code === "0000") {
        this.customerList = res.data.customerList;
        console.log(res.data.customerList);
      }
    },
    grabOrder(customerId) {
      this.$router.push({
        name: "clientInfo",
        params: { customerId }
      });
    },
    goRecord() {
      this.$router.push({ path: "/home/orderRecord" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.interestedClient {
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
  .btn {
    width: rem(152px);
    height: rem(66px);
    line-height: rem(66px);
    text-align: center;
    color: #fff;
    background-color: #f94b4b;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #fdbbbb;
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