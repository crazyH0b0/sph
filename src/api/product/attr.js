import request from "@/utils/request"

export const reqGetCategory1List=()=>request({url:"/admin/product/getCategory1"})

export const reqGetCategory2List=(category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`})

export const reqGetCategory3List=(category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`})

export const reqAttrList=(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`})


export const reqAddAttr=(data)=>request({url:`/admin/product/saveAttrInfo`,data,method:"post "})
export const reqAddOrUpdateAttr=(data)=>request({url:"/admin/product/saveAttrInfo",data,method:"post"})