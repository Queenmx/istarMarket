<template>
	<div class="creditResult wrap">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">信用查询</p>
		</v-header>
      <split></split>
		<div class="content">
			<el-row class="gray_line">
				<!-- <div><span>报表编号</span><span>{{search_id}}</span></div>
        <div><span>申请报表</span><span>{{applyNum}}</span></div>
        <div><span>报告时间</span><span>{{report_time}}</span></div> -->
        <el-col :span="12">报表编号:</el-col>
        <el-col :span="12">{{search_id}}</el-col>
        <el-col :span="12">申请报表:</el-col>
        <el-col :span="12">{{applyNum}}</el-col>
        <el-col :span="12">报告时间:</el-col>
        <el-col :span="12">{{report_time}}</el-col>
			</el-row>
      <!-- <el-row class="gray_line">评估结果</el-row> -->
      <el-row class="gray_line">  
        <!-- <div><span>评估得分</span><span>{{score}}</span></div>
        <div><span>评估等级</span><span>{{rating}}</span></div> -->
        <el-col :span="12">评估得分:</el-col>
        <el-col :span="12">{{score}}</el-col>
        <el-col :span="12">评估等级:</el-col>
        <el-col :span="12">{{rating}}</el-col>
      </el-row>
      <!-- <el-row class="gray_line">个人信息</el-row> -->
      <!-- <div>
        <div><span>真实姓名</span><span>{{real_name}}</span></div>
        <div><span>身份证号</span><span>{{id_card}}</span></div>
        <div><span>手机号</span><span>{{phone}}</span></div>
      </div> -->
      <el-row class="gray_line">  
        <!-- <div><span>评估得分</span><span>{{score}}</span></div>
        <div><span>评估等级</span><span>{{rating}}</span></div> -->
        <el-col :span="12">真实姓名:</el-col>
        <el-col :span="12">{{real_name}}</el-col>
        <el-col :span="12">身份证号:</el-col>
        <el-col :span="12">{{id_card}}</el-col>
      </el-row>
      <!-- <div>危险交易</div>
      <div>
        <div><span>交易详情</span><span>{{trade_type}}</span></div>
        <div><span>交易金额</span><span>{{trade_amt}}</span></div>
        <div><span>交易时间</span><span>{{trade_time}}</span></div>
      </div> -->
       <el-row class="gray_line" >信用卡</el-row>
       <el-row class="gray_line">  
        <!-- <div><span>评估得分</span><span>{{score}}</span></div>
        <div><span>评估等级</span><span>{{rating}}</span></div> -->
        <el-col :span="12">信用卡数:</el-col>
        <el-col :span="12">{{credit_card_cnt}}</el-col>
        <el-col :span="12">信用卡还款总金额:</el-col>
        <el-col :span="12">{{credit_card_repay_amt}}元</el-col>
        <el-col :span="12">信用卡还款总笔数:</el-col>
        <el-col :span="12">{{credit_card_repay_cnt}}</el-col>
        <el-col :span="12">信用卡还款最大金额:</el-col>
        <el-col :span="12">{{credit_card_max_per_amt}}元</el-col>
      </el-row>
      <!-- <div>信用卡</div>
      <div>
        <div><span>信用卡数</span><span>{{credit_card_cnt}}</span></div>
        <div><span>信用卡还款总金额</span><span>{{credit_card_repay_amt}}</span></div>
        <div><span>信用卡还款总笔数</span><span>{{credit_card_repay_cnt}}</span></div>
        <div><span>信用卡还款最大金额</span><span>{{credit_card_max_per_amt}}</span></div>
      </div> -->
      <ul>
        <div>近6个月支付宝收支情况</div>
			<li v-for="item in items">
				<split></split>
				<div class="flex wrap item">
					 <div>
             <div><span>时间：</span><span>{{item.month}}</span></div>
              <div> <span>支出：</span> <span>{{item.pay}}元</span></div>
              <div><span>收入：</span><span>{{item.income}}元</span></div>
          </div>
				</div>
			</li>
		</ul>
    </div>
	</div>
</template>
<script>
import { getItem } from "@/util/util";
import { getTanjiReport, getReportState, crawReport } from "@/util/axios";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      search_id: "",
      report_time: "",
      applyNum: "",
      real_name:'',
      id_card:'',
      phone:'',
      score:'',
      rating:'',
      trade_type:'',
      trade_amt:'',
      trade_time:'',
      credit_card_cnt:'',
      credit_card_repay_amt:'',
      credit_card_repay_cnt:'',
      credit_card_max_per_amt:'',
      items:'',
      reportData:'',
      status: this.$route.query.status, //query从授权页过来，history从历史记录过来
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      // console.log(localStorage)
      // getItem('ppId');
      // var count = 0;
      // var self = this;
      console.log(window.location.href);
      function UrlSearch() {
		  var name, value;
		  var str = location.href; //取得整个地址栏
		  var num = str.indexOf("?") //获取?的索引值
		  str = str.substr(num + 1); //取得所有参数 （例如id=2&name=wang）
	        var arr = str.split("&"); //申请一个数组，把各个参数放到数组里
	        for (var i = 0; i < arr.length; i++) {
			num = arr[i].indexOf("="); //获取等于号在目标字符串中的索引值
			if (num > 0) { //判断是否有参数
			name = arr[i].substring(0, num); //获取参数的名称
			value = arr[i].substr(num + 1); //获取参数的值
			this[name] = value; //把参数与值对应
					}
				}
			}
      var requst = new UrlSearch();
      var ppId = requst.ppId
      console.log(ppId)
      // function getReport() {
        //console.log(self.search_id);
        // setTimeout(async function() {
          //  console.log(self.search_id);
         var data={
          //  ppId:JSON.parse(getItem('ppId'))
         ppId:ppId
         }
         var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
         console.log(data)
          let res = await getReportState(enData);
          let deData1 = strDec(res.data,"ZND20171030APIMM");
          let deData = JSON.parse(deData1);
          console.log(res.code);
          // let data = getItem("ppId");
          // console.log(localStorage)
          // if(data){
          //   data = JSON.parse(data);
          //   let res = getReportState(data);
          //   console.log(res)
          // }
          // if (res.code === "0000" && res.data.state === "认证成功!") {
          //   // console.log("0000" + count);
          //   console.log(res);
          //   //抓取
          //   let data = getItem("reportUserInfo");
          //   if (data) {
          //     data = JSON.parse(data);
          //     let res1 = await crawReport(data);
          //     console.log(".....抓取完毕.....");
          //     console.log(res1);
          //     //查询
          //     // let res3 = await getReportState();
          //     // console.log(res3);
          //     // let res4 = await getReportState();
          //     // console.log(res4)
              var salerId = requst.salerId
              if (res.code === "0000" && deData.state ==="报告生成成功!"){
              let data2 = {
                ppId:ppId,
                customerId: "111",
                salerId: salerId
              };
              var enData = strEnc(JSON.stringify(data2), "ZND20171030APIMM" );
              let res2 = await getTanjiReport(enData);
              let deData1 = strDec(res2.data,"ZND20171030APIMM");
              let deData = JSON.parse(deData1);
              this.head_info = res2.head_info;
              // console.log(res2.data);
              this.search_id = deData.reportData.head_info.search_id;
              this.report_time = deData.reportData.head_info.report_time;
              this.applyNum = deData.applyNum;
              this.real_name = deData.reportData.basic_info.real_name;
              this.id_card = deData.reportData.basic_info.id_card;
              this.phone = deData.reportData.basic_info.phone;
              this.score = deData.reportData.rong_evaluation.score;
              this.rating = deData.reportData.rong_evaluation.rating;
              this.trade_type = deData.reportData.risk_trade.trade_type;
              this.trade_amt = deData.reportData.risk_trade.trade_amt;
              this.trade_time = deData.reportData.risk_trade.trade_time;
              this.credit_card_cnt =deData.reportData.credit_card_repay.credit_card_cnt;
              this.credit_card_repay_amt = deData.reportData.credit_card_repay.credit_card_repay_amt;
              this.credit_card_repay_cnt = deData.reportData.credit_card_repay.credit_card_repay_cnt;
              this.credit_card_max_per_amt = deData.reportData.credit_card_repay.credit_card_max_per_amt;
              this.items = deData.reportData.recent_revenue_expend_trend;
              }
             else if(res.code === "0000" && deData.state !=="报告生成成功!"){
               this.$message("异地登录，为确保账户安全，请重新登录");
             }
            } 
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.creditResult {
  .gray_line{
    border-bottom: 1px solid #eee;
    height:rem(50px);
    line-height: rem(50px)
  }
  font-size: rem(26px);
  .title {
    margin: rem(10px) 0;
    font-weight: bold;
  }
  table {
    width: 100%;
  }
  td {
    border: 1px solid $bdcolor;
  }
  .mes {
    margin: rem(10px) 0;
  }
}
</style>