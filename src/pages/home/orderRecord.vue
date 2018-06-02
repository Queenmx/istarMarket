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
        <van-list  v-model="loading" :finished="finished" @load="onLoad">
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
        </van-list>
	</div>
</template>
<script>
import { grabRecord } from "@/util/axios";
import { getItem } from "@/util/util";
export default {
  data() {
    return {
      userId: getItem("userInfo").userId,
      customerList: [],
      pageSize: 10,
      pageNum: 1,
      totalPage: "",
      loading: false,
      finished: false
    };
  },
  methods: {
    //获取抢单记录
    async getGrabRecord(fn) {
      var data = {
        userId: this.userId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      var res = await grabRecord(data);
      if (res.code === "0000") {
        this.customerList = this.customerList.concat(res.data.customerList);
        this.totalPage = res.data.totalPage;
        this.pageNum++;
        fn && fn();
      } else {
        this.$toast(res.msg);
      }
    },
    goDetail(customerId) {
      this.$router.push({
        path: "/home/clientInfo",
        query: { customerId: customerId, isGrab: true }
      });
    },
    //加载更多
    onLoad() {
      this.getGrabRecord(() => {
        this.loading = false;
        this.finished = true;
        if (this.totalPage < this.pageNum) {
          this.finished = true;
        }
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