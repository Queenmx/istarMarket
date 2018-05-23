<template>
  <div class="leave">
      <v-header>
          <i slot="left" class="el-icon-arrow-left" @click="clear"></i>
          <p slot="title">日报</p>
      </v-header>
      <div class="dayly_contain">
          <el-row class="leave_name gray_line">
              <el-col :span="8">今日完成工作</el-col>
              <el-col :span="16">
                  <input type="text" class="edit_input" placeholder="请填写今日完成工作" v-model="done"/>
                  <i class="el-icon-circle-close" @click="removeDone"></i>

              </el-col>
          </el-row>
          <el-row class="leave_name">
              <el-col :span="8">未完成工作</el-col>
              <el-col :span="16">
                  <input type="text" class="edit_input" placeholder="请填写未完成工作"  v-model="notDone"/>
                  <i class="el-icon-circle-close" @click="removeNotDone"></i>
              </el-col>
          </el-row>
          <el-row class="leave_name">
              <el-col :span="8">需协调工作</el-col>
              <el-col :span="16">
                  <input type="text" class="edit_input" placeholder="请填写需协调工作" v-model="coordinate"/>
                  <i class="el-icon-circle-close" @click="removeC"></i>
              </el-col>
          </el-row>
          <p class="leave_tips">备注信息</p>
          <el-row class="leave_name">
              <textarea class="edit_textarea" rows="5" placeholder="请填写备注信息…" v-model="remark "></textarea>
          </el-row>
          <!-- <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label">图片</el-col>
            <el-col :span="24" class="textarea">
                <el-upload
                    action=""
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-col>
          </el-row> -->
          <!-- <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label">附件</el-col>
            <el-col :span="24" class="textarea">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange"
                    :file-list="fileList3">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-col>
          </el-row> -->
          <p class="leave_tips leave_location"><i class="el-icon-location" v-html="address"></i></p>
          <el-row class="leave_name gray_line">
            <el-col :span="24" class="leave_label"><i class="red_must">*</i>发送至</el-col>
            <el-col :span="24" class="textarea">
                <ul class="nameList">
                    <li class="userName"><span>{{daylyApprover}}</span></li>
                </ul>
                <el-button type="text" @click="goApprover"  class="adduser"><i class="el-icon-plus"></i></el-button>
            </el-col>
            <!-- <el-col :span="24" class="leave_label"><i class="red_must">*</i>抄送人</el-col>
            <el-col :span="24" class="textarea">
               <ul class="nameList">
                    <li class="userName"><span v-for="(item,i) in daylySendtoinfo" :key="i">{{item}}</span></li>
                </ul>
                <el-button type="text"   class="adduser" @click="sendTo"><i class="el-icon-plus"></i></el-button>
            </el-col> -->
          </el-row>
          <el-row class="leave_name gray_line">
              <el-button class="submit_btn" type="primary" @click="submit">提交</el-button>
          </el-row>
      </div>
  </div>  
</template>
<script>
import { oaDayly } from "@/util/axios.js";
import { getItem, checkSys, callAddress, initMap } from "@/util/util.js";
import { setItem } from "@/util/util.js";
import { MessageBox } from "element-ui";
import { BaiduMap, BmGeolocation } from "vue-baidu-map";
import { strEnc, strDec } from '@/util/aes.js'
var map, point, myGeo, geolocation;
export default {
  data() {
    return {
      daylySendtoinfo: JSON.parse(getItem("daylySendTo")),
      daylyApprover: getItem("daylyApprover"),
      done: "",
      notDone: "",
      coordinate: "",
      remark: "",

      // 定位
      center: { lng: 0, lat: 0 },
      zoom: 4,
      address: "定位中",
      //树形图

      input: "",
      textarea: "",
      //图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      centerDialogVisible: false,
      //附件上传
      fileList3: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        //   status: "finished"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        //   status: "finished"
        // }
      ]
    };
  },
  mounted() {
    // this.initMap();
    // this.getPosition();
    var res = checkSys();
    var self = this;
    this.initData();
    if (res === "ios") {
      setTimeout(function() {
        self.initMap();
        self.getPosition();
      }, 1000);
    } else {
      callAddress();
      setTimeout(function() {
        self.address = getItem("location");
        initMap(self.address);
      }, 1000);
    }
  },
  components: {
    BaiduMap,
    BmGeolocation
  },
  methods: {
    initData() {
      // localStorage.removeItem('record')
      let daylyInfo = getItem("dayly");
      if (daylyInfo) {
        getItem("dayly");
        let daylyInfo = JSON.parse(localStorage.dayly);
        console.log(daylyInfo);

        // console.log(recordInfo.type)
        this.done = daylyInfo.done;
        this.notDone = daylyInfo.notDone;
        this.coordinate = daylyInfo.coordinate;
        this.remark = daylyInfo.remark;
      }
    },
    goApprover() {
      setItem("dayly", {
        done: this.done,
        notDone: this.notDone,
        coordinate: this.coordinate,
        remark: this.remark
      });
      this.$router.push("/oaSystem/daylyselectApprover");
    },
    sendTo() {
      setItem("dayly", {
        done: this.done,
        notDone: this.notDone,
        coordinate: this.coordinate,
        remark: this.remark
      });
      this.$router.push({
        path: "/oaSystem/daylyselectSendTo"
        // query: { approverId: this.$route.query }
      });
      // this.$router.push("/oaSystem/department");
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
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    // beforeAvatarUpload(file){
    //   // const type = file.type === 'image/*';
    //   // return type;
    //   console.log(file.name);
    //   var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function(e){
    //        console.log(this.result) // 这个就是base64编码了
    //     }
    // },

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
    async submit() {
      getItem("userinfo");
      getItem("daylyApprover");
      getItem("daylyApproverId");
      getItem("daylySendto");
      console.log(localStorage);
      let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        done: this.done,
        notDone: this.notDone,
        coordinate: this.coordinate,
        remark: this.remark,
        location: this.address,
        userId: userinfo.userId,
        approver: localStorage.daylyApproverId,
        sendTo: this.daylySendtoinfo
      };
       var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      if (!this.done.trim()) {
        this.$message("今日完成不能为空");
      } else if (!this.notDone.trim()) {
        this.$message("未完成不能为空");
      } else if (!this.coordinate.trim()) {
        this.$message("协调不能为空");
      } else if (!this.remark.trim()) {
        this.$message("备注信息不能为空");
      } else if (!localStorage.daylyApprover) {
        this.$message("发送至不能为空");
      } else {
        let res = await oaDayly(enData);
        let deData1 = strDec(res,"ZND20171030APIMM");
        let deData = JSON.parse(deData1);
        if (deData.code === "0000") {
          this.$message("提交成功");
          // console.log(res.code)
          this.$router.push("/oaSystem");
        } else {
          this.$message(deData.msg);
        }
      }
    },
    clear() {
      //   this.$router.push("/oaSystem");
      localStorage.removeItem("daylySendto");
      localStorage.removeItem("daylyApprover");
    },
    removeDone() {
      // console.log(this.done)
      this.done = "";
    },
    removeNotDone() {
      // console.log(this.done)
      this.notDone = "";
    },
    removeC() {
      // console.log(this.done)
      this.coordinate = "";
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.leave {
  .leave_tips {
    color: #979797;
    font-size: rem(26px);
    padding: rem(40px) rem(30px) rem(20px);
    background-color: $bgcolor;
  }
  .leave_location {
    color: #53a6ff;
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
    .leave_label {
      padding-top: rem(10px);
    }
    .textarea {
      padding: rem(20px) 0 rem(10px);
      .tips {
        font-size: rem(24px);
        color: #969696;
        padding: rem(10px) 0;
      }
    }

    .adduser {
      border: 1px dashed #c0ccda;
      width: rem(98px);
      height: rem(98px);
      border-radius: 50%;
      display: block;
      text-align: center;

      i {
        color: #c0ccda;
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
    // margin: rem(30px) rem(30px) rem(50px);
    // box-sizing: content-box;
    // margin-left: 10%;
    width: 100%;
  }
  .edit_input {
    border: none;
    &::-webkit-input-placeholder {
      color: #959595;
    }
  }
  .edit_textarea {
    width: 100%;
    border: none;
  }
}
.el-message-box {
  width: 90%;
}
.el-dialog {
  width: 70%;
}
</style>
