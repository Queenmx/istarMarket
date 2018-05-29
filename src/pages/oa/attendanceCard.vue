<template>
    <div class="rooterEle attendanceCard">
        <v-header title="打卡">
        </v-header>
        <div class="wrap container">
             <div>
                <attendance-card-list @getData="getData" :groupName="groupName"></attendance-card-list>
            </div>
            <div class="main">
                <div class="address-group">
                    <i class="icon-map-wait"></i>
                    <div>
                        <p class="strong">紧急00</p>
                        <p>深圳市深圳</p>
                    </div>
                </div>
                <div class="circle-wrap">
                    <div class="circle">
                        <div class="content">
                            <strong class="strong">20:12</strong>
                            <p>上班打卡</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.attendanceCard {
  padding: rem(40px) rem(24px);
  padding-top: rem(124px);
  .main {
    padding-top: rem(112px);
    text-align: center;
    font-size: rem(28px);
    color: #4d7bff;
  }
  .strong {
    font-size: rem(32px);
  }
  .icon-map-wait {
    @include icon(rem(40px), rem(52px));
  }
  .container {
    height: 100%;
    background: #fff;
    // margin-top: rem(40px);
  }
  .address-group {
    margin-bottom: rem(196px);
  }
  .circle-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: rem(142px) auto rem(226px) auto;
    width: rem(304px);
    height: rem(304px);
    color: #333333;
    border-radius: 50%;
    background-image: linear-gradient(-180deg, #f6ba59 0%, #f8913e 100%);
    .circle {
      position: relative;
      width: rem(252px);
      height: rem(252px);
      border-radius: 50%;
      background: #fff;
    }
    .strong {
      font-size: rem(72px);
      color: #020202;
      letter-spacing: rem(0.86px);
    }
    .content {
      position: absolute;
      margin-top: rem(-56px);
      top: 50%;
      width: 100%;
    }
  }
}
</style>
