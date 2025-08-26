# 身份认证

## 概述

第三方系统工作人员需要通过身份认证获取访问令牌，才能调用其他API接口。

## 密码登录

### 请求地址

```
POST /login/bypasswd
```

### 请求参数

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| phone | string | 是 | 手机号 |
| passwd | string | 是 | 密码 |

### 请求示例

```json
{
  "phone": "13800000000",
  "passwd": "password123"
}
```

### 响应参数

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| token | string | 访问令牌 |
| expiredAt | string | 过期时间 |
| refreshToken | string | 刷新令牌 |
| user | User | 用户信息 |

### 响应示例

```json
{
  "c": 0,
  "m": "success",
  "d": {
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiredAt": "2023-12-31T23:59:59",
    "refreshToken": "refresh_eyjhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1405452730637488142,
      "orgId": 1405452730637488143,
      "orgName": "示例机构",
      "code": "U001",
      "name": "张三",
      "nickname": "三儿",
      "avatar": "https://example.com/avatar.jpg",
      "wxid": "wx123456",
      "sessionKey": "session_key_example",
      "phone": "13800000000",
      "rfid": "rfid123456",
      "fullCoin": 10000,
      "historyFullCoin": 15000,
      "state": "NORMAL",
      "roles": ["MERCHANT"],
      "createdBy": 1405452730637488141,
      "createdAt": "2023-01-01T00:00:00"
    }
  }
}
```

### User对象结构

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| id | long | 用户ID |
| orgId | long | 机构ID |
| orgName | string | 机构名称 |
| code | string | 用户编码 |
| name | string | 用户姓名 |
| nickname | string | 昵称 |
| avatar | string | 头像URL |
| wxid | string | 微信ID |
| sessionKey | string | 微信SessionKey |
| phone | string | 手机号 |
| rfid | string | RFID卡号 |
| fullCoin | long | 饱饱币余额(单位:分) |
| historyFullCoin | long | 累计饱饱币(单位:分) |
| state | UserState | 用户状态(CREATED, NORMAL, LOCKED) |
| roles | array | 用户角色列表(ADMIN, USER, GUEST, MERCHANT) |
| createdBy | long | 创建人ID |
| createdAt | string | 创建时间 |

### 使用方式

获取到访问令牌后，在后续请求的Header中添加：

```
Authorization: Bearer {token}
```

## 刷新令牌登录

当访问令牌过期时，可以使用刷新令牌获取新的访问令牌。

### 请求地址

```
POST /login/refresh
```

### 请求参数

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| refreshToken | string | 是 | 刷新令牌 |

### 请求示例

```json
{
  "refreshToken": "refresh_eyjhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 响应参数

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| token | string | 新的访问令牌 |
| expiredAt | string | 过期时间 |
| user | User | 用户信息 |

### 响应示例

```json
{
  "c": 0,
  "m": "success",
  "d": {
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiredAt": "2023-12-31T23:59:59",
    "user": {
      "id": 1405452730637488142,
      "orgId": 1405452730637488143,
      "orgName": "示例机构",
      "code": "U001",
      "name": "张三",
      "nickname": "三儿",
      "avatar": "https://example.com/avatar.jpg",
      "wxid": "wx123456",
      "sessionKey": "session_key_example",
      "phone": "13800000000",
      "rfid": "rfid123456",
      "fullCoin": 10000,
      "historyFullCoin": 15000,
      "state": "NORMAL",
      "roles": ["MERCHANT"],
      "createdBy": 1405452730637488141,
      "createdAt": "2023-01-01T00:00:00"
    }
  }
}
```