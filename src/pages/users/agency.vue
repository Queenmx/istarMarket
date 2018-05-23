<template>
  <div class="agency"> 
    <v-header class="header">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">我的订单</p>
		</v-header>
    <ul>
			<li v-for="item in items" :key="item.orderId">
				<split></split>
				<div class="flex wrap item">
					 <div class="fr">
            <span>{{item.proName}}</span>
            <p>{{item.customerName}}</p>
          </div>
          <div class="sr">
            <div class="d"><span>{{item.addtime}}</span></div>
            <p>{{item.status}}</p>
          </div>
			
				</div>
			</li>
		</ul>
    <el-pagination  :page-size="10"  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next"
:total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
import { getAgency } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { setItem } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      currentPage: 1,
      items: "",
      totalNum: 0
      //   status: ["", "客户登记", "业务受理", "合同签约", "放款处理", "数据审核"]
    };
  },
  mounted() {
    this.initLocal();
    this.initData();
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange(e) {
      setItem("currentPage", e);
      this.initData();
    },
    async initLocal() {
      setItem("currentPage", 1);
    },
    async initData() {
      getItem("userinfo");
      getItem("currentPage");

      let userinfo = JSON.parse(localStorage.userInfo);
      console.log(userinfo.userId);
      var data = {
        userId: userinfo.userId,
        pageNum: parseInt(localStorage.currentPage),
        pageSize: 10
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res = await getAgency(enData);
      let deData1 = strDec(res.data,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (res.code === "0000") {
        this.items = deData.xbConsumeList;
        this.totalNum = parseInt(deData.total);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.agency {
  width: 100%;
  background-color: #f8f8f8;
  height: 100%;
  .header {
    border-bottom: 0;
  }
  .item {
    background-color: #fff;
    height: rem(146px);
    justify-content: space-between;

    .fr {
      span {
        font-size: rem(30px);
      }
      p {
        color: #969696;
        font-size: rem(30px);
        margin-top: rem(20px);
      }
    }
    .sr {
      float: right;
      .d {
        text-align: right;
        span {
          font-size: rem(18px);
          color: #959595;
        }
      }
      p {
        color: #646464;
        font-size: rem(30px);
        text-align: right;
        margin-top: rem(20px);
      }
    }
  }
}
</style>
<style lang='scss'>
@import "../../assets/style/common.scss";
.agency {
  .el-pagination {
    // width:100%;
    // background-color: #f00;
    overflow: hidden;
  }
  .el-pagination__total {
    margin-right: 0;
  }
  .btn-prev {
    padding: 0;
  }
  .number {
    padding: 0;
    min-width: rem(60px);
  }
}
</style>


