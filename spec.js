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
    basePath: "/v1",
    tags: [
        {
            name: "admins",
            description: "Các API về tài khoản quản trị",
        },
        {
            name: "users",
            description: "Các API về tài khoản người dùng",
        }
    ],
    schemes: ["https"],    // Sử dụng scheme gì? HTTP, HTTPS?
    paths: {
        "/auth/register": {
            post: {
                tags: ["users"],
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
                        description: "please provide all required fields"
                    },
                    409: {
                        description: "email already exists"
                    },
                    201: {
                        description: "register successfully"
                    },
                    500: {
                        description: "server error"
                    }
                },
                security: [

                ]
            }
        },
        "/auth/login": {
            post: {
                tags: ["users"],
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
                        description: "please provide all required fields"
                    },
                    401: {
                        description: "email or password is incorrect"
                    },
                    200: {
                        description: "login successfully",
                        schema: {
                            $ref: "#/definitions/login"
                        }
                    },
                    500: {
                        description: "server error"
                    }
                },
                security: [

                ]
            }
        },
        "/auth/logout": {
            post: {
                tags: ["users"],
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
                tags: ["users"],
                summary: "refresh token",
                description: "refresh token",
                operationId: "refreshToken",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [

                ],
                responses: {
                    409: {
                        description: "invalid token"
                    },
                    200: {
                        description: "refresh token successfully",
                        schema: {
                            name: "newAccessToken",
                            type: "string"
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
        "/user/": {
            get: {
                tags: ["admins"],
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
                            }
                        }
                    },
                    404: {
                        description: "no user found in database"
                    },
                    500: {
                        description: "server error"
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
                tags: ["admins", "users"],
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
                        description: "user not found"
                    },
                    500: {
                        description: "server error"
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
                tags: ["admins", "users"],
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
                        description: "user not found"
                    },
                    500: {
                        description: "server error"
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
                tags: ["users"],
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
                    },
                    404: {
                        description: "email not found"
                    },
                    500: {
                        description: "server error"
                    }
                },
                security: [

                ]
            },
        },
        "/user/change-password": {
            post: {
                tags: ["users"],
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
                    },
                    404: {
                        description: "User not found"
                    },
                    400: {
                        description: "password is incorrect"
                    },
                    500: {
                        description: "server error"
                    }
                },
            },
        }
    },
    securityDefinitions: {
        accessToken: {
            type: "apiKey",
            name: "accessToken",
            in: "Authorization",
        },
        accessTokenAdmin: {
            type: "apiKey",
            name: "accessToken",
            in: "Authorization",
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
                    type: "string"
                },
            }
        },
        user: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                },
                username: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                isAdmin: {
                    type: "boolean"
                }
            }
        }
    }
};
