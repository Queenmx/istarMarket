<template>
<div class="rooterEle out">
    <div class="header-wrap">
    <v-header>
        <i slot="left" class="el-icon-arrow-left" @click="clear"></i>
        <p slot="title">外出</p>
    </v-header>
    </div>
    <div class="leave-wrap">
        <!-- <p class="leave_tips">这里本月第2次提交请假</p> -->
        <!-- <el-row class="leave_name">
            <el-col :span="7" class="leave_label"><i class="red_must">*</i>请假类型</el-col>
            <el-col :span="17" class="leave_value">
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>
            </el-col>
        </el-row> -->
        <!-- <p class="leave_tips">年假/调休余额可设置，并支持自动扣减</p> -->
        <el-row class="leave_name">
            <el-col :span="7" class="leave_label"><i class="red_must">*</i>开始时间</el-col>
            <el-col :span="17" class="leave_value">
                <el-date-picker
                    v-model="value2"
                    :picker-options="pickerBeginDateBefore"
                    type="datetime"
                    align="right"
                    placeholder="选择开始时间">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row class="leave_name">
            <el-col :span="7" class="leave_label"><i class="red_must">*</i>结束时间</el-col>
            <el-col :span="17" class="leave_value">
                <el-date-picker
                    v-model="value3"
                    :picker-options="pickerBeginDateAfter"
                    type="datetime"
                    align="right"
                    placeholder="选择结束时间">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row class="leave_name">
            <el-col :span="9" class="leave_label"><i class="red_must">*</i>时长（小时）</el-col>
            <el-col :span="15" class="leave_value">
                <el-input v-model="input" placeholder="请输入时长"></el-input>
            </el-col>
        </el-row>
        <p class="leave_tips">时长将自动计入考勤</p>
        <el-row class="leave_name">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>请假事由</el-col>
            <el-col :span="24" class="textarea">
                <el-input type="textarea" :rows="4" placeholder="请填写请假事宜" v-model="textarea"></el-input>
            </el-col>
        </el-row>
        <!-- <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label">图片</el-col>
            <el-col :span="24" class="textarea">
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
            </el-col>
        </el-row> -->
        <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>审批人</el-col>
            <el-col :span="24" class="textarea">
                <ul class="nameList">
                    <li class="userName"><span>{{approverOut}}</span></li>
                </ul>
                <el-button type="text"  class="adduser" @click="goApprover"><i class="el-icon-plus"></i></el-button>
                <!-- <el-dialog title="添加审批人" :visible.sync="centerDialogVisible" center>
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog> -->
            </el-col>
        </el-row>
        <!-- <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>抄送人</el-col>
            <el-col :span="24" class="textarea">
                <ul class="nameList">
                    <li class="userName"><span v-for="(item,i) in sendToOut" :key="i">{{item}}</span></li>
                </ul>
                <el-button type="text" class="adduser" @click="sendTo"><i class="el-icon-plus"></i></el-button> -->
                <!-- <el-dialog title="添加抄送人" :visible.sync="centerDialogVisible" center>
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog> -->
            <!-- </el-col>
        </el-row> -->
         <el-button class="submit_btn" type="primary" @click="submit">提交</el-button>
    </div>
</div>  
</template>
<script>
import { MessageBox } from "element-ui";
import { oaOut } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { setItem } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      pickerBeginDateBefore: {},
      pickerBeginDateAfter: {
        disabledDate: time => {
          let beginDateVal = this.value2;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        }
      },
      approverOut: getItem("approverOut"),
      sendToOut: JSON.parse(getItem("sendToOut")),
      input: "",
      textarea: "",
      value2: "",
      value3: "",
      //图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      centerDialogVisible: false
    };
  },
  mounted() {
    this.initDate();
  },
  methods: {
    initDate() {
      // localStorage.removeItem('record')
      let outInfo = getItem("out");
      if (outInfo) {
        getItem("out");
        let outInfo = JSON.parse(localStorage.out);
        // let recordInfo = getItem('record')
        console.log(outInfo);
        // console.log(recordInfo.type)
        this.value2 = outInfo.beginTime;
        this.value3 = outInfo.endTime;
        this.input = outInfo.lengthTime;
        this.textarea = outInfo.reason;
      }
    },
    handleNodeClick(data) {
      //树形图
      console.log(data);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    goApprover() {
      setItem("out", {
        beginTime: this.value2,
        endTime: this.value3,
        lengthTime: this.input,
        reason: this.textarea
      });
      //  console.log(localStorage)
      this.$router.push("/oaSystem/selectApproverOut");
    },
    sendTo() {
      setItem("out", {
        beginTime: this.value2,
        endTime: this.value3,
        lengthTime: this.input,
        reason: this.textarea
      });
      this.$router.push("/oaSystem/selectSendToOut");
    },
    async submit() {
      getItem("userinfo");
      getItem("approverOutId");
      getItem("approverOut");
      getItem("sendToOut");
      // getItem("approverOutId1");
      // getItem("sendToOut1");
      let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        beginTime: this.value2,
        endTime: this.value3,
        userId: userinfo.userId,
        lengthTime: this.input,
        reason: this.textarea,
        approver: localStorage.approverOutId,
        sendTo: this.sendToOut
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      if (!this.value2) {
        this.$message("请假开始时间不能为空");
      } else if (!this.value3) {
        this.$message("请假结束时间不能为空");
      } else if (!this.input.trim()) {
        this.$message("请假时长不能为空");
      } else if (!this.textarea.trim()) {
        this.$message("请假理由不能为空");
      } else if (!localStorage.approverOutId) {
        this.$message("审批人不能为空");
      } else {
        let res = await oaOut(enData);
        let deData1 = strDec(res, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        if (deData.code === "0000") {
          this.$message("请假成功");
          // console.log(res.code)
          this.$router.push("/oaSystem");
        } else {
          this.$message(deData.msg);
        }
      }
    },
    clear() {
      //   this.$router.push("/oaSystem");
      localStorage.removeItem("approverOutId");
      localStorage.removeItem("sendToOut");
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.out {
  display: flex;
  flex-direction: column;
  background: #fff;
  .leave-wrap {
    position: relative;
    flex: 1;
    background: #fff;
    .leave_tips {
      color: #979797;
      font-size: rem(26px);
      padding: rem(40px) rem(30px) rem(20px);
      background-color: $bgcolor;
    }
    .leave_name {
      font-size: rem(32px);
      color: $fontcolor;
      padding: rem(30px);
      border-bottom: 1px solid $bdcolor;
      .red_must {
        color: red;
        font-style: normal;
        padding-right: rem(8px);
      }
      .leave_label {
        padding-top: rem(10px);
      }
      .textarea {
        padding: rem(20px) 0 rem(10px);
      }
      .adduser {
        border: 1px dashed #c0ccda;
        width: rem(98px);
        height: rem(98px);
        border-radius: 50%;
        vertical-align: middle;
        text-align: center;
        i {
          color: #c0ccda;
        }
      }
    }
    .nameList {
      padding: rem(30px) 0;
      overflow: hidden;
      .userName {
        span {
          display: inline-block;
          background-color: #409eff;
          color: #fff;
          // padding: rem(10px);
          border-radius: rem(5px);
          margin: rem(5px);
        }
      }
    }
    .gray_line {
      border-top: rem(20px) solid $bgcolor;
    }
    .leave_value {
      text-align: right;
    }
    .submit_btn {
      position: absolute;
      bottom: 0;
      // margin-top: rem(30px) ;
      // box-sizing: content-box;
      width: 100%;
      // margin-left: 10%;
      height: rem(80px);
      font-size: rem(30px);
    }
  }
  .el-message-box {
    width: 90%;
  }
  .el-dialog {
    width: 70%;
  }
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.el-input__inner {
  // width:rem(280px)
  height: rem(50px);
  line-height: rem(50px);
  font-size: rem(20px);
}
.el-select-dropdown__item {
  font-size: rem(20px);
}
.el-textarea__inner {
  font-size: rem(20px);
}
</style>

