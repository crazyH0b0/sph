<template>
  <div class="lineCharts" ref="charts" style="width:300px;height:100px" ></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
name:"ProgressCharts",
mounted() {
 
  var myChart = echarts.init(this.$refs.charts);

myChart.setOption({

  xAxis: {show:false,min:0,max:100},
  yAxis: {show:false,type:"category"},
  series: [
    {
      type: 'bar',
      data: [78],
      color:"yellowgreen",
      barWidth:10,
      showBackground:true,
      backgroundStyle:{
          color:"#eee"
      }
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