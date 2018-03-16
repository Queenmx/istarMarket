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

export default {
  data() {
    return {
      userInfo: JSON.parse(getItem("userInfo")),
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
      console.log(localStorage)
      console.log(data)
      let res = await creditHistory(data);
      console.log(res)
      if (res.code === "0000") {
        this.list = res.data.reportList;
        console.log(res.data);
      } else {
        this.$message(res.msg);
      }
    },
    goDetails(items){
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
          reportId:items.reportId
        }
      });
    },
   
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