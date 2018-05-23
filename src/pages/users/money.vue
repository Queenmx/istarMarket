<template>
  <div class="starMoney">
    <v-header class="header">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">星币</p>
		</v-header>
    <div class="details">
        <div class="balance">
          <span>{{money}}</span>
          <p>星币</p>
        </div>
        <!-- 充值功能先注释掉 -->
        <div class="btn">
         <input type="button" value="充值" @click="goPay">
        </div>
    </div>
   <div class="select flex">
      <!-- <ul>
      <li class="wrap flex item" v-for="(item,i) in list" :key="i">
        <div class="des">{{item.des}}</div>
        <i class="el-icon-caret-bottom"></i>
      </li>
    </ul> -->
    <el-select v-model="value1" placeholder="选择"  @change="changeType">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <!-- <div class="over">xx</div> -->
  <el-select v-model="value2" placeholder="选择" @change="changeType" @focus="disable()">
   
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   </div>
    <div class="list">
      <split></split>
      <ul>
        <li class="wrap" v-for="(item,i) in items" :key="i">
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
      options1: [{ value: "", label: "全部" }],
      options2: [
        {
          value: date.getFullYear() + "-" + (date.getMonth() + 1),
          label: date.getFullYear() + "-0" + (date.getMonth() + 1)
        },
        {
          value: date.getFullYear() + "-" + date.getMonth(),
          label: date.getFullYear() + "-0" + date.getMonth()
        },
        {
          value: date.getFullYear() + "-" + (date.getMonth() - 1),
          label: date.getFullYear() + "-0" + (date.getMonth() - 1)
        }
      ],
      value1: "",
      value2: "",
      // list: [{ des: "全部" }, { des: "18年1月" }],
      items: "",
      money: "",
      userInfo: JSON.parse(getItem("userInfo"))
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
      //   getItem("userinfo");
      //   let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        userId: this.userInfo.userId,
        time: this.value2,
        pageNum: 1,
        pageSize: 100
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      // console.log(this.value2);

      let res = await getMoney(enData);
      let deData1 = strDec(res.data, "ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (res.code === "0000") {
        // console.log(res.data.xbConsumeList)
        // this.data.desc=res.data.xbConsumeList[0].consume_type
        this.items = deData.xbConsumeList;
      }
    },
    async queryMoney() {
      //   getItem("userInfo");
      //   let userinfo = JSON.parse(localStorage.userInfo);
      var data = {
        userId: this.userInfo.userId
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res = await queryMoney(enData);
      let deData1 = strDec(res.data, "ZND20171030APIMM");
      let deData = JSON.parse(deData1);
      if (res.code === "0000") {
        this.money = deData.xb;
      } else {
        // this.$message(res.msg);
      }
    },
    goPay: function() {
      this.$router.push("/users/pay");
    },
    changeType() {
      this.bill();
    },
    disable() {
      // console.log("aaa");
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
    color: #fff;
    background-color: #53a6ff;
  }
  .details {
    width: 100%;
    height: rem(300px);
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
      margin-top: rem(50px);

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
    .el-select {
      width: 100%;
    }
    //   ul{display: flex;
    //   .item{
    //     flex:1;
    //     font-size: rem(32px);
    //     justify-content: center;
    //     height:rem(100px);
    //     color: #656565;
    //     background-color: #fff;
    //     i{
    //       margin-left: rem(20px);
    //     }
    // }

    // }
  }
  .list {
    background-color: #f8f8f8;
    ul {
      .wrap {
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
  .el-input {
    background-color: #fff;
  }
  .el-input__inner {
    height: rem(98px);
    width: rem(375px);
    font-size: rem(30px);
    text-align: center;
    border: 0;
  }
}
.el-select-dropdown {
  .el-select-dropdown__item {
    font-size: rem(24px);
    height: rem(50px);
    line-height: rem(50px);
    text-align: center;
  }
}
</style>

