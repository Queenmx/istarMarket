<template>
	<div class="auditHistory">
		<v-header class="wrap">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">历史申请</p>
		</v-header>
		<div class="list-wrap">
			<audit-list :list="list"></audit-list>
		</div>
	</div>
</template>
<script>
import auditList from "../../components/auditList";
import { getItem } from "@/util/util.js";
import { oaAuditHistory } from "@/util/axios.js";
import { strEnc, strDec } from '@/util/aes.js'
export default {
  data() {
    return {
      list: [],
      type: this.$route.query.type
    };
  },
  components: {
    auditList
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      getItem("userinfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        userId: userinfo.userId,
        type: this.type
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res = await oaAuditHistory(enData);
      let deData1 = strDec(res,"ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        this.list = deData.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.auditHistory {
  .list-wrap {
    padding-top: 10px;
  }
}
</style>