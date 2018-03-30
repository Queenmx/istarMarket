<template>
	<div class="report">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">出勤人数</p>
		</v-header>
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
import { strEnc, strDec } from '@/util/aes.js'
export default {
  data() {
    return {
      arr: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      getItem("userinfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        companyId: userinfo.companyId,
        userId: userinfo.userId
      };
       var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res = await oaAttendance(enData);
      let deData1 = strDec(res,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code == "0000") {
        this.arr = deData.data;
        console.log(this.arr);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.report {
  .item {
    display: flex;
    align-items: center;
    height: rem(100px);
    color: $grey;
    .item-main {
      flex: 1;
      span {
        // font-size: rem(22px);
        font-size: rem(32px);
        color: #323232;
      }
    }
    .right {
      span {
        font-size: rem(22px);
      }
    }
  }
  .avatar-wrap {
    display: inline-block;
    padding-right: rem(10px);
  }
  .avatar {
    // width: rem(60px);
    // height: rem(60px);
    width: rem(91px);
    height: rem(94px);
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>