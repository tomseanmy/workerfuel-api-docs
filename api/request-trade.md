# 发起消费请求

## 概述

第三方系统工作人员通过此接口发起消费请求。

## 请求交易接口

### 请求地址

```
POST /trade/request
```

### 请求头

```
Authorization: Bearer {token}
Content-Type: application/json
```

### 权限要求

需要 `MERCHANT` 角色权限。

### 请求参数(RequestTradeReq)

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| billId | string | 否 | 第三方系统单据号 |
| userId | long | 否* | 消费用户ID(当使用userId时必须) |
| qrCode | string | 否* | 二维码(与userId二选一) |
| rfid | string | 否* | RFID卡号(与userId、qrCode三选一) |
| income | long | 是 | 收入金额(单位:分) |
| expense | long | 是 | 支出金额(单位:分) |
| title | string | 是 | 消费标题 |
| body | string | 否 | 消费内容 |
| timestamp | long | 是 | 时间戳 |
| callback | string | 是 | 支付成功回调地址 |

### 请求示例

```json
{
  "billId": "20230405001",
  "userId": 1405452730637488142,
  "income": 0,
  "expense": 1000,
  "title": "商品购买",
  "body": "购买商品明细",
  "timestamp": 1680691234567,
  "callback": "https://yourdomain.com/callback"
}
```

### 响应参数(RequestTradeResp)

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| id | long | 交易ID |
| billId | string | 第三方系统单据号 |
| userId | long | 用户ID |
| userName | string | 用户名 |
| income | long | 收入金额(单位:分) |
| expense | long | 支出金额(单位:分) |
| balance | long | 账户余额(单位:分) |
| createdAt | string | 创建时间 |

### 响应示例

```json
{
  "c": 0,
  "m": "success",
  "d": {
    "id": 1405452730637488143,
    "billId": "20230405001",
    "userId": 1405452730637488142,
    "userName": "张三",
    "income": 0,
    "expense": 1000,
    "balance": 5000,
    "createdAt": "2023-04-05T12:00:00"
  }
}
```