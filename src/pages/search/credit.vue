<template>
	<div class="credit">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">信用查询</p>
		</v-header>
		<split></split>
		<div class="form">
			<div class="main">
                <div class="wrap flex">
                    <div class="lable-wrap"><label>姓名</label></div>
                    <div class="rest input-wrap">
                        <el-input v-model="name" placeholder="请输入姓名" ></el-input>
                    </div>
                </div>
				<div class="wrap flex">
                    <div  class="lable-wrap"><label>身份证</label></div>
                    <div class="rest input-wrap">
                        <el-input v-model="ID" placeholder="请输入身份证"></el-input>
                    </div>
                </div>
				<!-- <div class="wrap flex">
                    <div class="lable-wrap"><label>银行卡号</label></div>
                    <div class="rest input-wrap">
                        <el-input v-model="card" placeholder="请输入银行卡号"></el-input>
                    </div>
                </div> -->
                <div class="wrap flex">
                    <div class="lable-wrap"><label>手机</label></div>
                    <div class="rest input-wrap">
                        <el-input v-model="phone" placeholder="请输入手机"></el-input>
                    </div>
                </div>
				<!-- <div class="wrap flex">
                    <div class="lable-wrap"><label>验证码</label></div>
                    <div class="rest input-wrap">
                        <el-input v-model="code" placeholder="验证码" class="code-input"></el-input>
                    </div>
                    <div><span class="code">获取验证码</span></div>
                </div> -->
			</div>
			
			<div class="footer-btn" @click="submit()">
				<span class="form-control">提交</span>
			</div>
		</div>
	</div>
</template>
<script>
import { getReport, getReportState } from "@/util/axios";
import { getItem, setItem, delItem } from "@/util/util";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      name: "",
      ID: "",
      card: "",
      phone: "",
      // code: "",
      // codeFlag: false,
      // time: "验证码",
      // notFirst: getItem("aliReport") || false //是否第一次进入此页面，true第二次，false第一次
    };
  },
  //   mounted() {
  //     this.initData();
  //     var data = getItem("reportUserInfo");
  //     if (data) {
  //       let res = JSON.parse(data);
  //       this.name = res.name;
  //       this.ID = res.idNumber;
  //       this.phone = res.phone;
  //     }
  //   },
  methods: {
    // getCode() {
    //   var self = this;
    //   if (this.codeFlag) return;
    //   this.codeFlag = true;
    //   this.time = 5;
    //   timeout(this.time);
    //   function timeout(count) {
    //     setTimeout(() => {
    //       count--;
    //       if (count <= 0) {
    //         self.time = "验证码";
    //         self.codeFlag = false;
    //       } else {
    //         self.time = count;
    //         timeout(count);
    //       }
    //     }, 1000);
    //   }
    // },
    // async initData() {
    //   var self = this;
    //   if (this.notFirst) {
    //     function getReport() {
    //       setTimeout(async function() {
    //         var res = await getReportState();
    //         if (res) {
    //           delItem("aliReport");
    //           this.$router.push({
    //             path: "/search/creditResult",
    //             query: { status: "query" }
    //           });
    //         } else {
    //           getReport();
    //         }
    //       }, 500);
    //     }
    //     getReport();
    //   }
    // },
    // async getReportStatus() {
    //   var res = await getReportState();
    //   if (res.code === "0000") {
    //     if (res.state != "认证成功/报告生成成功") {
    //       return 1;
    //     } else if (res.state != "生成报告失败！") {
    //       return 2;
    //     } else {
    //       return 0;
    //     }
    //   }
    // },
    async submit() {
      var data = {
        name: this.name,
        idNumber: this.ID,
        phone: this.phone,
        salerId:JSON.parse(getItem('userInfo')).userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      console.log(localStorage)
      console.log(data)
      if (!this.name.trim()) {
        this.$message("请输入姓名");
        return;
      } else if (!this.ID.trim()) {
        this.$message("请输入身份证");
        return;
      } else if (!this.phone.trim()) {
        this.$message("请输入手机号");
        return;
      }
      var res = await getReport(enData);
      let deData1 = strDec(res.data,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);

      console.log(res)
      if (res.code === "0000") {
        // setItem("reportUserInfo", data);
        console.log(deData.url);
        // setItem('ppId',res.data.ppId);
      //  setItem("ppId",res.data.ppId)
      //  console.log(localStorage)
      //  localStorage.removeItem('reportUserInfo')
        window.location.href = deData.url;
       
        //  console.log(localStorage)
      }
      //   this.$router.push({ path: "/search/creditResult" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.credit {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  font-size: rem(30px);
  .form {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    .main {
      flex: 1;
    }
    .flex {
      border-bottom: 1px solid $bdcolor;
    }
  }
  .lable-wrap {
    width: rem(194px);
  }
  .code {
    padding: rem(13px) rem(25px);
    color: #fff;
    font-size: rem(24px);
    background: #ffa81e;
    border-radius: rem(10px);
  }
  .btn-wrap {
    margin: rem(30px) 0;
    .form-control {
      width: 100%;
      height: rem(80px);
      background-color: $blue;
      border: 0;
      border-radius: 5px;
      color: #fff;
      font-size: rem(26px);
    }
  }
  .code {
    width: rem(100px);
    text-align: center;
  }
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.credit {
  .input-wrap {
    // border-bottom: 1px solid #f8f8f8;
    .el-input__inner {
      height: rem(94px);
      border: none;
      font-size: rem(30px);
    }
  }
  .el-input-group__append {
    span {
      font-size: rem(20px);
    }
  }
}
</style>

