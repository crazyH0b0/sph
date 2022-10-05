
import request from "@/utils/request"
export const reqSpuList=(page,limit,categoryId3)=>request({url:`/admin/product/${page}/${limit}`,params: { "category3Id": categoryId3}} )

export const reqSpu=(spuId)=>request({url:`/admin/product/getSpuById/${spuId}`})

export const reqTradeMarkList=()=>request({url:"/admin/product/baseTrademark/getTrademarkList"})

export const reqSkuImage=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`})

export const reqBaseSaleAttrList=()=>request({url:"/admin/product/baseSaleAttrList"})

export const reqAddOrUpdateSpu=(spuInfo)=>{

    if(spuInfo.id){
        return request({url:`/admin/product/updateSpuInfo`,data:spuInfo,method:"post"})
    }else{
        return request({url:`/admin/product/saveSpuInfo`,data:spuInfo,method:"post"})

    }
}

export const reqDeleteSpu = (spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'});

export const reqAddSku=(data)=>request({url:"/admin/product/saveSkuInfo",data,method:"post"})

export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}` })