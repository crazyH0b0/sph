<template>
  <div>
    <el-card>
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>

    <el-card style="margin: 20px 0">
      <el-button
        type="primary"
        icon="el-icon-plus"
        v-show="isShowTable"
        :disabled="!categoryId3"
        @click="addAttr"
        >添加属性</el-button
      >

      <div v-show="isShowTable">
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            prop="prop"
            label="序号"
            width="80"
            type="index"
            align="center"
          >
          </el-table-column>

          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>

          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row}">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList" :index="index"
                :key="attrValue.id"
                style="margin: 0 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row}">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="default"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button type="primary" size="default"  @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            prop="prop"
            type="index"
            label="序号"
            width="80"
            align="center"
          >
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="属性值名称"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-input
                size="mini"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="row.flag = false"
                :ref="$index"
              ></el-input>

              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          >
            <template slot-scope="{ row, $index }">
         

              <el-popconfirm :title="`确定删除${row.valueName}吗? `" @onConfirm="deleteAttrValue($index)">
                    <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              ></el-button>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button size="default" @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      categoryId1: "",
      categoryId2: "",
      categoryId3: "",
      attrList: [],

      isShowTable: true,
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      },
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.categoryId1 = categoryId;
        this.categoryId2 = "";
        this.categoryId3 = "";
      } else if (level == 2) {
        this.categoryId2 = categoryId;

        this.categoryId3 = "";
      } else {
        this.categoryId3 = categoryId;
        this.getAttrList();
      }
    },
    getAttrList() {
      const { categoryId1, categoryId2, categoryId3 } = this;
      this.$api.attr
        .reqAttrList(categoryId1, categoryId2, categoryId3)
        .then((res) => {
          if (res.code == 200) {
            this.attrList = res.data;
          }
        });
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.categoryId,

        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.categoryId3,
        categoryLevel: 3,
        id: 0,
      };
    },
    updateAttr(row) {
      this.isShowTable = false;

      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("输入不能为空");
        return;
      }

      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName === item.valueName;
        }
      });
      if (isRepeat) {
        return;
      }
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;

      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1)

    },
    addOrUpdateAttr(){
 this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
          //过滤掉属性值不是空的
          if(item.valueName.trim()!=''){
            //删除掉flag属性
            delete item.flag;
            return true;
          }
      })
   this.$api.attr.reqAddOrUpdateAttr(this.attrInfo).then(res=>{
     if(res.code==200){
       this.isShowTable=true
       this.getAttrList()
     }
   })
    }
  },
};
</script>

<style>
</style>