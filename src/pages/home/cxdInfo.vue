<template>
	<div class="carInfo">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">申请资料</p>
			<span slot="right">保存</span>
		</v-header>
		<div v-for="(items,index) in data" :key="index">
			<split></split>
			<ul>
				<li class="wrap flex item" v-for="(item,i) in items" :key="i">
					<label class="left">{{item.label}}</label>
					<div class="rest">
						<input type="text" :placeholder="item.placeholder">
					</div>

					<i class="el-icon-arrow-right" :class="[{'el-icon-arrow-right':item.isIcon},'right']" v-if="item.isIcon"></i>
				</li>
			</ul>
		</div>
		<div class="footer" @click="submit">
			<span>提交</span>
		</div>
	</div>
</template>
<script>
export default{
	data () {
		return {
			data:[
				[
				 {label:'申请金额',placeholder:'请输入申请金额(元)',isIcon:false},
				 {label:'申请期限',placeholder:'请选择申请期限',isIcon:true}
				],
				[
					{label:'姓名',placeholder:'请填入申请人姓名',isIcon:false},
					{label:'性别',placeholder:'请选择性别',isIcon:true},
					{label:'受教育程度',placeholder:'请选择受教育程度',isIcon:true},
					{label:'身份证号',placeholder:'请填入申请人姓名',isIcon:false},
					{label:'社保电脑号',placeholder:'请填入社保电脑号',isIcon:false},
					{label:'生日',placeholder:'请选择生日',isIcon:true},
					{label:'手机号码',placeholder:'请填入申请人姓名',isIcon:false}
					
				]
			]
		}
	},
	methods:{
		submit () {
			var self =this
			 this.$message({
			 	message:'申请已提交',
			 	onClose:function(){self.$router.push({path:'/'})}
			 });
		}
	}
}
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.carInfo{
	padding-bottom: rem(91px);
	min-height: 100%;
	background-color: $bgcolor;
	.item{
		height: rem(98px);
		color:#636363;
		font-size: rem(30px);
		border-bottom: 1px solid $bdcolor;
		background-color: #fff;
		input{
			border:none;
		}
		.left{
			width: rem(190px);
		}
		.right{
			width: rem(25px);
			color:#c8c8c8;
		}
	}
	.footer{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: rem(91px);
		line-height: rem(91px);
		text-align: center;
		font-size: rem(32px);
		color:#fff;
		background-color: $blue;
	}
}
</style>