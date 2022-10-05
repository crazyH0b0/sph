<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.categoryId1"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1" :index="index"
            :key="c1.id"
            >{{ c1.name }}</el-option
          >
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.categoryId2"
          @change="handler2"
          :disabled="show"
        >

          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2" :index="index"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.categoryId3"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3" :index="index"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        categoryId1: "",
        categoryId2: "",
        categoryId3: "",
      },
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    getCategory1List() {
      this.$api.attr.reqGetCategory1List().then((res) => {
        if (res.code == 200) {
          this.list1 = res.data;
        }
      });
    },
    handler1() {
      this.list2 = [];
      this.list3 = [];
      this.cForm.categoryId2 = "";
      this.cForm.categoryId3 = "";
      const { categoryId1 } = this.cForm;
      this.$emit("getCategoryId",{categoryId:categoryId1,level:1})
      this.$api.attr.reqGetCategory2List(categoryId1).then((res) => {
        if (res.code == 200) {
          this.list2 = res.data;
        }
      });
    },
    handler2() {
      // a
      this.list3 = [];
      this.cForm.categoryId3 = "";
      const { categoryId2 } = this.cForm;
      this.$emit("getCategoryId",{categoryId:categoryId2,level:2})
      this.$api.attr.reqGetCategory3List(categoryId2).then((res) => {
        if (res.code == 200) {
          this.list3 = res.data;
        }
      });
    },
    handler3() {
      const {categoryId3}=this.cForm
       this.$emit("getCategoryId",{categoryId:categoryId3,level:3})
    },
  },
};
</script>

<style>
</style>