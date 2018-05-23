<template>
	<div class="attendanceStatistics">
		<v-header>
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">考勤统计</p>
		</v-header>
	    <el-tabs ref="tabs" id="tabs" v-model="activeName" @tab-click="handleClick">
	  		<el-tab-pane label="日统计" name="first" class="wrap">
	  			<p class="link"><span>2018.01.11</span><i class="el-icon-arrow-down"></i></p>
	  			<div class="chart-wrap">
		            <div id="canvas" class="chart" @click="goClock"></div>
		        </div>
		        <el-row>
				  <el-col :span="8" v-for="(item, index) in arr" :key="index">
				  	<div class="grid-content bg-purple">
				  		<p>{{item.value}}</p>
		        		<p>{{item.text}}</p>
				  	</div>
				  </el-col>
				</el-row>
		        <div class="tag-wrap">
		        	<el-tag type="info">休息(3)</el-tag>
		        </div>
	  		</el-tab-pane>
	    	<el-tab-pane label="月统计" name="second">
				<div class="title wrap">
					<p class="rest"><i class="el-icon-arrow-left"></i><span class="date">2018.01</span><i class="el-icon-arrow-right"></i></p>
					<p>考勤人数6人</p>
				</div>
				<ul>
					<li class="list-item wrap" v-for="(items, index) in monthData" :key="index" @click="goDetail(index)">
						<p class="rest">{{items.text}}</p>
						<p>
							<span>{{items.value}}人</span>
							<i class="el-icon-arrow-right"></i>
						</p>
					</li>
				</ul>
	    	</el-tab-pane>
	    	<el-tab-pane label="我的" name="third">
	    		<div class="wrap flex user-group">
	    			<div class="rest">
		    			<div class="avatar-wrap">
		    				<img class="avatar" src="../assets/images/avatar.jpg" >
		    			</div>
		    			<div class="inblock">
		    				<p>舜</p>
		    				<p>考勤组：考勤</p>
		    			</div>
	    			</div>
	    			<div>
	    				<span>2018年01月</span>
	    				<i class="el-icon-arrow-down"></i>
	    			</div>
	    		</div>
	    		<div class="wrap my-title">考勤月度汇总</div>
	    		<ul>
	    			<li class="wrap list-item" v-for="(items,index) in myData" :key="index" @click="goAttendance(index)">
	    				<p class="rest">{{items.text}}</p>
	    				<p><span>{{items.value}}{{items.unit}}</span><i class="el-icon-arrow-down"></i></p>
	    			</li>
	    		</ul>
	    	</el-tab-pane>
	    </el-tabs>
	</div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legendScroll');
  export default {
    data() {
      return {
        activeName: 'first',
        arr:[{text:'未打卡',value:3},{text:'迟到',value:0}, {text:'外勤',value:0}],
        monthData:[{text:'迟到',value:0},{text:'早退',value:0}, {text:'缺卡',value:3},{text:'旷工',value:4},{text:'外勤',value:0},{text:'加班',value:0}],
        myData:[{text:'出勤天数',value:'2',unit:'天'},{text:'出勤班次',value:'0',unit:'次'},{text:'休息天数',value:'2',unit:'天'},{text:'迟到',value:'0',unit:'次'},{text:'早退',value:'0',unit:'次'},{text:'缺卡',value:'2',unit:'次'},{text:'旷工',value:'2',unit:'天'},{text:'外勤',value:'2',unit:'次'},{text:'加班',value:'2',unit:'小时'}]
      };
    },
    mounted () {
      this.drawChart()
      document.getElementsByClassName("el-tabs__nav")[0].style.transform = "translateX(50%)"
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
	  drawChart () {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('canvas'));
			// 绘制图表
			myChart.setOption({
				title:{
			          text:'1/4',
			          subtext:'打卡明细',
			          textAlign:'center',
			          x: '48%',
			          y: '30%',
			          textStyle: {
			            fontWeight: 'normal',
			            fontSize: 14
			          }
			        },
			        color:['#53a6ff', '#e4e4e4'],
					series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            silent:true,
				            radius: ['80%', '100%'],
				            center:['50%','50%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '30',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:1},
				                {value:3}
				            ]
				        }
				    ]
			})
		},
	  goClock () {
	  	this.$router.push({path:'/oasystem/clockDetail'})
	  },
	  goDetail (index) {
	  	var LATE = 0,
	  		EARLY = 1,
	  		LACK = 2,
	  		ABSENT = 3,
	  		OUT = 4,
	  		OVERTIME = 5
	  	switch (index) {
	  		case LATE:
	  			this.$router.push({path:'/oasystem/lateRecord'})
	  			break;
	  		case EARLY:
	  			this.$router.push({path:'/oasystem/earlyRecord'})
	  			break;
	  		case LACK:
	  			this.$router.push({path:'/oasystem/lackRecord'})
	  			break;
	  		case ABSENT:
	  			this.$router.push({path:'/oasystem/absentRecord'})
	  			break;
	  		case OUT:
	  			this.$router.push({path:'/oasystem/outRecord'})
	  			break;
	  		case OVERTIME:
	  			this.$router.push({path:'/oasystem/overtimeRecord'})
	  			break;
	  	}
	  },
	  goAttendance(index){
	  	if(index == 0){
	  		this.$router.push({path:'/oasystem/attendanceDetail'})
	  	}else{
	  		return
	  	}
	  }

    }
  };
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
	.attendanceStatistics{
		.chart{
			height: rem(300px);
		}
		.grid-content{
			text-align: center;
			font-size: rem(32px);
		}
		.chart-wrap{
			margin:rem(30px) 0;
		}
		.tag-wrap{
			margin-top:rem(30px);
		}
		.title{
			display: flex;
			align-items:center;
			// margin-top:-15px;
			height: rem(80px);
			border-bottom:2px solid $bdcolor;
			background: $bdcolor;
			.rest{
				flex:1;
			}
			.date{
				margin:0 rem(20px);
			}
		}
		.list-item{
			display: flex;
			align-items:center;
			height: rem(80px);
			border-bottom:1px solid $bdcolor;
			.rest {
				flex:1;
			}
		}
		.user-group {
			height: rem(80px);
		}
		.inblock {
			vertical-align: middle;
		}
		.my-title {
			height: rem(80px);
			line-height: rem(80px);
			background: $bgcolor;
		}
	}
</style>