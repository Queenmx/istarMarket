<template>
    <div class="rooterEle applyInfo">
        <v-header title="贷款主体信息"></v-header>
        <div class="container">
            <div class="group">
                <split></split>
                <ul class="wrap list">
                    <li class="flex item">
                        <span class="title">商家名字</span>
                        <span class="rest">fdsfsdsd</span>
                    </li>
                    <li class="flex item">
                        <span class="title">产品名称</span>
                        <span class="rest">{{loanName}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-btn" @click="submit">提交</div>
        <div class="footer-btn" @click="submit">下一页</div>
    </div>
</template>
<script>
import { getInfoTemple } from "@/util/axios.js";
import { getItem } from "@/util/util.js";
import { Validate } from "@/util/form";
export default {
  data() {
    return {
      loanId: this.$route.query.loanId,
      loanName: this.$route.query.loanName,
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
  mounted() {
    this.getTemple();
  },
  methods: {
    init() {},
    //获取小贷模板
    async getTemple() {
      let res = await getInfoTemple({ loanId: this.loanId });
      if (res.code === "0000") {
        let data = res.data[0];
        console.log(data);
        this.title = data.title;
        this.pageNameList = data.titleVal;
      } else {
        this.$toast(res.msg);
      }
    },
    async submit() {},
    checkForm() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common.scss";
.applyInfo {
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

