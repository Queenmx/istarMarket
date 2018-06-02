<template>
    <div class="rooterEle thirdApplyInfo">
        <v-header title="贷款主体信息"></v-header>
        <div class="container">
            <div class="group">
                <split></split>
                <ul class="wrap list">
                    <li class="flex item">
                        <span class="title">商家名字</span>
                        <span class="rest">{{companyName}}</span>
                    </li>
                    <li class="flex item">
                        <span class="title">产品名称</span>
                        <span class="rest">{{loanName}}</span>
                    </li>
                </ul>
            </div>
            <div class="group" v-for="(list,index) in formLabel" :key="index">
                <split></split>
                <ul class="wrap list" v-for="(item,subIndex) in list" :key="subIndex">
                    <li class="flex item">
                        <span :class="[{'require':item.required},'title']">{{item.text}}</span>
                        <div class="rest"><input v-model="formData[item.key]" :placeholder="'请输入'+item.text"></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-btn" @click="submit">提交</div>
    </div>
</template>
<script>
import { setThirdOrder } from "@/util/axios.js";
import { getItem } from "@/util/util.js";
import { Validate } from "@/util/form";
export default {
  data() {
    return {
      loanId: this.$route.query.loanId,
      loanName: this.$route.query.loanName,
      companyName: this.$route.query.companyName,
      url: this.$route.query.url,
      formLabel: [
        [
          {
            key: "name",
            text: "姓名",
            required: 1,
            rules: [{ strategy: "isNotEmpty", errorMes: "姓名不能为空" }]
          },
          {
            key: "phone",
            text: "手机号",
            required: 1,
            rules: [
              { strategy: "isNotEmpty", errorMes: "手机号不能为空" },
              { strategy: "phone", errorMes: "手机号格式不正确" }
            ]
          },
          {
            key: "ID",
            text: "身份证号",
            required: 1,
            rules: [
              { strategy: "isNotEmpty", errorMes: "身份证号不能为空" },
              { strategy: "IDnumber", errorMes: "身份证号格式不正确" }
            ]
          }
        ],
        [
          {
            key: "applyPrice",
            text: "申请金额(元)",
            required: 1,
            rules: [
              { strategy: "isNotEmpty", errorMes: "申请金额不能为空" },
              { strategy: "number", errorMes: "申请金额为数字" }
            ]
          },
          {
            key: "applyPeriod",
            text: "申请期限",
            required: 1,
            rules: [
              { strategy: "isNotEmpty", errorMes: "申请期限不能为空" },
              { strategy: "number", errorMes: "申请期限为数字" }
            ]
          }
        ]
      ],
      formData: {
        loanId: this.$route.query.loanId,
        loanName: this.$route.query.loanName,
        companyName: "",
        applyPrice: "",
        applyPeriod: "",
        userId: getItem("userInfo").userId
      }
    };
  },
  methods: {
    async submit() {
      let isPass = this.checkForm();
      if (!isPass) return;

      let res = await setThirdOrder(this.formData);
      if (res.code === "0000") {
        window.location.href = this.url;
      } else {
        this.$toast(res.msg);
      }
    },
    checkForm() {
      let validate = new Validate();
      this.formLabel.forEach(list => {
        list.forEach(item => {
          validate.add(this.formData[item.key], item.rules);
        });
      });
      let errorMsg = validate.start();
      if (errorMsg) {
        this.$toast(errorMsg);
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.thirdApplyInfo {
  padding-bottom: rem(100px);
  font-size: rem(30px);
  color: #333333;
  .item {
    height: rem(100px);
    border-bottom: rem(1px) solid $bdcolor;
    .title {
      width: rem(220px);
      color: #020202;
    }
  }
  .list {
    background: #fff;
  }
  .footer-btn {
    background-image: linear-gradient(-180deg, #599ffe 0%, #3158e0 100%);
  }
}
</style>

