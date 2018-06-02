<template>
	<div class="carInfo" ref="carInfo">
		<v-header>
            <p slot="title"  v-if="isThird">贷款主体信息</p>
			<p slot="title" v-else>{{title[curPage]}}</p>
		</v-header>
        <!-- 贷款信息 -->
        <div id="loan">
			<split></split>
            <!-- <h4 class="wrap item-title">贷款信息</h4> -->
            <ul v-if="isThird">
                <li class="wrap flex item" v-for="(val,key) in thirdForm.read" :key="key">
                    <label :class="[val.required==='yes'?'required':'','left']">{{val.text}}</label>
					<div class="rest">
						<input type="text" :value="thirdData[key]" readonly="readonly">
					</div>
                 </li>
                 <li class="wrap flex item" v-for="(val,key) in thirdForm.write" :key="key">
                    <label :class="[val.required==='yes'?'required':'','left']">{{val.text}}</label>
					<div class="rest">
						<input type="text" :placeholder="'请输入'+val.text"  v-model="thirdInfo[key]">
					</div>
                 </li>
            </ul>
            <ul v-else>
              
          <li class="wrap flex item" v-for="(val,key) in temple[curPage]" :key="curPage+''+key">
					<label :class="[val.required==='yes'?'required':'','left']">{{val.name}}</label>
					<div class="rest">
						<input type="text" :placeholder="'请输入'+val.name" v-if="val.type=='text'" v-model="data[curPage][key]">
                        
                        <el-select v-model="data[curPage][key]" placeholder="请选择" v-else @focus="preventBorad">
                          
                            <el-option v-for="(ops,subkey) in val.list" :key="ops" :label="ops" :value="subkey">
                            </el-option>
                        </el-select>
					</div>
				</li>
            </ul>
		</div>
        <div class="footer" v-show="isShowFooter">
			<!-- <span>提交</span> -->
            <div v-if="isThird">
                <div class="middle" @click="submit">提交</div>
            </div>
            <div v-else>
                <div class="middle" @click="updateData" v-if="curPage<this.temple.length-1">下一页</div>
                <div @click="submit" v-else>
                    <div class="first">提交</div>
                    <div>花费20星币，剩余{{money}}星币</div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
import {
  queryMoney,
  getInfoTemple,
  oaFcgqInfo,
  getJumpWay,
  setThirdOrder
} from "@/util/axios.js";
import { getItem } from "@/util/util.js";
export default {
  data() {
    return {
      isShowFooter: true,
      isBack: true,
      curPage: 0, //当前页面
      totalPage: 0,
      temple: [],
      userId: getItem("userInfo"),
      categoryId: this.$route.query.loanId,
      loanName: this.$route.query.loanName,
      data: {},
      money: "",
      requiredObj: {},
      title: [],
      pageNameList: [],
      jumpInfo: {},
      isThird: true, //是否为第三方订单
      thirdUrl: "",
      thirdInfo: {}, //表单信息
      thirdForm: {}, //第三方表单
      thirdData: {}, //第三方商家信息
      isShowCouple: true //是否展示配偶页
    };
  },
  watch: {
    curPage: function() {
      if (this.curPage === 0) {
        this.isBack = true;
      } else {
        this.isBack = false;
      }
    },
    //判断是否有配偶
    data: function() {
      if (
        this.data[1].marriage === "7" ||
        this.data[1].marriage === "82" ||
        this.data[1].marriage === "83"
      ) {
        this.isShowCouple = false;
      } else {
        this.isShowCouple = true;
      }
    }
  },
  mounted() {
    this.init();
    this.fixedFooter();
  },
  methods: {
    async init() {
      await this.getJump();
      if (!this.isThird) {
        this.initDate();
      } else {
        this.thirdTemple();
      }
      this.queryMoney();
    },
    async getJump() {
      let data = {
        loanId: this.categoryId
      };
      let res = await getJumpWay(data);
      let resData = res.data;
      if (res.code === "0000") {
        if (res.data.type == 1) {
          this.isThird = false;
        } else {
          this.isThird = true;
          this.thirdUrl = resData.url;
          this.$set(this.thirdData, "companyName", resData.companyName);
          this.$set(this.thirdData, "loanName", resData.loanName);
        }
      } else {
        this.$message(res.msg);
      }
    },
    async initDate() {
      let data = {
        loanId: this.categoryId
      };
      await this.queryMoney();
      let res = await getInfoTemple(data);
      if (res.code === "0000") {
        let data = res.data[0]["data"],
          obj = {},
          requiredObj = {};
        this.temple = data;
        this.title = deData[0]["title"];
        this.pageNameList = deData[0]["titleVal"];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            obj[key] = {};
            requiredObj[key] = {};
            for (let subkey in data[key]) {
              if (data[key].hasOwnProperty(subkey)) {
                obj[key][subkey] = "";
                if (data[key][subkey].required === "yes") {
                  requiredObj[key][subkey] = data[key][subkey].name;
                }
              }
            }
          }
        }
        this.data = obj;
        this.requiredObj = requiredObj;
      } else {
        this.$message(res.msg);
      }
    },
    async queryMoney() {
      let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        userId: userinfo.userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await queryMoney(enData);
      if (res.code === "0000") {
        let deData1 = strDec(res.data, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        this.money = deData.xb;
      } else {
        // this.$message(res.msg);
      }
    },
    thirdTemple() {
      this.thirdForm = {
        read: {
          companyName: {
            text: "商家名字"
          },
          loanName: {
            text: "产品名称"
          }
        },
        write: {
          applyPrice: {
            text: "申请金额（元）",
            required: "yes"
          },
          applyPeriod: {
            text: "申请期限",
            required: "yes"
          }
        }
      };
      this.thirdInfo = {
        applyPrice: "",
        applyPeriod: ""
      };
    },
    preventBorad(e) {
      document.activeElement.blur();
    },
    updateData() {
      let res = this.check(this.curPage);
      if (res.res) {
        if (this.curPage === 1 && this.isShowCouple === false) {
          this.curPage += 2;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          console.log("111");
        } else {
          this.curPage++;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          console.log("111");
        }
      } else {
        this.$message(res.text + "不能为空");
      }
    },
    async submit() {
      if (this.isThird) {
        this.thirdSubmit();
        return;
      }
      let lastRes = this.check(this.curPage);
      if (!lastRes.res) {
        this.$message(lastRes.text + "不能为空");
        return;
      }
      var self = this;
      var mainData = {};
      //   var apl = ["a", "b", "c", "d", "e", "f", "g", "h"];
      var apl = this.pageNameList;
      for (let key in this.data) {
        mainData[apl[key]] = this.data[key];
      }
      let data = {
        userId: this.userId,
        categoryId: this.categoryId,
        data: mainData
        // loanName: this.loanName
      };

      data = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      var res = await oaFcgqInfo(data);

      if (res.code === "0000") {
        let deData1 = strDec(res.data, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        // console.log(deData.code);
        // if (res.data.type === "1") {
        //   self.$router.push({ path: "/" });
        // } else {
        //   window.location.href = res.data.url;
        // }
        // if (deData.code === "1") {
        //   this.$router.push({ path: "/success" });
        // } else {
        //   this.$router.push({ path: "/fail" });
        // }
        this.$router.push({ path: "/success" });
      } else {
        // this.$message(res.msg);
        this.$router.push({ path: "/fail" });
      }
    },
    async thirdSubmit() {
      var list = this.thirdForm.write;
      for (var key in list) {
        if (list[key].required === "yes" && this.thirdInfo[key].trim() == "") {
          this.$message(list[key].text + "不能为空");
          return false;
        } else if (!(this.thirdInfo[key] > 0)) {
          this.$message(list[key].text + "数据非法");
          return false;
        }
      }
      var data = {
        loanId: this.categoryId,
        loanName: this.thirdData.loanName,
        companyName: this.thirdData.companyName,
        applyPrice: this.thirdInfo.applyPrice,
        applyPeriod: this.thirdInfo.applyPeriod,
        userId: this.userId
      };
      data = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await setThirdOrder(data);
      console.log(this.thirdUrl);
      if (res.code === "0000") {
        window.location.href = this.thirdUrl;
      }
    },
    check(curPage) {
      let data = this.data[curPage];
      let required = this.requiredObj[curPage];
      if (
        (curPage === 1 && data["estate_status"]) !== "租赁" &&
        this.temple[1].estate_desc &&
        this.temple[1].estate_desc.name == "租金" //租金判断是因为后台有字段冲突，租金key与所属部门key相同
      ) {
        delete required["estate_desc"];
      } else {
        if (this.temple[1].estate_desc) {
          required["estate_desc"] = this.temple[1].estate_desc.name;
        }
      }
      for (let key in data) {
        if (required[key]) {
          //   if (data[key] == 0 || !data[key] == "") {
          //     return { text: required[key], res: false };
          //   } else if (typeof data[key] == "string" && !data[key].trim()) {
          //     return { text: required[key], res: false };
          //   }
          console.log(typeof data[key]);
          if (typeof data[key] == "string" && !data[key].trim()) {
            return { text: required[key], res: false };
          } else if (typeof data[key] == "number" && data[key] != "") {
            return { text: required[key], res: false };
          }
        }
      }
      if (this.curPage === 1) {
        if (
          this.data[1].marriage === "7" ||
          this.data[1].marriage === "82" ||
          this.data[1].marriage === "83"
        ) {
          this.isShowCouple = false;
        } else {
          this.isShowCouple = true;
        }
        console.log(this.isShowCouple);
      }

      return { text: "", res: true };
    },
    fixedFooter() {
      var windheight = document.body.clientHeight; /*未唤起键盘时当前窗口高度*/
      var self = this;
      window.onresize = function() {
        var docheight = document.body.clientHeight; /*唤起键盘时当前窗口高度*/
        if (docheight < windheight) {
          /*当唤起键盘高度小于未唤起键盘高度时执行*/
          self.isShowFooter = false;
        } else {
          self.isShowFooter = true;
        }
      };
    },
    back() {
      if (this.curPage > 0) {
        if (this.curPage === 3 && this.isShowCouple === false) {
          this.curPage -= 2;
        } else {
          this.curPage--;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.carInfo {
  padding-bottom: rem(91px);
  min-height: 100%;
  background-color: $bgcolor;
  box-sizing: border-box;
  //   position: relative;
  //   box-sizing: border-box;
  //   overflow: auto;
  .rest {
    .el-select {
      input {
        text-indent: -999em; /*文本向左缩进*/
        margin-left: -100%; /*输入框光标起始点向左左移*／ 
  width: 200%; /*输入框增大一倍*/
        opacity: 0;
      }
    }
  }
  .over {
    width: rem(10px);
    height: rem(10px);
    background-color: #000;
    position: absolute;
  }
  .required {
    &:after {
      content: "*";
      color: red;
    }
  }
  .item-title {
    font-size: rem(32px);
    padding-bottom: rem(15px);
  }
  .item {
    height: rem(98px);
    color: #636363;
    font-size: rem(30px);
    border-bottom: 1px solid $bdcolor;
    background-color: #fff;
    input {
      border: none;
      width: 100%;
    }
    .left {
      width: rem(190px);
    }
    .right {
      width: rem(25px);
      color: #c8c8c8;
    }
  }
  .classes {
    font-size: rem(30px);
    padding: rem(15px) rem(30px);
    font-weight: 600;
  }
  .footer {
    // transform: translateZ(0);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: rem(91px);
    // line-height: rem(91px);
    text-align: center;
    font-size: rem(28px);
    color: #fff;
    background-color: $blue;
    .first {
      height: rem(45.5px);
      line-height: rem(45.5px);
    }
    .middle {
      line-height: rem(91px);
    }
  }
}
</style>