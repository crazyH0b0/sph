<template>
  <div>
    <el-form ref="form" :model="skuInfo" label-width="80px">
      <el-form-item label="SPU名称"> {{spu.spuName}} </el-form-item>

      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" placeholder="价格(元)" type="number"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" rows="4"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form ref="form"  label-width="80px" :inline="true">
          <el-form-item :label="attr.attrName"  v-for="(attr, index) in attrInfoList" :key="attr.id" >
            <el-select  placeholder="请选择"  v-model="attr.attrIdAndValueId">
              <el-option  :label="item.valueName"  :value="`${attr.id}:${item.id}`" v-for="(item, index) in attr.attrValueList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form ref="form"  label-width="80px">
          <el-form-item :label="saleAttr.name" v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select v-model="saleAttr.saleAttrIdAndValueId" placeholder="请选择">
              <el-option :label="attrValue.saleAttrValueName" :value="`${saleAttr.id}:${attrValue.id}`" v-for="(attrValue, index) in saleAttr.spuSaleAttrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table :data="spuImageList" style="width: 100%" border    @selection-change="handleSelectionChange">
          <el-table-column
            prop="prop"
            label="label"
            type="selection"
            width="80"
          >
          </el-table-column>

          <el-table-column prop="prop" label="图片" width="width">
            
           <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" alt=""  style="width:100px;height: 100px;">
           </template>
          </el-table-column>

          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
           <el-button type="primary"  @click="changeDefault(row)" v-if="row.isDefault==0">设置默认</el-button>
           <el-button  v-else >默认</el-button>
           
           
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      imgList:[],
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        category3Id: 0,
        price: 0,
         spuId: 0,
        tmId: 0,
        skuAttrValueList: [
      
        ],
        skuDefaultImg: "",
        skuDesc: "",
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        skuName: "",
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
       
        weight: "",
      },
      spu:{}
    };
  },
  methods: {
    save(){
 const {attrInfoList,spuSaleAttrList,skuImageList}=this

 attrInfoList.forEach(item=>{
   if(item.attrIdAndValueId){
  const [    attrId, valueId]=item.attrIdAndValueId.split(":")

  this.skuInfo.skuAttrValueList.push({attrId,valueId})
   }
 })
  this.skuInfo.skuSaleAttrValueList= spuSaleAttrList.reduce((pre,cur)=>{
 if(cur.saleAttrIdAndValueId){
  const  [saleAttrId,saleAttrValueId]=cur.saleAttrIdAndValueId.split(":")
   pre.push({saleAttrId,saleAttrValueId})
 }
 return pre;
},[])

this.skuInfo.skuImageList=this.imgList.map(item=>{
  return {
  imgName:item.imgName,
  imgUrl:item.imgUrl,
  isDefault:item.isDefault,
  spuImgId:item.id
  }
})
this.$api.spu.reqAddSku(this.skuInfo).then(res=>{
  if(res.code==200){
    this.$message({type:"success",message:"添加成功~~"})
    this.$emit("changeScenes",0)
  }else{
     this.$message({type:"error",message:"添加失败~~"})
    
  }
})
    },
    cancel(){
   this.$emit("changeScenes",0)
    Object.assign(this._data,this.$options.data())
    },
    changeDefault(row){
this.spuImageList.forEach(item=>{
  item.isDefault=0
})
 row.isDefault=1
 this.skuInfo.skuDefaultImg=row.imgUrl
    },
    handleSelectionChange(imgs){
this.imgList=imgs
    },
    getData(categoryId1, categoryId2, spu) {
        this.skuInfo.category3Id=spu.category3Id
          this.skuInfo.spuId=spu.id
            this.skuInfo.tmId=spu.tmId

            this.spu=spu
      this.$api.sku.reqSpuImageList(spu.id).then((res) => {
        if (res.code == 200) {
          let list= res.data;
       list.forEach(item=>{
            item.isDefault=0
          })
          this.spuImageList=list
        }
      });
      this.$api.sku.reqSpuSaleAttrList(spu.id).then((res) => {
        if (res.code = 200) {
          this.spuSaleAttrList = res.data;
        }
      });

      this.$api.sku
        .reqAttrInfoList(categoryId1, categoryId2, spu.category3Id)
        .then((res) => {
          if (res.code == 200) {
            this.attrInfoList = res.data;
          }
        });
    },
  },
};
</script>

<style>
</style>