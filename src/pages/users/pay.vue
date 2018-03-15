<template>
<div class="pay">
   <v-header class="header">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">充值</p>
		</v-header>
    <split></split>
    <ul>
      <li><span>支付</span><el-input v-model="num"  placeholder="充值金额" @change="check" type='number' ></el-input><span>元</span><span>1星币=1元</span></li>
      <li>请选择支付方式</li>
      <!-- <li><el-radio v-model="radio" label="1"><img src="../../assets/images/zhifubao.png" alt=""><span>支付宝支付</span></el-radio></li>
      <li><el-radio v-model="radio" label="2"><img src="../../assets/images/weixin.png" alt=""><span>微信支付</span></el-radio></li> -->
      <div class="radios">
        <el-radio-group v-model="radioType" @change="changeHandler">
            <el-radio class="radio flex item wrap" label="zfb"><img src="../../assets/images/zhifubao.png" alt=""><span>支付宝支付</span></el-radio>
            <el-radio class="radio flex item  wrap" label="wx" ><img src="../../assets/images/weixin.png" alt=""><span>微信支付</span></el-radio> 
        </el-radio-group>
      </div>
    </ul>
    <div>
      <!-- <input type="button" value="确认" @click="confirmPay"> -->
      <button class="btn" @click="confirmaliPay">确认</button>
    </div>
</div>
</template>
<script>
import { getItem } from "@/util/util.js";
export default {
  data() {
    return {
      radioType: "",
      num: "",
      userId: JSON.parse(getItem("userInfo")).userId
    };
  },
  methods: {
    check(){
        if(this.num!=''){
          let reg = /^[1-9]\d*$/;
          if(reg.test(this.num) == false){
           this.$message('请输入整数')
           this.num='';
        } 
      }
    },
    changeHandler: function(value) {
      //  console.log(this)
      //  this.confirmPay(value)
    },
    confirmaliPay(str) {
      if (this.radioType == "zfb") {
        // console.log(value)
        // this.$router.push("/users/confirmPay");
        var native = function(data) {
          console.log(data);
        };
        var obj = {
          userId: this.userId,
          xb: this.num,
          type: "0"
        };
        console.log(obj);
        return this.nativeInteractive(native, obj);
      } else {
        this.$message("请选择充值方式");
      }
    },
    setupWebViewJavascriptBridge: function(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      
      var WVJBIframe = document.createElement("iframe");
      WVJBIframe.style.display = "none";
      WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    },
    nativeInteractive: function(fn, obj) {
      // console.log(123);
      var self = this;
      self.setupWebViewJavascriptBridge(function(bridge) {
        if (obj) {
          bridge.callHandler("webview_call_native", obj, function(response) {});
        }
        bridge.registerHandler("native_call_webview", function(data, response) {
          fn(data);
        });
      });
      if (window.xingrongjinfu && obj) {
        var str = JSON.stringify(obj);
        window.xingrongjinfu.webview_call_native(str);
      }

      window.native_call_webview = function(data) {
        var obj = eval("(" + data + ")");
        fn(obj);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.pay {
  background-color: #f8f8f8;
  height: 100%;
  ul {
    li {
      height: rem(96px);
      line-height: rem(96px);
      background-color: #fff;
      padding-left: rem(30px);
      border-bottom: 1px solid #eeeeee;
    }
    li:nth-child(1) {
      span {
        font-size: rem(28px);
      }
      span:nth-child(2) {
        width: rem(250px);
        color: #f00;
        display: inline-block;
        text-align: center;
      }
      span:nth-child(3) {
        color: #000;
      }
      span:nth-child(4) {
        color: #c8c8c8;
        margin-left: rem(40px);
        display: inline-block;
      }
    }
    li:nth-child(2) {
      background-color: #f8f8f8;
      color: #a8a8a8;
      font-size: rem(30px);
    }
    .radios {
      width: 100%;
      background-color: #fff;

      .item {
        // width: 100%;
        height: rem(96px);
        line-height: rem(96px);
        // border-bottom: 1px solid #eeeeee;
        position: relative;
        img {
          width: rem(36px);
          height: rem(36px);
          vertical-align: middle;
          margin-right: rem(10px);
          margin-left: rem(20px);
        }
        span {
          font-size: rem(30px);
          position: absolute;
        }
      }
    }
  }

  .btn {
    width: 80%;
    margin-left: 10%;
    margin-top: rem(80px);
    height: rem(80px);
    background-color: $blue;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-size: rem(26px);
  }
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.radios {
  .el-radio {
    margin-left: 0;
  }
}
.pay {
  .el-input {
    margin-left: rem(20px);
    margin-right: rem(20px);
    width: rem(240px);
    text-align: center;
  }
}
</style>
