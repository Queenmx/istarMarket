<template>
  <div class="starMoney">
    <v-header title="星币"></v-header>
    <div class="details">
        <div class="balance">
          <span>{{money}}</span>
          <p>总星币数</p>
        </div>
        <!-- 充值功能先注释掉 -->
        <div class="btn">
         <input type="button" value="充值" @click="goPay">
        </div>
    </div>
   <div class="select flex">
        <dropdown :dataArr="dataArr" col="24" :title="dataArr[0].text" @selectedEvent="changeType" iconImg="icon-all" iconClass="icon-arrow-white"></dropdown>
        <dropdown :dataArr="textArr" col="24" :title="textArr[0].text" @selectedEvent="changeType" iconImg="icon-chosetime" iconClass="icon-arrow-white"></dropdown>
   </div>
    <div class="list">
      <!-- <split></split> -->
      <ul v-for="(item,i) in listDate" :key="i">
        <span class="wrap data-range">{{i.replace("-",'年')}}月</span>
        <li class=" wrap liwrap" v-for="(item,index) in listDate[i].xbConsumeList" :key="index">
            <div class="fr">
                <span >{{item.consume_type}}</span>
                <p>{{item.consume_userName}}</p>
            </div>
            <div class="sr">
                <span>{{item.consume_time}}</span>
                <p>{{item.consume_xb}}星币</p>
            </div>
        </li>
      </ul>
    </div>
    <v-footer :activeIndex="3"></v-footer>
  </div>
</template>
<script>
import { getMoney, queryMoney } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    var date = new Date();
    return {
      dataArr: [
        { id: "", text: "全部" },
        {
          id: date.getFullYear() + "-" + date.getMonth(),
          text: "可能其他分类"
        }
      ],
      textArr: [
        {
          id: "",
          text: "选择"
        },
        {
          text: date.getFullYear() + "-" + (date.getMonth() + 1)
        },
        {
          text: date.getFullYear() + "-" + date.getMonth()
        },
        {
          text: date.getFullYear() + "-" + (date.getMonth() - 1)
        }
      ],
      // list: [{ des: "全部" }, { des: "18年1月" }],\
      dataRange: "",
      listDate: "",
      items: "",
      money: "",
      userInfo: getItem("userInfo")
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      await this.bill();
      await this.queryMoney();
    },
    async bill() {
      var data = {
        userId: this.userInfo.userId,
        time: this.dataRange,
        pageNum: 1,
        pageSize: 100
      };
      console.log(data);
      let res = await getMoney(data);
      console.log(res);
      if (res.code === "0000") {
        // console.log(res.data.xbConsumeList)
        // this.data.desc=res.data.xbConsumeList[0].consume_type
        this.listDate = res.data;
        this.items = res.data.xbConsumeList;
        console.log(this.listDate);
      }
    },
    async queryMoney() {
      var data = {
        userId: this.userInfo.userId
      };
      let res = await queryMoney(data);
      if (res.code === "0000") {
        this.money = res.data.xb;
      } else {
        // this.$message(res.msg);
      }
    },
    goPay: function() {
      this.$router.push("/users/pay");
    },
    changeType(val) {
      this.dataRange = val;
      this.bill();
    },
    disable() {
      //   console.log("aaa");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.starMoney {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .header {
    border-bottom: 0;
    color: #2b2b2b;
    // background-color: #53a6ff;
    .arrow_left {
      background-image: url("../../assets/images/return.png");
      background-size: contain;
      width: rem(40px);
      height: rem(40px);
      display: inline-block;
      text-align: center;
    }
  }
  .details {
    width: 100%;
    height: rem(250px);
    padding-top: rem(150px);
    background-color: #53a6ff;
    text-align: center;
    span {
      font-size: rem(72px);
      color: #fff;
    }
    p {
      font-size: rem(30px);
      color: #fff;
    }
    .btn {
      margin-top: rem(20px);
      input {
        width: rem(160px);
        height: rem(60px);
        background-color: #75b8ff;
        color: #fff;
        font-size: rem(30px);
        border: 0;
        border-radius: 6px;
      }
    }
  }

  .select {
    width: 100%;
    line-height: rem(98px);
    color: #fff;
    font-size: rem(32px);
    background: #53a6ff;
  }
  .list {
    background-color: #f8f8f8;
    padding-bottom: rem(100px);
    ul {
      .data-range {
        line-height: rem(80px);
        font-size: rem(26px);
        color: #999;
      }
      .liwrap {
        border-bottom: 1px solid #eee;
        background-color: #fff;
        height: rem(150px);

        .fr {
          margin-top: rem(30px);
          //  margin-bottom: rem(30px);
          float: left;
          span {
            //  margin-top: rem(30px);
            font-size: rem(30px);
          }
          p {
            color: #969696;
            font-size: rem(30px);
            margin-top: rem(20px);
          }
        }
        .sr {
          float: right;
          margin-top: rem(30px);
          span {
            font-size: rem(30px);
            color: #646464;
          }
          p {
            color: #f00;
            font-size: rem(30px);
            text-align: right;
            margin-top: rem(20px);
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.select {
  width: 100%;
  .el-input__inner {
    height: rem(98px);
    width: rem(375px);
    font-size: rem(30px);
    text-align: center;
    border: 0;
    background-color: #53a6ff;
    color: #fff;
  }
}
.el-select-dropdown {
  width: 100%;
  left: 0;
  .el-select-dropdown__item {
    font-size: rem(24px);
    height: rem(50px);
    line-height: rem(50px);
    text-align: center;
  }
}
</style>

