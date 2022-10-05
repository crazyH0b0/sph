import request from "@/utils/request"

export const reqTrademarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}` })

export const reqAddOrUpdateTrademark = (tradeMark) => {
    if (tradeMark.id) {
     
        return request({ url: '/admin/product/baseTrademark/update', method: 'PUT', data: tradeMark });
    } else {
        //新增品牌
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark });
    }
}

export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:"delete"})