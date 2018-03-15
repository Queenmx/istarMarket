<template>
<div class="performence">
    <v-header>
        <i slot="left" class="el-icon-arrow-left"></i>
        <p slot="title">绩效自评</p>
    </v-header>
    <div class="leave">
        <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>上月工作任务</el-col>
            <el-col :span="24" class="textarea">
                <textarea rows="5" placeholder="请填写上月工作任务" v-model="preTask"></textarea>
            </el-col>
        </el-row>
        <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>实际完成任务</el-col>
            <el-col :span="24" class="textarea">
                <textarea rows="5" placeholder="请填写实际完成任务" v-model="preFinishTask"></textarea>
            </el-col>
        </el-row>
        <el-row class="leave_name gray_line">
            <el-col :span="7" class="leave_label"><i class="red_must" >*</i>任务达成率</el-col>
            <el-col :span="17" class="leave_value">
                <input type="text" placeholder="数字业绩类型请填写达成率" v-model="rate"/>
            </el-col>
        </el-row>
        <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>上月工作自评</el-col>
            <el-col :span="24" class="textarea">
                <textarea rows="5" placeholder="请填写上月工作自评" v-model="selfEvaluate"></textarea>
            </el-col>
        </el-row>
        <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>本月工作任务</el-col>
            <el-col :span="24" class="textarea">
                <textarea rows="5" placeholder="请填写本月工作任务"  v-model="workTask"></textarea>
            </el-col>
        </el-row>
        <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>本月工作计划</el-col>
            <el-col :span="24" class="textarea">
                <textarea rows="5" placeholder="请填写本月工作计划" v-model="workPlan"></textarea>
            </el-col>
        </el-row>
        <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>审批人</el-col>
            <el-col :span="24" class="textarea">
                <ul class="nameList">
                    <li class="userName"><span>{{performenceApprover}}</span></li>
                </ul>
                <el-button type="text" @click="goApprover"  class="adduser"><i class="el-icon-plus"></i></el-button>
            </el-col>
            <!-- <el-col :span="24" class="leave_label"><i class="red_must">*</i>抄送人</el-col>
            <el-col :span="24" class="textarea">
               <ul class="nameList">
                    <li class="userName"><span v-for="(item,i) in performenceSendtoinfo" :key="i">{{item}}</span></li>
                </ul>
                <el-button type="text"   class="adduser" @click="sendTo"><i class="el-icon-plus"></i></el-button>
            </el-col> -->
          </el-row>
        <el-button class="submit_btn" type="primary" @click="submit">提交</el-button>
    </div>
</div>  
</template>
<script>
import { oaPerformence } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { setItem } from "@/util/util.js";
import { MessageBox } from "element-ui";
import { BaiduMap, BmGeolocation } from "vue-baidu-map";
var map, point, myGeo, geolocation;
export default {
  data() {
    return {
      performenceSendtoinfo: JSON.parse(getItem("performenceSendTo")),
      performenceApprover: getItem("performenceApprover"),
      preTask:'',
      preFinishTask:'',
      rate:'',
      selfEvaluate:'',
      workTask:'',
      workPlan:'',
       address: self.address,
      //树形图
     
      defaultProps: {
        children: "children",
        label: "label"
      },
      input: "",
      textarea: "",
      //请假类型
      options: [
        {
          value: "选项1",
          label: "陪产假"
        },
        {
          value: "选项2",
          label: "调休"
        },
        {
          value: "选项3",
          label: "事假"
        },
        {
          value: "选项4",
          label: "病假"
        },
        {
          value: "选项5",
          label: "产假"
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
    this.initData();
     this.initMap();
    this.getPosition();
  },
   components: {
    BaiduMap,
    BmGeolocation
  },
  methods: {
      initData() {
      // localStorage.removeItem('record')
      let performenceInfo = getItem("performence");
      if (performenceInfo) {
        getItem("performence");
        let performenceInfo = JSON.parse(localStorage.performence);
        console.log(performenceInfo);

        // console.log(recordInfo.type)
        this.preTask = performenceInfo.preTask;
        this.preFinishTask = performenceInfo.preFinishTask;
        this.rate = performenceInfo.rate;
        this.selfEvaluate = performenceInfo.selfEvaluate;
        this.workTask = performenceInfo.workTask;
        this.workPlan = performenceInfo.workPlan;
      }
    },
    goApprover() {
      setItem("performence", {
        preTask: this.preTask,
        preFinishTask: this.preFinishTask,
        rate: this.rate,
        selfEvaluate: this.selfEvaluate,
        workTask: this.workTask,
        workPlan: this.workPlan
      });
      this.$router.push("/oaSystem/personnelperformence");
    },
    sendTo() {
      setItem("performence", {
       preTask: this.preTask,
        preFinishTask: this.preFinishTask,
        rate: this.rate,
        selfEvaluate: this.selfEvaluate,
        workTask: this.workTask,
        workPlan: this.workPlan
      });
      this.$router.push("/oaSystem/departmentperformence");
    },  
       //获取经纬度
    initMap() {
      //   map = new BMap.Map("container");
      //   point = new BMap.Point(116.331398, 39.897445);
      //   map.centerAndZoom(point, 11);
      // 创建地理编码实例
      myGeo = new BMap.Geocoder();
      //   map.addControl(new BMap.NavigationControl());
      geolocation = new BMap.Geolocation();
    },
    getPosition() {
      var self = this;
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            // map.addOverlay(mk);
            // map.panTo(r.point);
            self.changeToAddress(r.point.lng, r.point.lat);
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );
    },
    changeToAddress(lng, lat) {
      var self = this;
      myGeo.getLocation(new BMap.Point(lng, lat), function(result) {
        if (result) {
          self.address = result.address;
        }
      });
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
     async submit(){
      getItem("userinfo");
      getItem('performenceApprover');
      getItem('performenceApproverId');
      getItem("performenceSendto");
      let userinfo=JSON.parse(localStorage.userInfo)
      var data = {
        preTask: this.preTask,
        preFinishTask :this.preFinishTask,
        rate:this.rate,
        selfEvaluate:this.selfEvaluate,
        workTask:this.workTask,
        workPlan:this.workPlan,
        location: this.address,
        userId:userinfo.userId,
        approver:localStorage.performenceApproverId,
        sendTo:this.performenceSendtoinfo
      };
          if(!this.preTask.trim()){
          this.$message("上月工作任务不能为空");
      }else if(!this.preFinishTask.trim()){
          this.$message("上月完成不能为空");
      }else if(!this.rate.trim()){
          this.$message("达成率不能为空");
      }else if(!this.selfEvaluate.trim()){
          this.$message("自评不能为空");
      }else if(!this.workTask.trim()){
          this.$message("本月工作任务不能为空");
      }else if(!this.workPlan.trim()){
           this.$message("本月工作计划不能为空");
      }else if(!localStorage.performenceApprover){
           this.$message("审批人不能为空");
      }else{
        let res = await oaPerformence(data);
        if (res.code === "0000") {
        this.$message("提交成功")
        // console.log(res.code)
          this.$router.push("/oaSystem");
        } else {
          this.$message(res.msg);
        }
     }
     
  }
  }
  
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.performence {
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
    .userName{
      span{
        display: inline-block;
        background-color: #409eff;
        color: #fff;
        // padding: rem(10px);
        border-radius: rem(5px);
        margin: rem(5px);
      }
     
      
    }
    .red_must {
      color: red;
      font-style: normal;
      padding-right: rem(8px);
    }
    .leave_label {
      padding-top: rem(10px);
      .label_tips {
        font-size: rem(24px);
        padding-left: rem(15px);
        color: #969696;
      }
    }
    .textarea {
      padding: rem(20px) 0 rem(10px);
      textarea {
        width: 100%;
        border: none;
        &::placeholder {
          color: #959595;
        }
      }
    }
    .adduser {
      border: 1px dashed #c0ccda;
      width: rem(98px);
      height: rem(98px);
      border-radius: 50%;
      position: relative;
      i {
        color: #c0ccda;
       position: absolute;
      top:rem(35px);
      left:rem(36px)
    
      }
    }
  }
  .gray_line {
    border-top: rem(20px) solid $bgcolor;
  }
  .leave_value {
    text-align: right;
    input {
      border: none;
      padding-top: rem(18px);
    }
  }
  .submit_btn {
    // margin: rem(30px) 0;
    // box-sizing: content-box;
    width: 100%;
    // margin-left:10%;
    // height:rem(60px);
    font-size:rem(24px)
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
.el-dialog{
  .el-dialog__title{
    font-size:rem(30px);
    line-height:rem(30px)
  }
  .el-tree-node__content{
    line-height:rem(50px);
    height:rem(50px)
  }
  .el-tree-node__label{
    font-size:rem(20px);
    line-height:rem(30px)
  }
  .el-button {
    width:rem(100px);
    height:rem(50px);
    font-size:rem(20px)
  }
}
</style>
