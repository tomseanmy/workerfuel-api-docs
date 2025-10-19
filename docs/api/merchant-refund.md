# 商家手动退款

## 概述

当商户工作人员需要对已完成的交易进行手动退款时，可以调用此接口。接口支持多次退款，系统会自动校验所有退款金额之和不超过原始支付金额。

## 请求地址

```
POST /trade/refundbymerchant
```

## 请求头

```
Authorization: Bearer {token}
Content-Type: application/json
```

## 权限要求

需要 `MERCHANT` 角色权限。

## 请求参数(MerchantRefundTradeReq)

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| tradeId | long | 否* | 交易记录ID（与requestId二选一） |
| requestId | long | 否* | 预支付请求ID（与tradeId二选一） |
| refundAmount | long | 是 | 本次退款金额（单位: 分），所有退款累计金额不得超过原交易金额 |

> 至少需要提供 `tradeId` 或 `requestId` 中的一个字段。

### 请求示例

```json
{
  "tradeId": 1405452730637488143,
  "refundAmount": 500
}
```

## 响应参数

接口成功时返回退款生成的 `Trade` 对象，字段结构与支付成功回调中的 `Trade` 数据一致。

### 响应示例

```json
{
  "c": 0,
  "m": "success",
  "d": {
    "id": 1405452730637489150,
    "userId": 1405452730637488142,
    "billId": "20230405001_refund",
    "income": 500,
    "expense": 0,
    "balance": 5500,
    "title": "退款：商品购买",
    "body": "退款原因：商家手动退款",
    "amount": null,
    "tradeMethod": "MERCHANT_SYS",
    "payMethod": "FULL_COIN",
    "tradeState": "PAID",
    "paidAt": "2023-04-05T13:00:00",
    "writeOff": false,
    "merchantId": 1405452730637488144,
    "merchantType": "SUPPLIER",
    "merchantName": "示例商户",
    "createdBy": 1405452730637488160,
    "createdAt": "2023-04-05T13:00:00"
  }
}
```

## 使用说明

1. 同一笔交易可以分多次部分退款，但累计金额不能超过原交易金额。
2. 饱饱币支付会直接退回到用户余额，现金类支付将按照原支付通道原路退回。
3. 建议对退款操作做好人工审核与日志记录，确保资金安全。
