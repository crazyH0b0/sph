<template>
    <div>
        <el-row>
            <el-col :span="12">
              <Search />
            </el-col>
            <el-col :span="12">
                  <Category />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Category from "./Category"
import Search from "./Search"
export default {
    name: "Observe",
    data() {
        return {
            
        }
    },
    mounted() {
 
    },
    components: {
        Category,
        Search

    }
}
</script>

<style>
</style>