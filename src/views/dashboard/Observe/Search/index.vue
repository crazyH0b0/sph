<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div class="header">
                <span>线上热门搜索</span>
               
                <el-dropdown>
                    <span class="el-dropdown-link">
                       
                       <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item >双皮奶</el-dropdown-item>
                        <el-dropdown-item >蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div>
            <el-row>
                <el-col :span="12">
                    <LineCharts></LineCharts>
                </el-col>

                <el-col :span="12">
                    <LineCharts></LineCharts>
                </el-col>
            </el-row>

              <el-table
    :data="tableData"
    style="width: 100%;margin-top:20px"
   border
    >
    <el-table-column
      prop="date"
      label="排名"
      sortable
      type="index"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="搜索关键字"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="用户数"
       sortable
     >
    </el-table-column>
       <el-table-column
      prop="address"
      label="周涨幅"
       sortable
     >
    </el-table-column>
  </el-table>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
      style="float:right">
    </el-pagination>
        </div>
    </el-card>
</template>

<script>
import LineCharts from "./lineCharts"
export default {
    name: "Search",
    components: { LineCharts },
    data() {
        return {
            tableData:[{}]
        }
    },
}
</script>

<style>
.header {
    display: flex;
    justify-content: space-between;
}
.clearfix {
    border-bottom: 1px solid #eee;
    padding: 5px 0;
}
</style>