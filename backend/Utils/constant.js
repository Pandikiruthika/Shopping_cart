const reqData=(data)=>{
    const req={
        ...data.params,
        ...data.query,
        ...data.body,
        ...data.formdata
        

    }
    return req
}

const generateOtp=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}
module.exports={
    reqData,
    generateOtp
}
