import request from "@/utils/request"
export const   reqSpuImageList=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`})
export const reqSpuSaleAttrList=(spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`})

export const reqAttrInfoList =(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`})

export const reqSaveSkuInfo=(data)=>request({url:"/admin/product/saveSkuInfo",data,method:"post"})

export const reqSkuList=(page,limit)=>request({url:`/admin/product/list/${page}/${limit}`})

export const reqSale=(skuId)=>request({url:`/admin/product/onSale/${skuId}`})

export const reqCancelSale=(skuId)=>request({url:`/admin/product/cancelSale/${skuId}`})
export const reqSkuById=(skuId)=>request({url:`/admin/product/getSkuById/${skuId}`})