<template>
	<div class="creditHistory wrap">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">信用报表</p>
		</v-header>
		<ul>
			<li class="item" v-for="(items,index) in list" :key="index" @click="goDetails(items)">
				<p>报告编号  {{items.reportId}}</p>
                <p>申请编号  {{items.applyNum}}</p>
                <p>报告时间  {{items.reportTime}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
import { getItem } from "@/util/util";
import { creditHistory } from "@/util/axios";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      // userInfo: JSON.parse(getItem("userInfo")),
      list: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      var data = {
        salerId: JSON.parse(getItem("userInfo")).userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res = await creditHistory(enData);
      let deData1 = strDec(res.data,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      console.log(res);
      if (res.code === "0000") {
        this.list = deData.reportList;
        console.log(res.data);
        if(!deData.reportList){
          this.$message(deData.message)
        }
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
@import "../assets/style/common.scss";
.creditHistory {
  .item {
    margin: rem(10px) 0;
    border: 1px solid $bdcolor;
    border-radius: 5px;
    p {
      margin: rem(10px);
    }
  }
}
</style>