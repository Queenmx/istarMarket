<template>
	<div class="clientDetail">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">客户信息</p>
		</v-header>
		<div class="header">
			<p class="name">王昭君</p>
			<p class="phone">13875201314</p>
			<div class="detail">
				<div class="inblock">
					<p>100万</p>
					<p class="mes">申请金额</p>
				</div>
				<div class="inblock">
					<p>3年</p>
					<p class="mes">贷款期限</p>
				</div>
				<div class="inblock">
					<p>1500元</p>
					<p class="mes">月收入</p>
				</div>
			</div>
		</div>
		<div v-for="(items,index) in list" :key="index">
			<split></split>
			<div class="wrap item">
				<p class="title">{{items.title}}</p>
				<ul>
					<li v-for="(item,i) in items.list" :key="i">
						<span>{{item.text}}</span>
						<span v-if="item.value">{{item.value}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer-btn" @click="bookOrder">
			<p>拨打电话</p>
		</div>
	</div>
</template>
<script>
	export default{
		data () {
			return {
				list:[{title:'基本信息',
					list:[{text:'有房',value:''},{text:'有车',value:''},
					{text:'未婚',value:''},{text:'有公积金',value:''},{text:'26岁',value:''},{text:'企业主',value:''},{text:'无微粒贷',value:''}]},{title:'资产信息',list:[{text:'征信情况',value:'好'},{text:'负债情况',value:'多'}]},{title:'描述',list:[{text:'企业家族',value:''}]}
				]
			}
		},
		methods:{
			bookOrder () {
				 this.$message('抢单成功');
			}
		}
	}
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.clientDetail{
	padding-bottom: rem(120px);
	min-height: 100%;
	box-sizing:border-box;
	.header{
		position: relative;
		padding: rem(56px)  0 0;
		height: rem(300px);
		text-align: center;
		color:#fff;
		box-sizing: border-box;
		background-image: url("../../assets/images/bg-client.png");
		background-size: 100% 100%;
		.name{
			font-size: rem(48px);
		}
		.detail{
			position: absolute;
			left: 0;
			right:0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			padding: rem(24px) rem(85px);
			font-size:rem(34px);
			background:#ffffff4a;
		}
		.mes{
			font-size: rem(24px);
		}
		.phone{
			line-height: rem(38px);
			font-size: rem(30px);
		}
	}
	.item{
		padding-top:rem(39px);
		padding-bottom: rem(26px);
		color:#636363;
		.title{
			margin-bottom: rem(28px);
			font-size:rem(30px);
		}
		li{
			margin-bottom: rem(20px);
			font-size: rem(28px);
			&:before{
				content: "";
				display: inline-block;
				margin-right: 5px;
				width: rem(12px);
				height: rem(12px);
				vertical-align: middle;
				background: #f3693b;
			}
		}
	}
	.footer-btn{
		display: flex;
		flex-direction:column;
		justify-content:center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: rem(120px);
		color:#fff;
		text-align: center;
		box-sizing:border-box;
		background: $blue;
		.main{
			line-height: rem(40px);
			font-size: rem(32px);
		}
		.sub{
			font-size: rem(20px);
		}
	}
}
</style>