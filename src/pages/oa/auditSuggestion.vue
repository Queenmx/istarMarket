<template>
	<div class="auditSuggestion">
		<v-header class="wrap">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">审批意见</p>
		</v-header>
		<split></split>
		<div class="textarea-wrap">
			<textarea :placeholder="isAgree?'请输入拒绝理由':'请输入同意理由'" v-model="messge"></textarea>
		</div>
		<split></split>
		<!-- <div class="wrap section">
			<p class="title">图片</p>
			<el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
		</div>
        <split></split>
        <div class="wrap section">
			<p class="title">附件</p>
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
		</div> -->
        <div class="footer" @click="initData">
            <span v-if="isAgree">确认拒绝</span>
            <span v-else> 确认同意</span>
        </div>
	</div>
</template>
<script>
import { oaAuditSuggestion } from "@/util/axios.js";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      messge: "",
      imgs: "",
      isAgree: this.$route.params.status == "disagree" ? 1 : 0
    };
  },
  mounted() {
    document.getElementsByClassName("el-upload--picture-card")[0].style.width =
      "rem(98px)";
    // this.initData();
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async initData() {
      var data = {
        mainId: this.$route.params.mainId,
        flag: this.isAgree,
        remarks: this.messge,
        dialogImageUrl: this.dialogImageUrl
      };
      let res = await oaAuditSuggestion(data);
      if (res.code == "0000") {
        this.$message("提交成功");
        this.$router.push("/oaSystem/audit");
      } else {
        this.$message(res.msg);
      }
      //   console.log(data);
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.auditSuggestion {
  min-height: 100%;
  padding-bottom: rem(100px);
  box-sizing: border-box;
  .textarea-wrap {
    textarea {
      padding: rem(30px) rem(28px);
      height: rem(340px);
      font-size: rem(28px);
      resize: none;
      border: none;
    }
  }
  .section {
    padding-bottom: 17px;
  }
  .title {
    padding-top: 15px;
    padding-bottom: 30px;
    font-size: rem(32px);
    color: #646464;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: rem(100px);
    line-height: rem(100px);
    text-align: center;
    color: #fff;
    font-size: rem(32px);
    background: $blue;
  }
  .el-upload--picture-card {
    width: rem(98px);
    height: rem(98px);
    line-height: rem(96px);
    i {
      font-size: rem(28px);
    }
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: rem(98px);
    height: rem(98px);
  }
}
</style>
