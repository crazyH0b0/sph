<template>
  <div class="lineCharts" ref="charts" style="width:300px;height:100px" ></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
name:"BarCharts",
mounted() {
 
  var myChart = echarts.init(this.$refs.charts);

myChart.setOption({

  xAxis: {show:false,type:"category"},
  yAxis: {show:false},
  series: [
    {
      type: 'bar',
      data: [10,7,33,12,88,9,99,20,84,70,100],
      color:"cyan"
 
    
      

    }
  ],
  grid:{
      left:0,
      top:0,
      right:0,
      botton:0
  }
});
},
}
</script>

<style>
.lineCharts{
    width: 500px;
    width: 500px;
}
</style>