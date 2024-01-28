import { Response} from 'express';

const commonResponse = (isSuccess: boolean, data: any = null) => {
    return isSuccess ? {status: isSuccess, data: data} : {status: isSuccess, error: data}
}

export default {
    fail: (res: Response, statusCode: number, errMsg: string) => {
        console.log(statusCode)
        console.log(errMsg)
        return res.status(statusCode).json(commonResponse(false, errMsg))
    },
    success: (res: Response, statusCode: number, data: any) => {
        if(data) {
            return res.status(statusCode).json(commonResponse(true, data))
        } else {
            return res.status(statusCode).json(commonResponse(true, null))
        }


    }
}