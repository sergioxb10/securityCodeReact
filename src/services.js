const axios = require('axios');

const ApiAWS = async(securityCode)=>{
    let response = "";
    
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'x-api-key': 'tCgHAZ2Qxl2R4kJFQnKnQ1oGNduzJx5u8F1jZQZq'
    }

    response = await axios.post(
        "https://vpwqw762g7.execute-api.us-east-1.amazonaws.com/default/primerlambda",
        {
            password:securityCode,
        },
        
    );

    return response;
}

export{ApiAWS}