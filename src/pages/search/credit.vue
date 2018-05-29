<template>
	<div class="credit">
        <v-header title="信用查询">
		</v-header>
		<split></split>
        <form>
            <div class="wrap form-list">
            <div class="flex item">
                    <div class="lable-wrap"><label>姓名</label></div>
                    <div class="rest input-wrap">
                        <input v-model="name" placeholder="请输入姓名">
                    </div>
                </div>
            <div class="flex item">
                <div class="lable-wrap"><label>手机</label></div>
                <div class="rest input-wrap">
                    <input v-model="phone" placeholder="请输入手机">
                </div>
            </div>
            <div class="flex item">
                    <div class="lable-wrap"><label>身份证号</label></div>
                    <div class="rest input-wrap">
                        <input v-model="ID" placeholder="请输入身份证号">
                    </div>
                </div>
            </div>
            <div class="wrap" @click="submit()">
				<p class="btn-blue-lg">提交</p>
			</div>
        </form>
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
      phone: ""
    };
  },
  methods: {
    async submit() {
      var data = {
        name: this.name,
        idNumber: this.ID,
        phone: this.phone,
        salerId: JSON.parse(getItem("userInfo")).userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      if (!this.name.trim()) {
        this.$toast("请输入姓名");
        return;
      } else if (!this.ID.trim()) {
        this.$toast("请输入手机号");
        return;
      } else if (!this.phone.trim()) {
        this.$toast("请输入身份证");
        return;
      }
      var res = await getReport(enData);
      let deData1 = strDec(res.data, "ZND20171030APIMM");
      let deData = JSON.parse(deData1);

      console.log(res);
      if (res.code === "0000") {
        window.location.href = deData.url;
      }
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
  padding-top: rem(88px);
  height: 100%;
  font-size: rem(30px);
  box-sizing: border-box;
  background: #f1f0f0;
  .form {
  }
  .form-list {
    margin-bottom: rem(96px);
    background: #fff;
  }
  .item {
    height: rem(100px);
    border-bottom: rem(2px) solid #eeeeee;
  }
  .lable-wrap {
    width: rem(212px);
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

