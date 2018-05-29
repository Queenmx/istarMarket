<template>
  <div class="myService">
    <v-header class="header">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">在线客服</p>
      <!-- <i slot="right"><img src="../../assets/images/service.png" alt="" @click="pop"></i> -->
		</v-header>
    <div class="open" v-show="openService">
      <div  class="openBox">
      <div class="imgWrap"><img src="../../assets/images/pop.png" alt=""></div>
      <div class="wrap">
        <h3>7*12小时客服服务</h3>
        <p class="p1">xxx官方免费为你提供热线咨询服务，及时解答你的问题，服务时间为早8点到晚8点</p>
      </div>
      <ul class="foot">
        <li @click="noNeed"><span>暂不需要</span></li>
        <li><a href="tel:xx12321321">立即拨打</a></li>
      </ul>
    </div>
    </div>
    <ul class="list chat">
      <li v-for="item in messageList" :key="item.id" :class="[item.from==='xiaoxiao'?'service':'users']">
          <div v-if="item.from==='xiaoxiao'|| item.from==='admin'">
            <span class="faceImg"><img src="../../assets/images/serPic.png" alt="" ></span>
            <span class="dialog">{{item.data}}</span>
          </div>
          <div v-else>
            <span class="faceImg"><img src="../../assets/images/yixiang.png" alt="" ></span>
            <span class="dialog">{{item.data}}</span>
        </div>
      </li>
    </ul>
    <ul class="footer">
        <!-- <li class="img1"><img src="../../assets/images/face.png" alt=""></li> -->
        <li class="in1"><textarea type="text" id="msg"></textarea></li>
        <li class="btn" @click="sendMessage()">
            <el-tooltip :disabled="disabled" content="不能发送空白信息" placement="bottom" effect="light">
                <el-button @click="disabled = !disabled">发送</el-button>
                <input type="button" value="发送">
            </el-tooltip>
        </li>
    </ul>
  </div>
</template>
<script>
import { getToken } from "@/util/axios.js";
import { getItem } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      disabled: "",
      message_array: [],
      message: "",
      openService: false,
      messageList: [],
      selected: "xiaoxiao",
      Emoji: WebIM.Emoji,
      userInfo: JSON.parse(getItem("userInfo")),
      tokenkey: ""
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    messageList: function() {
      this.goBottom();
    }
  },
  methods: {
    async init() {
      var self = this;
      await self.initData();
      this.conn = new WebIM.connection({
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
        //   https:
        //     typeof WebIM.config.https === "boolean"
        //       ? WebIM.config.https
        //       : location.protocol === "https:",
        https: WebIM.config.https,
        url: WebIM.config.xmppURL,
        heartBeatWait: WebIM.config.heartBeatWait,
        autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
        autoReconnectInterval: WebIM.config.autoReconnectInterval,
        apiUrl: WebIM.config.apiURL,
        isAutoLogin: true
      });
      // this.register();
      this.login();
      this.conn.listen({
        onOpened: function() {
          self.conn.setPresence();
          console.log(this.context.userId + "登陆成功");
          this.getRoster({
            success: function(roster) {
              self.friends = roster;
            },
            error: function() {}
          });
        },
        onClosed: function() {
          console.log("onClosed");
          // self.$route.$router.go({ name: "index" });
        },
        onTextMessage: function(message) {
          console.log(message);
          // self.returnMessage.push(message);
          self.messageList.push(message);
          console.log(message);
          // if (WebIM.config.isWindowSDK) {
          //   message = eval("(" + message + ")");
          // }
        },
        onEmojiMessage: function(message) {
          console.log("Emoji");
          var data = message.data;
          for (var i = 0, l = data.length; i < l; i++) {
            console.log(data[i]);
          }
        },
        onPictureMessage: function(message) {
          console.log("Location of Picture is ", message.url);
        },
        onError: function(message) {
          console.log("回调失败", message);
        }
      });
    },
    async initData() {
      var data = {
        userId: this.userInfo.userId
      };
      data = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await getToken(data);
      res.data = JSON.parse(strDec(res.data, "ZND20171030APIMM"));
      if (res.code === "0000") {
        this.tokenkey = res.data.access_token;
        // console.log("aaaa", this.tokenkey, res.data.access_token);
      }
    },
    pop() {
      this.openService = true;
    },
    noNeed() {
      this.openService = false;
    },
    // dealMessage() {
    //   if (this.message != "") {
    //     this.message_array.push(this.message);
    //     this.message = "";
    //   }
    // },
    register() {
      var username = this.userInfo.userId;
      var password = this.userInfo.userId;
      var options = {
        username: username,
        password: password,
        nickname: "",
        appKey: WebIM.config.appkey,
        success: function() {
          console.log("注册成功");
        },
        error: function() {
          console.log("注册失败");
        },
        apiUrl: WebIM.config.apiURL
      };
      this.conn.registerUser(options);
      //   WebIM.utils.registerUser(options);
    },
    login() {
      var self = this;
      var username = self.userInfo.userName;
      //   var options = {
      //     apiUrl: WebIM.config.apiURL,
      //     user: username,
      //     pwd: password,
      //     appKey: WebIM.config.appkey,
      //     success: function(token) {
      //       var token = token.access_token;
      //       WebIM.utils.setCookie("webim_" + encryptUsername, token, 1);
      //     },
      //     error: function() {}
      //   };
      var options = {
        apiUrl: WebIM.config.apiURL,
        user: username,
        accessToken: self.tokenkey,
        appKey: WebIM.config.appkey
      };
      this.conn.open(options);
    },
    sendMessage() {
      var self = this;
      var username = this.userInfo.userId;
      var messageContext = document.getElementById("msg").value;
      if (!messageContext.trim()) {
        // this.$message("不能发送空白信息");
        return;
      }
      var id = this.conn.getUniqueId(); //生成本地消息id
      var msg = new WebIM.message("txt", id); //创建文本消息
      msg.set({
        msg: messageContext,
        to: self.selected,
        type: "chat",
        success(id, serverMsgId) {
          console.log("发送成功");
          self.messageList.push({
            from: username,
            to: self.selected,
            data: messageContext,
            id: id
          });
          console.log(self.messageList);
        } //消息发送成功回调
      });
      this.conn.send(msg.body);
      document.getElementById("msg").value = "";
    },
    goBottom() {
      var goBottomDiv = document.getElementsByClassName("chat")[0];
      goBottomDiv.scrollTop = goBottomDiv.scrollHeight;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.myService {
  // width:100%;
  height: 100%;
  background-color: #f8f8f8;
  .header {
    img {
      width: rem(40px);
      height: rem(40px);
    }
  }

  .imgWrap {
    img {
      background-size: 100%;
    }
  }
  .list {
    width: 100%;
    background-color: #f8f8f8;
    padding-bottom: rem(100px);
    .dialog {
      max-width: rem(480px);
      display: inline-block;
      border-radius: 3px;
      font-size: rem(28px);
      padding: rem(20px) rem(20px);
      word-wrap: break-word;
    }
    .service {
      margin-left: rem(30px);
      overflow: hidden;
      .faceImg {
        //s1
        margin-right: rem(34px);
        // height: rem(136px);
        display: inline-block;
        vertical-align: top;
        img {
          width: rem(92px);
          height: rem(92px);
          //   margin-top: rem(22px);
        }
      }
      .dialog {
        background-color: #fff;
      }
    }
    .users {
      margin: rem(20px) 0 rem(20px) rem(30px);
      overflow: hidden;
      .dialog {
        position: relative;
        background-image: linear-gradient(-180deg, #599ffe 0%, #3158e0 100%);
        color: #fff;
        margin-left: rem(30px);
        float: right;
        // overflow: hidden;
        &:after {
          content: "";
          position: absolute;
          top: rem(30px);
          right: -4px;
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-left: 4px solid #3158e0;
          border-bottom: 4px solid transparent;
          display: inline-block;
        }
      }
      .faceImg {
        //s4
        float: right;
        margin-left: rem(30px);
        margin-right: rem(30px);
        // margin-top: rem(13px);
        display: inline-block;
        vertical-align: top;
        img {
          width: rem(92px);
          //   height: rem(92px);
          //   margin-top: rem(22px);
        }
      }
    }
  }

  .footer {
    width: 100%;
    background-color: #f8f8f8;
    position: fixed;
    bottom: rem(20px);
    height: rem(100px);
    li:nth-child(1) {
      float: left;
      margin-left: rem(30px);
      //   margin-top: rem(20px);
    }
    li:last-child {
      float: right;
    }
    .img1 {
      width: 13%;
      height: rem(98px);
      position: relative;
      img {
        height: rem(41px);
        width: rem(41px);
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: rem(-20px);
        margin-top: rem(-20px);
      }
    }
    .in1 {
      width: 67%;
      height: rem(70px);
      margin-top: rem(14px);
      textarea {
        // width: rem(450px);
        width: 100%;
        // height: rem(70px);
        // border: 0;
        background-color: #fff;
        border-radius: 5px;
        font-size: rem(30px);
        line-height: rem(24px);
        padding: rem(15px);
      }
    }
    .btn {
      width: 21%;
      height: rem(68px);
      margin-top: rem(16px);

      //  margin-right: rem(30px);
      input {
        width: rem(120px);
        height: rem(68px);
        background-color: #53a6ff;
        border: 0;
        border-radius: 5px;
        color: #fff;
        font-size: rem(30px);
      }
    }
  }
  .btn1 {
    width: 40%;
  }
  .open {
    position: fixed;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    z-index: 100;
    left: 0; /**定位时需注意  不然ios找不到显示地方**/
    top: 0; /**定位时需注意  不然ios找不到显示地方**/
    color: #fff;
    text-align: center;
    .openBox {
      background: #fff;
      border-radius: 3px;
      width: 80%;
      color: #fff;
      margin-left: 10%;
      margin-top: 30%;
      border-radius: 5px;
      .imgWrap {
        overflow: hidden;
        height: rem(268px);
        img {
          width: 100%;
          height: rem(266px);
        }
      }
      .wrap {
        background-color: #fff;
        height: rem(290px);
        // width: 80%;
        h3 {
          width: 100%;
          line-height: rem(100px);
          height: rem(100px);
          color: #000;
          font-size: rem(30px);
          text-align: center;
        }
        .p1 {
          color: #979797;
          font-size: rem(28px);
          height: rem(50px);
          line-height: rem(50px);
        }
      }
      .foot {
        width: 100%;
        height: rem(100px);
        background-color: #fff;
        border-top: 1px solid #cdcdcd;
        li {
          width: 50%;
          line-height: rem(100px);
          text-align: center;
          float: left;
        }
        li:nth-child(1) {
          color: #000;
          span {
            font-size: rem(30px);
          }
        }
        li:nth-child(2) {
          a {
            color: #f00;
            font-size: rem(30px);
          }
        }
      }
    }
  }
  .el-button {
    background-color: #409eff;
    color: #fff;
  }
}
</style>


