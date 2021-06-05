const express = require("express");
const auth = require("../middleware/auth");
const policyRouter = express.Router();

const upload = require("../middleware/upload")
let policyUpload = upload.fields([{
    name: "datasheet",
    maxCount: 1
}]);
const Router = function (app, mongoose, utils, worker) {
    const policyController = require("../controller/policy")(app, mongoose, utils, worker)

    policyRouter.post("/upload", policyUpload, policyController.upLoadPolicy);
    /**
    * @api {post}/api/policy/upload UPLOAD POLICY
    * @apiName Upload Policy Data
    * @apiGroup Policy
    * @apiDescription Upload Policy Data.
    * @apiHeaderExample {json} Header-Example:
    {
        "Content-Type": "application/json"
    }
    *     
    *
    * @apiParam {String} name of the user<code>(Body Parameter)</code>
    *
    *
    * @apiParamExample {json} Request-Example:
    * POST http://<API_BASEPATH>/api/policy/upload
    * 
    {
        "datasheet":"file "

    }
    *
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    {
       {
         "data": "UPLOADED"
       }
    }
    *
    */
    policyRouter.get("/", policyController.get);
    /**
    * @api {get}/api/policy/  GET POLYCY DETAILS
    * @apiName policy get API
    * @apiGroup Policy
    * @apiDescription get policy Details
    * @apiHeaderExample {json} Header-Example:
    {
        "Content-Type": "application/json"
    }
    *     
    *
    * @apiParam {String} name of the user<code>(Query Parameter)</code>
    * 
    * @apiParamExample {json} Request-Example:
    * POST http://<API_BASEPATH>/api/policy/
    * @apiSuccessExample {json} Success-Response:
    * HTTP/1.1 200 OK
    {
        "data": [
            {
                "_id": "60bb87e203734d5d9e8acad0",
                "policy_number": "YEEX9MOIBU7X",
                "category_name": "Commercial Auto",
                "start_date": "2018-11-02T00:00:00.000Z",
                "end_date": "2019-11-02T00:00:00.000Z",
                "premium_amount": "1180.83",
                "userName": "Vergie Hardesty",
                "email": "killmenow@me.com",
                "gender": "",
                "address": "301 N Main St Ste 2100",
                "userType": "Active Client",
                "zip": "27101-3843",
                "state": "NC",
                "phoneNumber": "4183346713",
                "agentName": "Alex Watson",
                "policycarrier": "Integon Gen Ins Corp",
                "policycategory": "Commercial Auto",
                "account_name": "Lura Lucca & Owen Dodson",
                "account_type": "Commercial"
            },
            {
                "_id": "60bb87e203734d5d9e8acad1",
                "policy_number": "JRWJV5U5XWE4",
                "category_name": "Personal Auto",
                "start_date": "2018-12-31T00:00:00.000Z",
                "end_date": "2019-06-30T00:00:00.000Z",
                "premium_amount": "1323.63",
                "userName": "Vergie Hardesty",
                "email": "killmenow@me.com",
                "gender": "",
                "address": "301 N Main St Ste 2100",
                "userType": "Active Client",
                "zip": "27101-3843",
                "state": "NC",
                "phoneNumber": "4183346713",
                "agentName": "Alex Watson",
                "policycarrier": "Nationwide Prop & Cas Ins Co_Copy",
                "policycategory": "Personal Auto",
                "account_name": "Vergie Hardesty & Wilma Wong",
                "account_type": "Commercial"
            },
            {
                "_id": "60bb87e203734d5d9e8acad2",
                "policy_number": "7CZ3CLKWMSKH",
                "category_name": "Commercial Auto",
                "start_date": "2018-11-09T00:00:00.000Z",
                "end_date": "2019-11-09T00:00:00.000Z",
                "premium_amount": "2105.9",
                "userName": "Vergie Hardesty",
                "email": "killmenow@me.com",
                "gender": "",
                "address": "301 N Main St Ste 2100",
                "userType": "Active Client",
                "zip": "27101-3843",
                "state": "NC",
                "phoneNumber": "4183346713",
                "agentName": "Alex Watson",
                "policycarrier": "Integon Ind Corp",
                "policycategory": "Commercial Auto",
                "account_name": "Torie Buchanan & Glenda Ruiz",
                "account_type": "Commercial"
            },
            {
                "_id": "60bb87e203734d5d9e8acad3",
                "policy_number": "ZSB972578CRV",
                "category_name": "Commercial Auto",
                "start_date": "2018-11-09T00:00:00.000Z",
                "end_date": "2019-11-09T00:00:00.000Z",
                "premium_amount": "2105.9",
                "userName": "Vergie Hardesty",
                "email": "killmenow@me.com",
                "gender": "",
                "address": "301 N Main St Ste 2100",
                "userType": "Active Client",
                "zip": "27101-3843",
                "state": "NC",
                "phoneNumber": "4183346713",
                "agentName": "Alex Watson",
                "policycarrier": "Integon Ind Corp",
                "policycategory": "Commercial Auto",
                "account_name": "Sebastian Scarberry & Jonah Bishop",
                "account_type": "Commercial"
            }
        ],
        "status": 200
    }
    *
    */


    app.use("/api/policy", policyRouter);
}


module.exports = Router;