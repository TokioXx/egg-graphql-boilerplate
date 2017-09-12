---
swagger: "2.0"
info:
  version: "1.0"
  description: |
    ### responses
    以下API仅仅定义data内部的内容，所有API返回格式如下:
    ```
    {
      code: Interger,
      msg:  String,
      data: Object
    }
    ```

    ### error code

    - 200-500: http错误
    - 10000 - 10999: 系统内部操作错误, 如DB, REDIS

    | 状态码  | 含义          | 说明             |
    | ---- | ----------- | ---------------- |
    | 200  | success     | 请求成功             |
    | 204  | no content  | 请求成功，但是没有返回内容    |
    | 304  | redirect    | 重定向              |
    | 400  | bad request | 参数错误，msg中有错误字段提示 |
    | 403  | forbidden   | 没有登录或者没有管理员权限 |
    | 404  | not found   | 接口不存在            |
    | 500  | error       | 服务器错误            |
    | 10001  | basic error       | 数据库DB操作失败 |
 

  title: "heclouds SAAS API"
  termsOfService: "http://heclouds.saas.com/"
  contact:
    email: "xieguodong@wondertek.com.cn"
host: "heclouds.saas.com"
basePath: "/api/v1"
schemes:
  - http
produces:
  - application/json
consumes:
  - application/json
tags:
  - name: "auth"
  - name: "graphql"


paths:
  /auth/login:
    post:
      tags:
        - auth
      description: 登录
      parameters:
        - in: body
          name: user
          schema:
            type: object
            required:
              - name
              - password
            properties:
              name:
                type: string
              password:
                type: string
      responses:
        200:
          description: Success
          schema:
            type: object
            required:
              - user
              - token
            properties:
              user:
                $ref: '#/definitions/User'
              token:
                type: string
                
  /auth/register:
    post:
      tags:
        - auth
      description: 注册
      parameters:
        - in: body
          name: user
          schema:
            type: object
            required:
              - name
              - password
            properties:
              name:
                type: string
              password:
                type: string
      responses:
        200:
          description: Success
          schema:
            type: object
            required:
              - user
              - token
            properties:
              user:
                $ref: '#/definitions/User'
              token:
                type: string

  /graphql:
    get:
      tags:
        - graphql
      description: |
        ```graphql
        scalar Date
        
        enum Priority {
          HIGH,
          NORMAL,
          LOW
        }
        
        type Query {
          user(id: String!): User
          tags: [String!]
        }
        
        
        type Mutation {
        
          # Item
          createItem (content: String!, expire: Date): Item
          updateItem (id: ID!, content: String, expire: Date, done: Boolean!): Item
          deleteItem (id: ID!): Item 
          
          # Notification
          updateNotification (id: ID!): Notification
          deleteNotification (id: ID!): Notification
          
          # Tag
          attachTag (itemId: ID!, tag: String!): Tag
          removeTag (itemId: ID!): Tag
        }
        
        type User {
          id: String!
          password: String!
          name: String!
          items: [Item!]
        }
        
        type Item {
          id: ID!,
          content: String!,
          expire: String!,
          priority: Priority!,
          done: Boolean!,
          tags: [String!],
          active: Boolean!,
          updated_at: Date!,
          created_at: Date!
        }

        type Notification {
          id: ID!,
          content: String!,
          updated_at: Date!,
          created_at: Date!
        }
        
        type Tag {
          id: ID!
          user_id: ID!
          content: String!
        }

        ```
      responses:
        200:
          description: Success
      

definitions:

  User:
    properties:
      id:
        type: string
      name:
        type: string

