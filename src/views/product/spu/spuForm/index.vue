<template>
  <el-form ref="form" :model="spu" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
    </el-form-item>

    <el-form-item label="品牌">
      <el-select v-model="spu.tmId" placeholder="请选择品牌">
        <el-option
          :label="tm.tmName"
          :value="tm.id"
          v-for="(tm, index) in tradeMarkList"
          :key="tm.id"
          >{{ tm.tmName }}</el-option
        >
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述">
      <el-input
        v-model="spu.description"
        type="textarea"
        placeholder="SPU描述"
        rows="4"
      >
        {{ spu.description }}</el-input
      >
    </el-form-item>

    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-select
        v-model="attrIdAndAttrName"
        :placeholder="`还有${unSelectedAttr.length}个未选择`"
      >
        <el-option
          v-for="(item, index) in unSelectedAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-plus"
        :disabled="!attrIdAndAttrName"
        @click="addSaleAttr"
        >添加销售属性</el-button
      >
      <el-table :data="spu.spuSaleAttrList" style="width: 100%" border>
        <el-table-column
          prop="prop"
          label="序号"
          type="index"
          width="80"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="saleAttrName" label="属性名" width="width">
        </el-table-column>

        <el-table-column prop="prop" label="属性值名称列表" width="width">
          <template slot-scope="{ row, $index }">
            <el-tag
              :key="tag.id"
              v-for="(tag, index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="addSaleAttrValue(row)"
              >添加</el-button
            >
          </template>
        </el-table-column>

        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="spu.spuSaleAttrList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="addOrUpdateSpu"
        >保存</el-button
      >
      <el-button type="primary" size="default" @click="cancel"
        >取消</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [
          //   {
          //     id: 0,
          //     imgName: "string",
          //     imgUrl: "string",
          //     spuId: 0,
          //   },
        ],

        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "string",
          //         saleAttrName: "string",
          //         saleAttrValueName: "string",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
      },
      tradeMarkList: [],
      skuImageList: [],
       spuImageList:[],
      saleAttrList: [],
      attrIdAndAttrName: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    initSpuData(spu) {
      this.$api.spu.reqSpu(spu.id).then((res) => {
        if (res.code == 200) {
          this.spu = res.data;
        }
      });

      this.$api.spu.reqTradeMarkList(spu.id).then((res) => {
        if (res.code == 200) {
          this.tradeMarkList = res.data;
        }
      });
      this.$api.spu.reqSkuImage(spu.id).then((res) => {
        if (res.code == 200) {
          let imgList = res.data;
          imgList.forEach((element) => {
            element.name = element.imgName;
            element.url = element.imgUrl;
          });
          this.spuImageList = imgList;
        }
      });
      this.$api.spu.reqBaseSaleAttrList().then((res) => {
        if (res.code == 200) {
          this.saleAttrList = res.data;
        }
      });
    },
    handleSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    addSaleAttr() {
      let [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };

      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    addSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      row.inputVisible = false;
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      let res = row.spuSaleAttrValueList.every((item) => {
        return item.saleAttrValueName != inputValue;
      });
      if (res) {
        const newAttr = { baseSaleAttrId, saleAttrValueName: inputValue };
        row.spuSaleAttrValueList.push(newAttr);
        return;
      }
      this.$message("属性值不能重复");
      return;
    },
    addOrUpdateSpu() {
   
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      this.$api.spu.reqAddOrUpdateSpu(this.spu).then((res) => {
        if (res.code == 200) {
          this.$message({ type: "success", message: "保存成功" });
          this.$emit("changeScene", {scene:0,flag:this.spu.id?'修改':'添加'});
        }
      });
      Object.assign(this._data, this.$options.data());
    },
    addSpuData(categoryId3) {
        this.spu.category3Id=categoryId3
      this.$api.spu.reqTradeMarkList().then((res) => {
        if (res.code == 200) {
          this.tradeMarkList = res.data;
        }
      });
      this.$api.spu.reqBaseSaleAttrList().then((res) => {
        if (res.code == 200) {
          this.saleAttrList = res.data;
        }
      });
    },
    cancel(){
        this.$emit('changeScene', {scene:0,flag:''});
        Object.assign(this._data, this.$options.data());
    }
  },
  computed: {
    unSelectedAttr() {
      //整个平台的销售属性一共三个：尺寸、颜色、版本 ----saleAttrList
      //当前SPU拥有的属于自己的销售属性SPU.spuSaleAttrList  ----颜色
      //数组的过滤方法，可以从已有的数组当中过滤出用户需要的元素，并未返回一个新的数据
      let result = this.saleAttrList.filter((item) => {
        //every数组的方法，会返回一个布尔值【真，假的】
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>