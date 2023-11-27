var spec =
{
    swagger: "2.0",
    info: {
        description:
            "eateria API",
        version: "1.0",
        title: "SE104 - eateria",
    },
    host: "se104-eateria.onrender.com",
    // host: "localhost:3000",
    basePath: "/v1",
    tags: [
        {
            name: "auth",
            description: "API in route /auth (login, register, logout, refresh token)",
        },
        {
            name: "user",
            description: "API in route /user (get all users info, get user info, update user info, forgot password, change password)",
        },
        {
            name: "dish",
            description: "API in route /dish (get all dishes info, get dish info, create dish, update dish, delete dish)",
        },
        {
            name: "menu",
            description: "API in route /menu (get all dish in menu, get all menu)",
        },
        {
            name: "employee",
            description: "API in route /employee (get all employees info, get employee info, create employee, update employee, delete employee)",
        },
        {
            name: "comment",
            description: "API in route /comment (get all comments info, get comment info, create comment, update comment, delete comment)",
        },
        {
            name: "table",
            description: "API in route /table (get all tables info, get table info, create table, update table, delete table)",
        },
        {
            name: "bill",
            description: "API in route /bill (get all bills info, get bill info, create bill, update bill, delete bill)",
        }
    ],
    schemes: ["https"],    // Sử dụng scheme gì? HTTP, HTTPS?
    paths: {
        // auth
        "/auth/register": {
            post: {
                tags: ["auth"],
                summary: "register new user",
                description: "",
                operationId: "createNewUserAccount",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "username",
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "username"
                    },
                    {
                        "in": "formData",
                        "name": "email",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "email"
                    },
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "password"
                    }
                ],
                responses: {
                    400: {
                        description: "please provide all required fields",
                        schema: {
                            $ref: "#/definitions/provideAllFields"
                        }
                    },
                    409: {
                        description: "email already exists",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "email already exists"
                                }
                            }
                        }
                    },
                    201: {
                        description: "register successfully",
                        schema: {
                            $ref: "#/definitions/successResponse"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: []
            }
        },
        "/auth/login": {
            post: {
                tags: ["auth"],
                summary: "login user",
                description: "",
                operationId: "loginUserAccount",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "email",
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "email"
                    },
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "password"
                    }
                ],
                responses: {
                    400: {
                        description: "please provide all required fields",
                        schema: {
                            $ref: "#/definitions/provideAllFields"
                        }
                    },
                    401: {
                        description: "email or password is incorrect",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "email or password is incorrect"
                                }
                            }
                        }
                    },
                    200: {
                        description: "login successfully",
                        schema: {
                            $ref: "#/definitions/login"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [

                ]
            }
        },
        "/auth/logout": {
            post: {
                tags: ["auth"],
                summary: "logout user",
                description: "",
                operationId: "logoutUserAccount",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                ],
                responses: {
                    200: {
                        description: "logout successfully",
                        schema: {
                            $ref: "#/definitions/successResponse"
                        }
                    },
                },
                security: [
                    {
                        accessToken: []
                    }
                ]
            },
        },
        "/auth/refresh_token": {
            post: {
                tags: ["auth"],
                summary: "refresh token",
                description: "refresh token",
                operationId: "refreshToken",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [

                ],
                responses: {
                    409: {
                        description: "invalid token",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "invalid token"
                                }
                            }
                        }
                    },
                    200: {
                        description: "refresh token successfully",
                        schema: {
                            $ref: "#/definitions/login"
                        }
                    },
                },
                security: [
                    {
                        accessToken: []
                    }
                ]
            },
        },
        // user
        "/user/": {
            get: {
                tags: ["user"],
                summary: "get all users info",
                description: "get all users info",
                operationId: "getAllUsersInfo",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                ],
                responses: {
                    200: {
                        description: "get user info successfully",
                        schema: {
                            name: "users",
                            type: "array",
                            items: {
                                $ref: "#/definitions/user"
                            },
                        }
                    },
                    404: {
                        description: "no user found in database",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "no user found in database"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [
                    {
                        accessTokenAdmin: []
                    }
                ]
            },
        },
        "/user/{id}": {
            get: {
                tags: ["user"],
                summary: "get user info",
                description: "get user info by id (only admin or get current user info)",
                operationId: "getUserInfo",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [

                ],
                responses: {
                    200: {
                        description: "get user info by id successfully",
                        schema: {
                            $ref: "#/definitions/user"
                        }
                    },
                    404: {
                        description: "user not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "user not found"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [
                    // bearer token in authorization header
                    {
                        accessToken: []
                    }
                ]
            },
            put: {
                tags: ["user"],
                summary: "update user info",
                description: "update user info by id (only admin or update current user info)",
                operationId: "updateUserInfo",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "images",
                        "required": "false",
                        "schema": {
                            "type": "file"
                        },
                        "description": "images"
                    },
                    {
                        "in": "formData",
                        "name": "username",
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "username"
                    },
                    {
                        "in": "formData",
                        "name": "email",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "email"
                    },
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "password"
                    }
                ],
                responses: {
                    200: {
                        description: "update user info by id successfully",
                        schema: {
                            $ref: "#/definitions/user"
                        }
                    },
                    404: {
                        description: "user not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "user not found"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [
                    // bearer token in authorization header
                    {
                        accessToken: []
                    }
                ]
            },
        },

        "/user/forgot-password": {
            post: {
                tags: ["user"],
                summary: "forgot password",
                description: "forgot password",
                operationId: "forgotPassword",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "email",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "email"
                    }
                ],
                responses: {
                    200: {
                        description: "New password sent to your email",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "success message",
                                    example: "New password sent to your email"
                                }
                            }
                        }
                    },
                    404: {
                        description: "email not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "email not found"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [

                ]
            },
        },
        "/user/change-password": {
            post: {
                tags: ["user"],
                summary: "change password",
                description: "change password",
                operationId: "changePassword",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "password"
                    },
                    {
                        "in": "formData",
                        "name": "newPassword",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "newPassword"
                    }
                ],
                responses: {
                    200: {
                        description: "change password successfully",
                        schema: {
                            ref: "#/definitions/successResponse"
                        }
                    },
                    404: {
                        description: "User not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "User not found"
                                }
                            }
                        }
                    },
                    400: {
                        description: "password is incorrect",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "password is incorrect"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
            },
        },
        // menu
        "/menu/": {
            get: {
                tags: ["menu"],
                summary: "get all menu",
                description: "get all menu",
                operationId: "getAllMenu",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                ],
                responses: {
                    200: {
                        description: "get all menu successfully",
                        schema: {
                            name: "menus",
                            type: "array",
                            items: {
                                $ref: "#/definitions/menu"
                            }
                        }
                    },
                    404: {
                        description: "menu not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: ""
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: []
            }
        },
        "/menu/{id}/dishes": {
            get: {
                tags: ["menu"],
                summary: "get all dish in menu",
                description: "get all dish in menu",
                operationId: "getAllDishInMenu",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                ],
                responses: {
                    200: {
                        description: "get all dish in menu successfully",
                        schema: {
                            name: "dishes",
                            type: "array",
                            items: {
                                $ref: "#/definitions/dish"
                            }
                        }
                    },
                    404: {
                        description: "menu not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "menu not found"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: []
            }
        },
        // dish
        "/dish/": {
            post: {
                tags: ["dish"],
                summary: "create dish",
                description: "create dish",
                operationId: "createDish",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "images",
                        "schema": {
                            "type": "file"
                        },
                        "description": "images"
                    },
                    {
                        "in": "formData",
                        "name": "dishName",
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "name"
                    },
                    {
                        "in": "formData",
                        "name": "menuName",
                        "required": "true",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "menuName"
                    },
                    {
                        "in": "formData",
                        "name": "dishPrice",
                        "required": "true",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "price"
                    },
                    {
                        "in": "formData",
                        "name": "dishDescription",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "description"
                    },

                ],
                responses: {
                    200: {
                        description: "create dish successfully",
                        schema: {
                            $ref: "#/definitions/successResponse"
                        }
                    },
                    404: {
                        description: "menu not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "menu not found"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [
                    {
                        accessTokenAdmin: []
                    }
                ]
            },
            get: {
                tags: ["dish"],
                summary: "get all dishes info",
                description: "get all dishes info",
                operationId: "getAllDishesInfo",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                ],
                responses: {
                    200: {
                        description: "get all dishes info successfully",
                        schema: {
                            name: "dishes",
                            type: "array",
                            items: {
                                $ref: "#/definitions/dish"
                            }
                        }
                    },
                    404: {
                        description: "no dish found in database",
                        schema: {
                            $ref: "#/definitions/dishNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: []
            }
        },
        "/dish/{id}": {
            get: {
                tags: ["dish"],
                summary: "get dish info",
                description: "get dish info by id",
                operationId: "getDishInfo",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [

                ],
                responses: {
                    200: {
                        description: "get dish info by id successfully",
                        schema: {
                            $ref: "#/definitions/dish"
                        }
                    },
                    404: {
                        description: "dish not found",
                        schema: {
                            $ref: "#/definitions/dishNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: []
            },
            put: {
                tags: ["dish"],
                summary: "update dish info",
                description: "update dish info by id",
                operationId: "updateDishInfo",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "images",
                        "schema": {
                            "type": "file"
                        },
                        "description": "images"
                    },
                    {
                        "in": "formData",
                        "name": "dishName",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "name"
                    },
                    {
                        "in": "formData",
                        "name": "menuName",
                        "required": "true",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "menuName"
                    },
                    {
                        "in": "formData",
                        "name": "dishPrice",
                        "required": "true",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "price"
                    },
                    {
                        "in": "formData",
                        "name": "dishDescription",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "description"
                    },

                ],
                responses: {
                    200: {
                        description: "update dish info by id successfully",
                        schema: {
                            $ref: "#/definitions/successResponse"
                        }
                    },
                    404: {
                        description: "dish not found",
                        schema: {
                            $ref: "#/definitions/dishNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [
                    {
                        accessTokenAdmin: []
                    }
                ]
            },
            delete: {
                tags: ["dish"],
                summary: "delete dish",
                description: "delete dish by id",
                operationId: "deleteDish",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [

                ],
                responses: {
                    200: {
                        description: "delete dish by id successfully",
                        schema: {
                            $ref: "#/definitions/successResponse"
                        }
                    },
                    404: {
                        description: "dish not found",
                        schema: {
                            $ref: "#/definitions/dishNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [
                    {
                        accessTokenAdmin: []
                    }
                ]
            }
        },
        "/images/{id}": {
            delete: {
                tags: ["dish"],
                summary: "delete image",
                description: "delete image",
                operationId: "deleteImage",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [

                ],
                responses: {
                    200: {
                        description: "delete image successfully",
                        schema: {
                            $ref: "#/definitions/successResponse"
                        }
                    },
                    404: {
                        description: "image not found",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "image not found"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: [
                    {
                        accessTokenAdmin: []
                    }
                ]
            },
        },
        "/dish/all/filter": {
            get: {
                tags: ["dish"],
                summary: "filterDish",
                description: "filter dish by name, price, menu",
                operationId: "filterDish",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "query",
                        "name": "minPrice",
                        "required": "false",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "minPrice"
                    },
                    {
                        "in": "query",
                        "name": "maxPrice",
                        "required": "false",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "maxPrice"
                    },
                    {
                        "in": "query",
                        "name": "menuId",
                        "required": "false",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "menuId"
                    },
                ],
                responses: {
                    200: {
                        description: "filter dish successfully",
                        schema: {
                            name: "dishes",
                            type: "array",
                            items: {
                                $ref: "#/definitions/dish"
                            }
                        }
                    },
                    404: {
                        description: "no dish found in database",
                        schema: {
                            $ref: "#/definitions/dishNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: []
            }
        },
        "dish/all/search": {
            get: {
                tags: ["dish"],
                summary: "searchDish",
                description: "search dish by dishName",
                operationId: "searchDish",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "dishName",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "dishName"
                    }
                ],
                responses: {
                    200: {
                        description: "search dish successfully",
                        schema: {
                            name: "dishes",
                            type: "array",
                            items: {
                                $ref: "#/definitions/dish"
                            }
                        }
                    },
                    404: {
                        description: "no dish found",
                        schema: {
                            $ref: "#/definitions/dishNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }
                },
                security: []
            }
        },
        // comment
        "/employee/": {
            post: {
                tags: ["employee"],
                summary: "create employee",
                description: "create employee",
                operationId: "createEmployee",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                    // employeeName, employeePosition, staffCode, startWorkingDate, salary, workShift, phoneNumber
                    {
                        "in": "formData",
                        "name": "employeeName",
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "employeeName"
                    },
                    {
                        "in": "formData",
                        "name": "employeePosition",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "employeePosition"
                    },
                    {
                        "in": "formData",
                        "name": "staffCode",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "staffCode"
                    },
                    {
                        "in": "formData",
                        "name": "startWorkingDate",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "startWorkingDate"
                    },
                    {
                        "in": "formData",
                        "name": "salary",
                        "required": "true",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "salary"
                    },
                    {
                        "in": "formData",
                        "name": "workShift",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "workShift"
                    },
                    {
                        "in": "formData",
                        "name": "phoneNumber",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "phoneNumber"
                    },
                ],
                responses: {
                    200: {
                        description: "create employee successfully",
                        schema: {
                            $ref: "#/definitions/successResponse"
                        }
                    },
                    404: {
                        description: "employee not found",
                        schema: {
                            $ref: "#/definitions/employeeNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }
                    }

                },
                security: [
                    {
                        accessTokenAdmin: []
                    }
                ]
            },
            get: {
                tags: ["employee"],
                summary: "get all employees info",
                description: "get all employees info",
                operationId: "getAllEmployeesInfo",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                ],
                responses: {
                    200: {
                        description: "get all employees info successfully",
                        schema: {
                            name: "employees",
                            type: "array",
                            items: {
                                $ref: "#/definitions/employee"
                            }
                        }
                    },
                    404: {
                        description: "no employee found in database",
                        schema: {
                            $ref: "#/definitions/employeeNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }

                    }
                },
                security: [
                    {
                        accessTokenAdmin: []
                    }
                ]
            }
        },
        "/comment/": {
            post: {
                tags: ["comment"],
                summary: "create comment",
                description: "create comment",
                operationId: "createComment",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                    // rating, content, dishId 
                    {
                        "in": "formData",
                        "name": "rating",
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "integer"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "rating"
                    },
                    {
                        "in": "formData",
                        "name": "content",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "content"
                    },
                    {
                        "in": "formData",
                        "name": "dishId",
                        "required": "true",
                        "schema": {
                            "type": "integer"
                        },
                        "description": "dishId"
                    },
                ],
                responses: {
                    200: {
                        description: "create comment successfully",
                        schema: {
                            $ref: "#/definitions/successResponse"
                        }
                    },
                    404: {
                        description: "dish not found",
                        schema: {
                            $ref: "#/definitions/dishNotFound"
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }

                    }
                },
                security: [
                    {
                        accessToken: []
                    }
                ]
            }
        },
        "/dish/{id}/comments": {
            get: {
                tags: ["comment"],
                summary: "get all comments info",
                description: "get all comments info",
                operationId: "getAllCommentsInfo",
                consumes: ["application/x-www-form-urlencoded"],
                produces: ["application/json"],
                parameters: [
                ],
                responses: {
                    200: {
                        description: "get all comments info successfully",
                        schema: {
                            name: "comments",
                            type: "array",
                            items: {
                                $ref: "#/definitions/comment"
                            }
                        }
                    },
                    404: {
                        description: "no comment found in database",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    description: "error message",
                                    example: "comment not found"
                                }
                            }
                        }
                    },
                    500: {
                        description: "server error",
                        schema: {
                            $ref: "#/definitions/messageErrorFromServer"
                        }

                    }
                },
                security: [
                    {
                        accessToken: []
                    }
                ]
            }
        }

    },

    securityDefinitions: {
        accessToken: {
            type: "apiKey",
            name: "accessToken",
            in: "Authorization",
            scheme: "bearer token"
        },
        accessTokenAdmin: {
            type: "apiKey",
            name: "accessToken",
            in: "Authorization",
            scheme: "bearer token",
            scopes: {
                isAdmin: true
            }
        },
    },
    definitions: {
        login: {
            type: "object",
            properties: {
                accessToken: {
                    type: "string",
                    description: "access token",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ"
                },
            }
        },
        messageErrorFromServer: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    description: "error message",
                    example: "server error"
                }
            }
        },
        provideAllFields: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    description: "error message",
                    example: "please provide all required fields",   // ví dụ        
                }
            }
        },
        successResponse: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    description: "success",
                    example: "success"
                }
            }
        },
        user: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "user id",
                    example: 1
                },
                username: {
                    type: "string",
                    description: "username",
                    example: "trungs"
                },
                email: {
                    type: "string",
                    description: "email",
                    example: "test@gmail.com"
                }
            }
        },
        menu: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "menu id",
                    example: 1
                },
                name: {
                    type: "string",
                    description: "menu name",
                    example: "menu 1"
                },
            }
        },
        dish: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "dish id",
                    example: 1
                },
                name: {
                    type: "string",
                    description: "dish name",
                    example: "dish 1"
                },
                price: {
                    type: "integer",
                    description: "dish price",
                    example: 10000
                },
                image: {
                    type: "string",
                    description: "dish image",
                    example: "https://www.google.com.vn/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                },
                description: {
                    type: "string",
                    description: "dish description",
                    example: "dish description"
                },
                menu_id: {
                    type: "integer",
                    description: "menu id",
                    example: 1
                },
            }
        },
        dishNotFound: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    description: "error message",
                    example: "dish not found"
                }
            }
        },
        employeeNotFound: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    description: "error message",
                    example: "employee not found"
                }
            }
        },
        employee: {
            type: "object",
            properties: {
                employeeName: {
                    type: "string",
                    description: "employee name",
                    example: "employee 1"
                },
                employeePosition: {
                    type: "string",
                    description: "employee position",
                    example: "employee position"
                },
                staffCode: {
                    type: "string",
                    description: "staff code",
                    example: "staff code"
                },
                startWorkingDate: {
                    type: "string",
                    description: "start working date",
                    example: "start working date"
                },
                salary: {
                    type: "integer",
                    description: "salary",
                    example: 10000
                },
                workShift: {
                    type: "string",
                    description: "work shift",
                    example: "work shift"
                },
                phoneNumber: {
                    type: "string",
                    description: "phone number",
                    example: "phone number"
                },
            }
        },
        comment: {
            type: "object",
            properties: {
                rating: {
                    type: "integer",
                    description: "rating",
                    example: 1
                },
                content: {
                    type: "string",
                    description: "content",
                    example: "content"
                },
                dishId: {
                    type: "integer",
                    description: "dish id",
                    example: 1
                },
            }
        }
    }
};
