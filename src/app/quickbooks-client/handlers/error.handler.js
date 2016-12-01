'use strict'

import xml2js from 'xml2js'

const xmlParser = xml2js.parseString


/**
 * Transform Quickbooks Error to HTTP Standards Errors
 */
class ErrorHandler {
    constructor(statusCode, error){
        let tmp = createErrorMessage(statusCode, error)
        this._message = tmp.message
        this._code = tmp.code
        this._type = tmp.type
    }

    get message () {
        return this._message
    }

    get code () {
        return this._code
    }

    get type () {
        return this._type
    }
}

module.exports = ErrorHandler

const JSON_FORMAT = 'JSON'
const XML_FORMAT = 'XML'

const QUICKBOOKS_ERROR_TYPE = [
    {
        type: 'ValidationFault',
        code: 400
    },
    {
        type: 'SystemFault',
        code: 500
    },
    {
        type: 'AuthenticationFault',
        code: 401
    },
    {
        type: 'AuthorizationFault',
        code: 403
    }
]


function identifyErrorFormatType (statusCode, error){

    if (statusCode === 200 && !error.Fault) {
        return XML_FORMAT
    }
    return JSON_FORMAT
}

function createErrorMessage (statusCode, error) {
    let errMessage = {
        code: null,
        message: null,
        type: null
    };

    if ( identifyErrorFormatType(statusCode, error) === JSON_FORMAT) {

        const errorIndex = arrayObjectIndexOf(QUICKBOOKS_ERROR_TYPE, error.Fault.type, 'type')

        if ( errorIndex  === -1){
            errMessage = {code: 500, message: error.Fault.Error, type: error.Fault.type}
        } else {
            errMessage =  {code: QUICKBOOKS_ERROR_TYPE[errorIndex].code, message:error.Fault.Error, type: QUICKBOOKS_ERROR_TYPE[errorIndex].type}
        }
    } else {
         xmlParser(error, function (err, result){
            if (err){
                return errMessage = {code: 500, message: 'XML parsing failed', type:'NodeClient SystemFault'}
            }

            const faults = result.IntuitResponse.Fault

            for (let i = 0; i < faults.length; i++){
                if (faults[i].$) {

                    const errorIndex = arrayObjectIndexOf(QUICKBOOKS_ERROR_TYPE, faults[i].$.type, 'type')

                    if (errorIndex !== -1){
                        errMessage = { code: QUICKBOOKS_ERROR_TYPE[errorIndex].code, type: QUICKBOOKS_ERROR_TYPE[errorIndex].type }
                    } else {
                        errMessage.type = faults[i].$.type
                    }

                }
                if (faults[i].Error) {
                    const quickbooksErrors = faults[i].Error
                    for (let y = 0 ; y < quickbooksErrors.length ; y++) {
                        if ( quickbooksErrors[y].Message ) {
                            errMessage = messageXMLDecoder(quickbooksErrors[y].Message[0])
                            errMessage.type = faults[i].$.type
                        }
                    }
                }
            }
        })
    }

    return errMessage
}

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

/**
 * input type example: [ 'message=ApplicationAuthenticationFailed; errorCode=003200; statusCode=401' ]
 * @param string
 */
function messageXMLDecoder (string) {

    let i = 0
    let message = '', code = '', errorCode = ''

    let attr = false, prop = true, countProp = 0

    while ( i !== string.length ){
        
        if ( string.charAt(i) === '='){
            attr = true
            prop = false
            i++ //escape the space
        }
        if ( string.charAt(i) === ';' ){
            attr = false
            prop = true
            countProp++
        }
        if ( attr && countProp === 0 ){
            message = message+string.charAt(i)
        }
        if ( attr && countProp === 1 ){
            errorCode = errorCode+string.charAt(i)
        }
        if ( attr && countProp === 2 ){
            code = code+string.charAt(i)
        }
        i++
    }

    code = +code

    return {code , message}
}