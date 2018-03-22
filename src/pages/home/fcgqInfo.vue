<template>
	<div class="carInfo" ref="carInfo">
		<v-header @leftEvent="back" :isBack="isBack">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">{{title[curPage]}}</p>
		</v-header>
        <!-- 贷款信息 -->
        <div id="loan">
			<split></split>
            <!-- <h4 class="wrap item-title">贷款信息</h4> -->
            <ul>
              
          <li class="wrap flex item" v-for="(val,key) in temple[curPage]" :key="curPage+''+key">
					<label :class="[val.required==='yes'?'required':'','left']">{{val.name}}</label>
					<div class="rest">
						<input type="text" :placeholder="'请输入'+val.name" v-if="val.type=='text'" v-model="data[curPage][key]">
                        <el-select v-model="data[curPage][key]" placeholder="请选择" v-else >
                          
                            <el-option v-for="ops in val.list" :key="ops" :label="ops" :value="ops">
                            </el-option>
                        </el-select>
					</div>
				</li>
            </ul>
		</div>
        <div class="footer" v-show="isShowFooter">
			<!-- <span>提交</span> -->
            <div class="middle" @click="updateData" v-if="curPage<this.temple.length-1">下一页</div>
            <div @click="submit" v-else>
                <div class="first">提交</div>
                <div>花费20星币，剩余{{money}}星币</div>
            </div>
		</div>
	</div>
</template>
<script>
import { queryMoney, getInfoTemple, oaFcgqInfo } from "@/util/axios.js";
import { getItem } from "@/util/util.js";
export default {
  data() {
    return {
      isShowFooter: true,
      isBack: true,
      curPage: 0, //当前页面
      totalPage: 0,
      temple: [],
      userId: JSON.parse(getItem("userInfo")).userId,
      categoryId: this.$route.query.loanId,
      loanName: this.$route.query.loanName,
      data: {},
      money: "",
      requiredObj: {},
      title: [],
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
    data: function() {
      if (
        this.data[1].marriage === "未婚" ||
        this.data[1].marriage === "离异" ||
        this.data[1].marriage === "丧偶"
      ) {
        this.isShowCouple = false;
      } else {
        this.isShowCouple = true;
      }
    }
  },
  mounted() {
    this.initDate();
    this.fixedFooter();
  },
  methods: {
    async initDate() {
      let temdata = {
        loanId: this.categoryId
      };
      await this.queryMoney();
      let res = await getInfoTemple(temdata);
      if (res.code === "0000") {
        let data = res.data[0]["data"],
          obj = {},
          requiredObj = {};
        this.temple = data;
        this.title = res.data[0]["title"];
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
      let res = await queryMoney(data);
      if (res.code === "0000") {
        this.money = res.data.xb;
      } else {
        // this.$message(res.msg);
      }
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
      let lastRes = this.check(this.curPage);
      if (!lastRes.res) {
        this.$message(lastRes.text + "不能为空");
        return;
      }
      var self = this;
      var mainData = {};
      var apl = ["a", "b", "c", "d", "e", "f", "g", "h"];
      for (let key in this.data) {
        mainData[apl[key]] = this.data[key];
      }
      let data = {
        userId: this.userId,
        categoryId: this.categoryId,
        data: mainData
        // loanName: this.loanName
      };
      var res = await oaFcgqInfo(data);
      if (res.code === "0000") {
        // if (res.data.type === "1") {
        //   self.$router.push({ path: "/" });
        // } else {
        //   window.location.href = res.data.url;
        // }
        if (res.data.code === "1") {
          this.$router.push({ path: "/success" });
        } else {
          this.$router.push({ path: "/fail" });
        }
      } else {
        this.$message(res.msg);
        // this.$router.push({ path: "/fail" });
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
          if (!data[key].trim()) {
            return { text: required[key], res: false };
          }
        }
      }
      if (this.curPage === 1) {
        if (
          this.data[1].marriage === "未婚" ||
          this.data[1].marriage === "离异" ||
          this.data[1].marriage === "丧偶"
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
  .over{
    width: rem(10px);
    height:rem(10px);
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