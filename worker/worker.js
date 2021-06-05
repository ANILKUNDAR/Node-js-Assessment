const {
    parentPort,
    workerData
} = require("worker_threads");
const fs = require('fs');
const mongoose = require("mongoose");
require("../config/db")();
const User = require("../models/user/schema")(mongoose);
const Agent = require("../models/agent/schema")(mongoose);
const Account = require("../models/account/schema")(mongoose);
const policycarrier = require("../models/policyCarrier/schema")(mongoose);
const policycategory = require("../models/policyCategory/schema")(mongoose);
const policyInfo = require("../models/policyInfo /schema")(mongoose);
parentPort.postMessage(upLoadPolicyFunc(workerData));

async function addOrUpdatePolicyInfo(policyData, user, policyCarrier, Policycategory, agent, account) {
    try {
        let {
            policy_number,
            category_name,
            policy_start_date,
            policy_end_date,
            premium_amount
        } = policyData;
        let policyInfoData;
        let policyObj = {};
        let data;
        policyObj.policy_number = policy_number;
        policyObj.category_name = category_name;
        policyObj.start_date = policy_start_date;
        policyObj.end_date = policy_end_date;
        policyObj.premium_amount = premium_amount;
        policyObj.user_id = user;
        policyObj.Policycarrier_id = policyCarrier;
        policyObj.Policycategory_id = Policycategory;
        policyObj.agent_id = agent;
        policyObj.account_id = account;

        policyInfoData = await policyInfo.findOne({
            "policy_number": policy_number,
            "user_id": user
        })

        let type = policyInfoData ? 'update' : 'add'
        if (type == 'add') {
            const policy = new policyInfo(policyObj);
            data = await policy.save();
        }
        console.log(data);
        return data;
    } catch (e) {
        console.error(e)
    }
}
async function addOrUpdatePolicyCategory({
    category_name
}) {
    try {
        let policyCategoryData;
        let policyCategoryObj = {};
        let data;
        policyCategoryData = await policycategory.findOne({
            "category_name": category_name
        })
        policyCategoryObj.category_name = category_name;

        let type = policyCategoryData ? 'update' : 'add'
        if (type == 'add') {
            const category = new policycategory(policyCategoryObj);
            data = await category.save();
        } else {
            data = await policycategory.findOneAndUpdate({
                "category_name": category_name
            }, policyCategoryObj, {
                new: true
            });
        }
        console.log(data);
        return data;
    } catch (e) {
        console.error(e)
    }
}
async function addOrUpdatePolicyCarrier({
    company_name
}) {
    try {
        let policyCarrierData;
        let policyCarrierObj = {};
        let data;
        policyCarrierData = await policycarrier.findOne({
            "company_name": company_name
        })
        policyCarrierObj.company_name = company_name;

        let type = policyCarrierData ? 'update' : 'add'
        if (type == 'add') {
            const carrier = new policycarrier(policyCarrierObj);
            data = await carrier.save();
        } else {
            data = await policycarrier.findOneAndUpdate({
                "company_name": company_name
            }, policyCarrierObj, {
                new: true
            });
        }
        console.log(data);
        return data;
    } catch (e) {
        console.error(e)
    }
}
async function addOrUpdateAccount({
    account_type,
    account_name
}) {
    try {
        let accountData;
        let accountObj = {};
        let data;
        accountData = await Account.findOne({
            "account_type": account_type,
            "account_name": account_name
        })
        accountObj.account_name = account_name;
        accountObj.account_type = account_type;

        let type = accountData ? 'update' : 'add'
        if (type == 'add') {
            const account = new Account(accountObj);
            data = await account.save();
        } else {
            data = await Account.findOneAndUpdate({
                "account_type": account_type,
                "account_name": account_name
            }, accountObj, {
                new: true
            });
        }
        console.log(data);
        return data;
    } catch (e) {
        console.error(e)
    }
}
async function addOrUpdateAgent({
    agent
}) {
    try {
        let agentData;
        let agentObj = {};
        let data;
        agentData = await Agent.findOne({
            "agent_name": agent
        })
        agentObj.agent_name = agent;

        let type = agentData ? 'update' : 'add'
        if (type == 'add') {
            const agent = new Agent(agentObj);
            data = await agent.save();
        } else {
            data = await Agent.findOneAndUpdate({
                "agent_name": agent
            }, agentObj, {
                new: true
            });
        }
        console.log(data);
        return data;
    } catch (e) {
        console.error(e)
    }
}

async function addOrUpdateUserAsync({
    firstname,
    email,
    gender,
    dob,
    address,
    userType,
    zip,
    state,
    phone
}) {
    try {

        let userData;
        let userObj = {};
        let data;
        userData = await User.findOne({
            "phoneNumber": phone
        })
        userObj.firstName = firstname;
        userObj.email = email;
        userObj.gender = gender;
        userObj.dob = dob;
        userObj.address = address;
        userObj.userType = userType;
        userObj.zip = zip;
        userObj.state = state;
        userObj.phoneNumber = phone;
        let type = userData ? 'update' : 'add'
        if (type == 'add') {
            const user = new User(userObj);
            data = await user.save();
        } else {
            data = await User.findOneAndUpdate({
                phoneNumber: phone
            }, userObj, {
                new: true
            });
        }
        console.log(data);
        return data;
    } catch (e) {
        console.error(e)
    }
}

async function createPloicy(policy) {
    console.log(policy);
    try {
        let User = await addOrUpdateUserAsync(policy);
        let Agent = await addOrUpdateAgent(policy);
        let Account = await addOrUpdateAccount(policy);
        let policyCarrier = await addOrUpdatePolicyCarrier(policy);
        let policyCategory = await addOrUpdatePolicyCategory(policy);
        let policyInfo = await addOrUpdatePolicyInfo(policy, User._id, policyCarrier._id, policyCategory._id, Agent._id, Account._id);
    } catch (e) {
        console.error(e)
    }

}

function upLoadPolicyFunc(policyData) {
    const {
        data,
        policyFilePath
    } = policyData;

    var i = 0;
    do {
        createPloicy(data[i])
        i++;
    }
    while (i <= 3) { //data.length - 1
        console.log("remove Path");
        fs.unlinkSync(policyFilePath);

    }

}