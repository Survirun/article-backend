const CUSTOM_ERROR = {
    USER_NOT_FOUND: { status: 404, message: "user not found" },
    WRONG_ARGS: { status: 400,  message: "wrong argument(s)"},
    INTERNAL_SERVER_ERROR: { status: 500, message: "internal server error"},
    ALREADY_FULL_BAGS: { status: 400, message: "bags is already full"}

};


Object.freeze(CUSTOM_ERROR)


class CustomError extends Error {
    status;
    message;
    constructor(CUSTOM_ERROR: any) {
        super(CUSTOM_ERROR.message)
        this.message = CUSTOM_ERROR.message
        this.status = CUSTOM_ERROR.status

    
    }
}

export {
    CustomError,
    CUSTOM_ERROR
}