<template>
  <div class="lineCharts" ref="charts" style="width:300px;height:100px" ></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
name:"LineChart",
mounted() {
 
  var myChart = echarts.init(this.$refs.charts);

myChart.setOption({

  xAxis: {show:false,type:"category"},
  yAxis: {show:false},
  series: [
    {
      type: 'line',
      data: [10,7,33,12,88,9],
      itemStyle:{
          opacity:0
      },
      lineStyle:{
          color:"purple"
      },
      areaStyle:{
          color:{
              type:"linear",
              x:0,
              y:0,
              x2:0,
              y2:1,
              colorStops:[
                  {  offset:0,
                  color:"purple"},
                  {  offset:1,
                  color:"#fff"}
              ],
              global:false
          }
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