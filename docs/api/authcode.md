# 用户授权码接口

## 概述

第三方系统可以通过授权码机制获取用户信息。用户在系统中生成授权码后，第三方系统可以使用该授权码换取用户信息。

## 创建授权码接口

用户主动生成授权码，发送给需要的第三方商户系统。

### 请求地址

```
POST /user/createauthcode
```

### 请求头

```
Authorization: Bearer {token}
Content-Type: application/json
```

### 权限要求

需要 `USER` 角色权限。

### 请求参数

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| userId | long | 是 | 用户ID |

### 请求示例

```json
{
  "userId": 1405452730637488142
}
```

### 响应参数

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| code | string | 授权码 |

### 响应示例

```json
{
  "c": 0,
  "m": "success",
  "d": {
    "code": "abc123xyz"
  }
}
```

## 通过授权码获取用户信息接口

### 请求地址

```
GET /user/getbyauthcode?code={authCode}
```

### 请求头

```
Authorization: Bearer {token}
```

### 权限要求

需要 `MERCHANT` 角色权限。

### 请求参数

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| code | string | 是 | 授权码 |

### 响应参数

返回 UserOutside 对象：

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| id | long | 用户ID |
| orgId | long | 机构ID |
| orgName | string | 机构名称 |
| code | string | 用户编码 |
| name | string | 用户姓名 |
| nickname | string | 昵称 |
| avatar | string | 头像URL |
| phone | string | 手机号 |
| state | UserState | 用户状态(CREATED, NORMAL, LOCKED) |
| roles | array | 用户角色列表(ADMIN, USER, GUEST, MERCHANT) |
| createdBy | long | 创建人ID |
| createdAt | string | 创建时间 |

### 响应示例

```json
{
  "c": 0,
  "m": "success",
  "d": {
    "id": 1405452730637488142,
    "orgId": 1405452730637488143,
    "orgName": "示例机构",
    "code": "U001",
    "name": "张三",
    "nickname": "三儿",
    "avatar": "https://example.com/avatar.jpg",
    "phone": "13800000000",
    "state": "NORMAL",
    "roles": ["USER"],
    "createdBy": 1405452730637488141,
    "createdAt": "2023-01-01 00:00:00"
  }
}
```

## 使用流程

1. 用户在系统中生成授权码
2. 用户将授权码提供给第三方系统
3. 第三方系统调用接口通过授权码获取用户信息
4. 授权码使用后立即失效，无法重复使用

## 注意事项

1. 授权码具有时效性，生成后应尽快使用
2. 每个授权码只能使用一次，使用后立即失效
3. 授权码获取用户信息接口需要商户权限
4. 如果授权码无效或已过期，会返回相应的错误信息