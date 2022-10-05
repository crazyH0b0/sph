<template>
  <div>
    <div class="header"><span>搜索用户数<i class="el-icon-info"></i></span></div>
    <div class="mian">
      <span>123</span>
      <span>17.1 <i class="el-icon-sort-up"></i></span>
    </div>
    <div class="footer">
      <div class="charts" ref="charts" style="width:100%;height:50px"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts"
export default {
name:"LineCharts",
   mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    //配置数据
    lineCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        //隐藏y轴
        show: false,
      },
      //系列
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 48, 9,29,10,44],
          //拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          //线条的样式
          lineStyle: {
            color: "blue",
          },
          //填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
}
</script>

<style scoped>
.header{
  display: flex;
  align-items: center;

}
.mian{
  margin-top: 20px;
}
</style>