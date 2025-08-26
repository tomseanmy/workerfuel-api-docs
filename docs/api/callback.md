# 支付回调通知

## 概述

当用户完成支付后，系统会向第三方系统发起回调通知。

## 回调通知接口

### 请求方式

```
POST {callback}
```

由第三方在请求交易时提供回调地址。

### 请求头

```
Content-Type: application/json
```

### 回调参数(CallbackResp)

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| trade | Trade | 交易明细 |
| state | CallbackState | 回调状态(PAY_SUCCESS:支付成功, PAY_FAIL:支付失败, INVALID:失效) |
| at | string | 回调时间 |
| message | string | 回调信息 |

### Trade对象结构

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| id | long | 交易ID |
| userId | long | 用户ID |
| userName | string | 用户名 |
| billId | string | 第三方系统单据号 |
| income | long | 收入金额(单位:分) |
| expense | long | 支出金额(单位:分) |
| balance | long | 账户余额(单位:分) |
| title | string | 交易标题 |
| body | string | 交易内容 |
| amount | long | 交易金额 |
| tradeMethod | TradeMethod | 交易方式(RFID, QR_CODE, THIRD_PARTY, RECHARGE) |
| payMethod | PayMethod | 支付方式(FULL_COIN:饱饱币, WX_PAY:微信支付, COMB:组合支付) |
| tradeState | TradeState | 交易状态(CREATED, PAID, CANCELED) |
| paidAt | string | 支付时间 |
| cancelledAt | string | 取消时间 |
| writeOff | boolean | 是否核销 |
| writeOffAt | string | 核销时间 |
| channelId | long | 渠道号 |
| channelType | ChannelType | 渠道类型(SELF, SUPPLIER) |
| createdBy | long | 创建人ID |
| createdAt | string | 创建时间 |

### 回调示例

```json
{
  "trade": {
    "id": 1405452730637488143,
    "userId": 1405452730637488142,
    "userName": "张三",
    "billId": "20230405001",
    "income": 0,
    "expense": 1000,
    "balance": 5000,
    "title": "商品购买",
    "body": "购买商品明细",
    "amount": null,
    "tradeMethod": "THIRD_PARTY",
    "payMethod": "FULL_COIN",
    "tradeState": "PAID",
    "paidAt": "2023-04-05T12:05:00",
    "cancelledAt": null,
    "writeOff": true,
    "writeOffAt": "2023-04-05T12:05:00",
    "channelId": 1405452730637488144,
    "channelType": "SUPPLIER",
    "createdBy": 1405452730637488145,
    "createdAt": "2023-04-05T12:00:00"
  },
  "state": "PAY_SUCCESS",
  "at": "2023-04-05T12:05:00",
  "message": "支付成功"
}
```

## 回调处理要求

1. 第三方系统需要在收到回调后返回HTTP 200状态码表示接收成功
2. 如果回调处理失败，系统会进行重试，最多重试5次(重试间隔为1, 4, 9, 16, 25秒)
3. 建议第三方系统对重复通知做幂等处理

## 最佳实践

1. 在处理回调时，首先验证回调数据的完整性
2. 对于成功的支付回调，及时更新本地订单状态
3. 记录回调日志，便于问题排查
4. 对于失败的回调，要有相应的错误处理机制