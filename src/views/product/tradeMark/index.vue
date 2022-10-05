<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showDialog"
      >添加</el-button
    >
    <el-table :data="list" border stripe>
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>

      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>

      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 150px; height: 120px" />
        </template>
      </el-table-column>

      <el-table-column prop="id" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="updateTrademark(row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="sizeChange"
      @current-change="getPageList"
      :current-page.sync="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      background
      :pager-count="7"
      style="margin-top: 20px; text-align: center"
    >
    </el-pagination>

    <el-dialog
      :title="tmForm.id?'修改品牌':'添加品牌'" 
      :visible.sync="dialogFormVisible"
      style="width: 80%"
    >
      <el-form :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="品牌LOGO" label-width="100px"  prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            v-model="tmForm.logoUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      dialogFormVisible: false,

      tmForm: {
        tmName: "",
        logoUrl: "",
      },
          rules: {
          tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
          logoUrl: [
            { required: true, message: '请选择图片', trigger: 'change' }
          ],
        
        }
      };
    
    
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    getPageList(page = 1) {

      this.page = page;

      this.$api.tradeMark
        .reqTrademarkList(this.page, this.limit)
        .then((res) => {
          if (res.code === 200) {
            this.total = res.data.total;
            this.list = res.data.records;
          }
        }).catch(err=>{console.log(err);});
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    showDialog() {
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    
      this.dialogFormVisible = true;
    },
    updateTrademark(row) {
  
      this.dialogFormVisible = true;

     this.tmForm={...row}
    
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
   addOrUpdateTrademark(){
 this.$refs.ruleForm.validate((valid) => {
          if (valid) {
                 this.dialogFormVisible=false
     
      this.$api.tradeMark.reqAddOrUpdateTrademark(this.tmForm).then((res)=>{
     
        if(res.code===200){

          this.$message({
           message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
          type: 'success'
        })
          this.getPageList(this.page)
        }
      })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    deleteTradeMark(row){
        this.$confirm(`你确认删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
      let res=await    this.$api.tradeMark.reqDeleteTradeMark(row.id)
          if(res.code==200){
  this.$message({
            type: 'success',
            message: '删除成功!'
          });
          }
        this.getPageList(this.list.length>1?this.page:this.page-1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style scoped >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>