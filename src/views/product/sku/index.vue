<template>
  <div>
    <el-table border style="width:100%" :data="records">
      <el-table-column type="index" label="序号" align="center" prop="prop" width="80" />
      <el-table-column label="名称" prop="skuName" width="80"/>
      <el-table-column label="描述" prop="skuDesc" />
      <el-table-column label="默认图片" prop="skuDefaultImg" >
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;" alt="">
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight" width="80" />
      <el-table-column label="价格" prop="price" width="80"/>
      <el-table-column label="操作" prop="prop" width="width" >
        <template slot-scope="{row,$index}" >
          <el-button type="success" size="mini" icon="el-icon-sort-down" @click="sale(row)" v-if="row.isSale===0"></el-button>
            <el-button type="success" size="mini" icon="el-icon-sort-up" @click="cancel(row)" v-if="row.isSale===1"></el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(row)"></el-button>
                <el-button type="info" size="mini" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click=""></el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="getData" @size-change="sizeChange" style="text-align: center;" :total="total" :current-page="page" :page-sizes="[3,5,10]" :page-size="limit" layout="total,sizes, prev, pager, next,jumper" />
  
  <el-drawer :visible.sync="drawer" :show-close="true" size="50%" >
<el-row>
  <el-col :span="5">名称</el-col>
    <el-col :span="16">{{skuInfo.skuName}}</el-col>
 
</el-row>

<el-row>
  <el-col :span="5">描述</el-col>
    <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
 
</el-row>


<el-row>
  <el-col :span="5">价格</el-col>
    <el-col :span="16">{{skuInfo.price}}</el-col>
 
</el-row>


<el-row>
  <el-col :span="5">平台属性</el-col>
  <el-col :span="16">

    <el-tag type="success" v-for="(item, index) in skuInfo.skuAttrValueList" :key="item.id" style="margin-right: 10px;">{{item.attrId}}-{{item.valueId}}</el-tag>


   </el-col>
 
</el-row>


<el-row>
  <el-col :span="5">商品图片</el-col>
    <el-col :span="16">
     <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
        <!-- <h3 class="small">{{ item }}</h3> -->
        <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
      </el-carousel-item>
    </el-carousel>
    </el-col>
 
</el-row>
</el-drawer >
  </div>
</template>

<script>
export default {
  name: 'Sku',
    data() {
    return {
       page:1,
       limit:5,
       total:0,
       records:[],
       skuInfo:{},
       drawer:false
    }
  },
  mounted() {
    this.getData()
  },

  methods: {
    getData(pages=1){
      this.page=pages
      const {page,limit}=this
      this.$api.sku.reqSkuList(page,limit).then(res=>{
        if(res.code===200){
          this.total=res.data.total
this.records=res.data.records
        }
      })
    },
    sizeChange(size){
this.limit=size
this.getData()
    },
    sale(row){
this.$api.sku.reqSale(row.id).then(res=>{
   console.log(res);
   if(res.code===200){
     row.isSale=1
     this.$message({type:"success",message:"上架成功"})
   }
})
    },
    cancel(row){
this.$api.sku.reqCancelSale(row.id).then(res=>{
  if(res.code===200){
      row.isSale=0
     this.$message({type:"success",message:"下架成功"})
  }
})
    },
    edit(row){
this.$message({type:"default",message:"正在开发中"})
    },
    getSkuInfo(row){
      this.$api.sku.reqSkuById(row.id).then(res=>{
        if(res.code===200){
         this.skuInfo=res.data
         this.drawer=true 
        }
      })
    }
  },
}
</script>
<style>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
  }
</style>
<style  scoped>
.el-col .el-col-5{
font-size: 18px;
text-align: right;
}
.el-col{
  margin: 10px 10px;
}

</style>
