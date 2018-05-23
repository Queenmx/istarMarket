<template>
<div class="leaver">
    <v-header>
        <i slot="left" class="el-icon-arrow-left" @click="clear"></i>
        <p slot="title">请假</p>
    </v-header>
    <div class="leave">
        <!-- <p class="leave_tips">这里本月第2次提交请假</p> -->
        <el-row class="leave_name">
            <el-col :span="7" class="leave_label"><i class="red_must">*</i>请假类型</el-col>
            <el-col :span="17" class="leave_value">
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>
            </el-col>
        </el-row>
        <!-- <p class="leave_tips">年假/调休余额可设置，并支持自动扣减</p> -->
        <el-row class="leave_name">
            <el-col :span="6" class="leave_label"><i class="red_must">*</i>开始时间</el-col>
            <el-col :span="18" class="leave_value">
               <el-date-picker class="demonstration"
                    v-model="value2"
                    type="datetime"
                    :picker-options="pickerBeginDateBefore"
                   align="left"
                    placeholder="选择开始时间">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row class="leave_name">
            <el-col :span="6" class="leave_label"><i class="red_must">*</i>结束时间</el-col>
            <el-col :span="18" class="leave_value">
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
                    <li class="userName"><span>{{approver}}</span></li>
                </ul>
                <el-button type="text" @click="goApprover"  class="adduser"><i class="el-icon-plus"></i></el-button>
            </el-col>
        </el-row>
        <!-- <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>抄送人</el-col>
            <el-col :span="24" class="textarea">
                <ul class="nameList" id="NameList">
                    <li class="userName"><span v-for="(item,i) in sendtoinfo" :key="i">{{item}}</span></li>
                </ul>
                <el-button type="text"   class="adduser" @click="sendTo"><i class="el-icon-plus"></i></el-button>
            </el-col>
        </el-row> -->
        <el-button class="submit_btn" type="primary" @click="submit">提交</el-button>
        
    </div>
</div>  
</template>
<script>
import Bus from "../../util/Bus.js";
import { MessageBox } from "element-ui";
import { oaLeave } from "@/util/axios.js";
import { setItem } from "@/util/util.js";
import { getItem, checkSys } from "@/util/util.js";
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
      sendtoinfo: JSON.parse(getItem("sendTo")),
      approver: getItem("approver"),
      input: "",
      textarea: "",
      //请假类型
      options: [
        {
          value: "1",
          label: "事假"
        },
        {
          value: "2",
          label: "病假"
        },
        {
          value: "3",
          label: "产假"
        },
        {
          value: "4",
          label: "陪产假"
        },
        {
          value: "5",
          label: "调休"
        },
        {
          value: "6",
          label: "婚假"
        }
      ],
      value: "",
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
    console.log(this.sendtoinfo);
    // console.log(this.$route.query.userId)
  },
  methods: {
    initDate() {
      // localStorage.removeItem('approver');
      // localStorage.removeItem("sendTo");
      let leaveInfo = getItem("leave");
      console.log(leaveInfo);
      if (leaveInfo) {
        getItem("leave");
        let leaveInfo = JSON.parse(localStorage.leave);
        console.log(leaveInfo);
        this.value = leaveInfo.type;
        this.value2 = leaveInfo.beginTime;
        this.value3 = leaveInfo.endTime;
        this.input = leaveInfo.lengthTime;
        this.textarea = leaveInfo.reason;
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
      setItem("leave", {
        type: this.value,
        beginTime: this.value2,
        endTime: this.value3,
        lengthTime: this.input,
        reason: this.textarea
      });
      this.$router.push("/oaSystem/selectApprover");
      console.log(localStorage);
    },
    sendTo() {
      setItem("leave", {
        type: this.value,
        beginTime: this.value2,
        endTime: this.value3,
        lengthTime: this.input,
        reason: this.textarea
      });
      this.$router.push({
        path: "/oaSystem/selectSendTo"
      });
    },
    async submit() {
      getItem("approver");
      getItem("approverId");
      getItem("sendTo");
      getItem("sendToId");
      getItem("userinfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        type: this.value,
        beginTime: this.value2,
        endTime: this.value3,
        userId: userinfo.userId,
        lengthTime: this.input,
        reason: this.textarea,
        approver: localStorage.approverId,
        sendTo: localStorage.sendToId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      if (!this.value) {
        this.$message("请假类型不能为空");
      } else if (!this.value2) {
        this.$message("请假开始时间不能为空");
      } else if (!this.value3) {
        this.$message("请假结束时间不能为空");
      } else if (!this.input.trim()) {
        this.$message("请假时长不能为空");
      } else if (!this.textarea.trim()) {
        this.$message("请假理由不能为空");
      } else if (!localStorage.approverId) {
        this.$message("审批人不能为空");
      } else {
        let res = await oaLeave(enData);
        let deData1 = strDec(res, "ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        if (deData.code === "0000") {
          this.$message("请假成功");
          // this.clear();
          this.$router.push("/oaSystem");
        } else {
          this.$message(deData.msg);
        }
      }
    },
    clear() {
      // this.$router.push("/oaSystem");
      localStorage.removeItem("sendTo");
      localStorage.removeItem("approver");
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.leaver {
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
      // line-height:rem(98px);
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
    // margin-top: rem(30px) ;
    // box-sizing: content-box;
    width: 100%;
    // margin-left: 10%;
    // height: rem(60px);
    font-size: rem(30px);
  }
}
.el-message-box {
  width: 90%;
}
.el-dialog {
  width: 70%;
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: rem(500px);
  // height: rem(50px);
  // line-height: rem(50px);
  // font-size: rem(20px);
}
.el-select-dropdown__item {
  font-size: rem(20px);
}
.el-textarea__inner {
  font-size: rem(20px);
}
.leave {
  .el-input__icon {
    line-height: rem(25px);
  }
}
// .el-time-spinner{
//   width: rem(150px);
//   .el-time-spinner__wrapper{
//     width:rem(50px);
//   }
// }
.el-time-panel {
  width: rem(300px);
  .el-time-spinner.has-seconds .el-time-spinner__wrapper {
    width: 33%;
  }
}
</style>

