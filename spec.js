var spec =
{
    swagger: "2.0",
    info: {
        description:
            "eateria API",
        version: "1.0",
        title: "SE104 - eateria",
    },
    host: "https://se104-eateria.onrender.com",
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
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "username",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "email cho tài khoản mới"
                    },
                    {
                        "in": "formData",
                        "name": "email",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "email cho tài khoản mới"
                    },
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "password cho tài khoản mới"
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
                consumes: ["multipart/form-data"],
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
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "accessToken",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "accessToken in Bearer token in authorization header of request"

                    }
                ],
                responses: {
                    200: {
                        description: "logout successfully",
                    },
                },
                security: [

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
                    {
                        "in": "path",
                        "name": "accessToken",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "accessToken in Bearer token in authorization header of request"

                    }
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
                    {
                        "in": "path",
                        "name": "accessTokenAdmin",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "accessToken in Bearer token in authorization header of request and must be admin"
                    }
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
                    500: {
                        description: "server error"
                    }
                },
                security: [

                ]
            },
        },
        "/user/{id}": {
            get: {
                // tags both admin and user can use this api
                tags: ["admins", "users"],
                summary: "get user info",
                description: "get user info",
                operationId: "getUserInfo",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "accessTokenAdminOrCurrentUser",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "accessToken in Bearer token in authorization header of request and must be admin or user with id is the same as id in path"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "id of user"
                    }
                ],
                responses: {
                    200: {
                        description: "get user info successfully",
                        schema: {
                            $ref: "#/definitions/user"
                        }
                    },
                    500: {
                        description: "server error"
                    }
                },
                security: [
                    // bearer token in authorization header
                    {
                        api_key: []
                    }
                ]
            },
        },
    },
    securityDefinitions: {    // Thông tin về api key sử dụng để thực hiện request
        api_key: {
            type: "apiKey",      // Thuộc loại apsi key xác thực
            name: "api_key",     // Tên trường chứa api key xác thực
            in: "header",        // API key được để trong phần header của request
        }
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
