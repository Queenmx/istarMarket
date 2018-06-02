<template>
	<div class="rooterEle interestedClient">
		<v-header title="意向客户">
			<p slot="right">
                <router-link to="/home/orderRecord" class="icon-pannel"></router-link>
            </p>
		</v-header>
         <van-list  v-model="loading" :finished="finished" @load="onLoad">
            <ul>
                <li v-for="item in customerList" :key="item.customerId">
                    <split></split>
                    <div class="flex wrap item">
                        <div class="rest">
                            <div class="title">
                                <i class="icon-dashboard"></i>
                                <span>贷款期限</span>
                                <p class="period">
                                    <span class="blue">{{item.limitDay}}</span>
                                    <span>期</span>
                                </p>
                                <van-tag class="tag" v-if="item.userId">已抢单</van-tag>
                            </div>
                            <div class="flex main">
                                <span class="name">{{item.name}}</span>
                                <p class="rest red price-group">
                                    <small>￥</small>
                                    <span class="price">{{item.applyMoney}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="icon-wrap">
                            <i class="font-qiang" @click="grabOrder(item.customerId,item.userId)"></i>
                        </div>
                    </div>
                </li>
            </ul>
         </van-list>
	</div>
</template>
<script>
import { customerList } from "@/util/axios";
import { getItem } from "@/util/util";
export default {
  data() {
    return {
      companyId: getItem("userInfo").companyId,
      customerList: [],
      pageNum: 1,
      pageSize: 10,
      totalPage: "",
      loading: false,
      finished: false
    };
  },
  methods: {
    //获取意向客户
    async getCustomerList(fn) {
      var data = {
        companyId: this.companyId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      var res = await customerList(data);
      if (res.code === "0000") {
        this.customerList = this.customerList.concat(res.data.customerList);
        this.totalPage = res.data.totalPage;
        this.pageNum++;
        fn && fn();
      } else {
        this.$toast(res.msg);
      }
    },
    grabOrder(customerId, userId) {
      if (userId) {
        this.$toast("已抢单，请勿重复抢单");
      } else {
        this.$router.push({
          path: "/home/clientInfo",
          query: { customerId }
        });
      }
    },
    //加载更多
    onLoad() {
      this.getCustomerList(() => {
        this.loading = false;
        if (this.totalPage < this.pageNum) {
          this.finished = true;
        }
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
  background-color: $bgcolor;
  .icon-pannel {
    @include icon(rem(36px), rem(36px));
  }
  .font-qiang {
    @include icon(rem(84px), rem(84px));
  }
  .icon-dashboard {
    vertical-align: middle;
    @include icon(rem(36px), rem(36px));
  }
  .done {
    position: absolute;
    top: rem(5px);
    font-size: rem(12px);
    right: rem(15px);
    background-color: grey;
    color: #fff;
  }
  .item {
    position: relative;
    align-items: center;
    height: rem(182px);
    font-size: rem(28px);
    color: #333333;
    background-color: #fff;
    .period {
      display: inline-block;
      margin: 0 rem(70px) 0 rem(34px);
      font-size: 0;
      span {
        font-size: rem(28px);
      }
    }
    .tag {
      font-size: rem(20px);
      color: #ff8626;
      background: #ffe8d5;
      ::after {
        border: none;
      }
    }
    .main {
      margin-top: rem(44px);

      color: #020202;
      .price-group {
        font-size: 0;
      }
      .price {
        font-size: rem(32px);
      }
      .name {
        padding-left: rem(44px);
        width: rem(230px);
      }
      small {
        font-size: rem(24px);
      }
    }
  }
  .blue {
    color: #4d7bff;
  }
  .red {
    color: #fb4b4b;
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
  .avatar-wrap {
    position: relative;
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