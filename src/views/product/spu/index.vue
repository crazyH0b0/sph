<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="scene != 0" @getCategoryId="getCategoryId" />
    </el-card>

    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="default"
          :disabled="!categoryId3"
          @click="addSpu"
        >添加SPU</el-button>
        <el-table border stripe :data="records">
          <el-table-column label="序号" type="index" width="80" align="center" />

          <el-table-column prop="spuName" label="SPU名称" width="width" />

          <el-table-column prop="description" label="SPU描述" width="width" />

          <el-table-column prop="" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加sku"
                @click="addSku(row)"
              />

              <HintButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              />
              <HintButton
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              />

              <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(row)">
                <HintButton
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                />
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper ,->,sizes,total "
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getSpuList"
        />
      </div>

      <SkuForm v-show="scene == 2" ref="sku" @changeScenes="changeScenes" />
      <SpuForm v-show="scene == 1" ref="spu" @changeScene="changeScene" />

      <el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogFormVisible" :before-close="close">
        <el-table v-loading="loading" :data="skuList" border>
          <el-table-column prop="skuName" label="名称" width="" />
          <el-table-column prop="price" label="价格" width="" />
          <el-table-column prop="weight" label="重量" width="" />
          <el-table-column prop="skuDefaultImg" label="默认图片" width="">
            <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">

            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SkuForm from './skuForm'
import SpuForm from './spuForm'
export default {
  name: 'Spu',
  components: { SkuForm, SpuForm },
  data() {
    return {
      categoryId1: '',
      categoryId2: '',
      categoryId3: '',
      isShowTable: true,
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      scene: 0,
      dialogFormVisible: false,
      spu: {},
      skuList: [],
      loading: true
    }
  },
  methods: {
    close(done) {
      this.loading = true
      this.skuList = []
      done()
    },
    handler(row) {
      this.dialogFormVisible = true
      this.spu = row
      this.$api.spu.reqSkuList(row.id).then(res => {
        if (res.code === 200) {
          this.skuList = res.data
          this.loading = false
        }
      })
    },
    getSpuList(p = 1) {
      this.page = p
      const { page, limit, categoryId3 } = this
      this.$api.spu.reqSpuList(page, limit, categoryId3).then((res) => {
        if (res.code == 200) {
          this.total = res.data.total
          this.records = res.data.records
        }
      })
    },
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.categoryId1 = categoryId
        this.categoryId2 = ''
        this.categoryId3 = ''
      } else if (level == 2) {
        this.categoryId2 = categoryId

        this.categoryId3 = ''
      } else {
        this.categoryId3 = categoryId
        this.getSpuList()
      }
    },

    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    addSpu() {
      this.scene = 1
      this.$refs.spu.addSpuData(this.categoryId3)
    },
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    changeScene({ scene, flag }) {
      this.scene = scene
      if (flag == '修改') {
        this.getSpuList(this.page)
      } else {
        this.getSpuList()
      }
    },
    async deleteSpu(row) {
      const result = await this.$api.spu.reqDeleteSpu(row.id)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '删除成功' })
        // 代表SPU个数大于1删除的时候停留在当前页，如果SPU个数小于1 回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    addSku(row) {
      this.scene = 2
      this.$refs.sku.getData(this.categoryId1, this.categoryId2, row)
    },
    changeScenes(scene) {
      this.scene = scene
    }
  }
}
</script>

<style>
</style>
