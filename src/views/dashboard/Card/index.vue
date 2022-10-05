<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-card>
                    <Deatil title="总销售额" count="￥ 154824">
                        <template slot="charts">
                            <span>
                                周同比&nbsp;&nbsp;56.7%
                                <i class="el-icon-sort-up"></i>
                            </span>
                            <span>
                                日同比&nbsp;&nbsp;47.7%
                                <i class="el-icon-sort-down"></i>
                            </span>
                        </template>

                        <template slot="footer">
                            <span>日销售额￥ 12433</span>
                        </template>
                    </Deatil>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card>
                    <Deatil title="访问量" count="￥ 88460">
                        <template slot="charts"><LineChart/></template>

                        <template slot="footer">
                            <span>日访问量 1234</span>
                        </template>
                    </Deatil>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card>
                    <Deatil title="支付笔数" count="￥ 6324">
                        <template slot="charts">
                            <BarCharts />
                        </template>
                        <template slot="footer">
                            <span>转化率 65%</span>
                        </template>
                    </Deatil>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card>
                    <Deatil title="运营活动效果" count="78%">
                        <template slot="charts">
                            <ProgressCharts/>
                        </template>
                        <template slot="footer">
                            <span>
                                周同比&nbsp;&nbsp;56.7%
                                <i class="el-icon-sort-up"></i>
                            </span>
                            <span>
                                日同比&nbsp;&nbsp;47.7%
                                <i class="el-icon-sort-down"></i>
                            </span>
                        </template>
                    </Deatil>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Deatil from "./Detail"
import LineChart from "./lineChart"
import BarCharts from "./barChars"
import ProgressCharts from "./progressCharts"
export default {
    name: "Card",
    components: { Deatil,LineChart,BarCharts,ProgressCharts }
}
</script>

<style>
.el-col {
    padding-top: 10px;
    padding-right: 5px;
}
</style>