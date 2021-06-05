const _ = require("lodash");
const {
    Worker
} = require("worker_threads");
const csv = require('csvtojson');


const policyController = (app, mongoose, utils) => {
    const User = mongoose.model("User");
    const policyInfo = mongoose.model("policyInfo");

    const policyControl = {};

    policyControl.upLoadPolicy = async (req, res) => {
        try {

            const policyFilePath = req.files.datasheet[0].path;
            const Data = await dataParseCSV(policyFilePath);

            //Create new worker
            const worker = new Worker("./worker/worker.js", {
                workerData: {
                    data: Data,
                    policyFilePath: policyFilePath
                }
            });

            //Listen for a message from worker
            worker.once("message", result => {
                return res.status(200).send({
                    data: "UPLOADED"
                });
            });

            worker.on("error", error => {
                console.log(error);
            });

            worker.on("exit", exitCode => {
                console.log(exitCode);
            })
        } catch (e) {
            console.log(e);
            return res.status(500).send({
                message: "Server Error"
            });

        }
    }

    let dataParseCSV = async (policyFilePath) => {
        console.log("Filepath", policyFilePath);
        let policyList = await csv().fromFile(policyFilePath);
        return policyList;
    }

    policyControl.get = async (req, res) => {
        try {
            let matchQuery = {};
            let {
                skip = 0,
                    limit = 20,
                    search
            } = req.query

            if (search) {
                const regex = search.trim();

                const searchQuery = {
                    "$regex": regex,
                    "$options": "i"
                };
                matchQuery = {
                    firstName: searchQuery
                };
            }
            let aggregatePipe = [];

            const userLookup = {
                $lookup: {
                    from: "users",
                    pipeline: [{
                        $match: matchQuery
                    }, ],
                    as: "user"
                }
            };

            const userUnWind = {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            }

            aggregatePipe.push(userLookup);
            aggregatePipe.push(userUnWind);

            const agentLookup = {
                $lookup: {
                    from: "agents",
                    localField: "agent_id",
                    foreignField: "_id",
                    as: "agent"
                }
            };
            const agentUnWind = {
                $unwind: {
                    path: "$agent",
                    preserveNullAndEmptyArrays: true
                }
            };
            aggregatePipe.push(agentLookup);
            aggregatePipe.push(agentUnWind);

            const policycarrierLookup = {
                $lookup: {
                    from: "policycarriers",
                    localField: "Policycarrier_id",
                    foreignField: "_id",
                    as: "policycarrier"
                }
            };
            const policyCarrierUnWind = {
                $unwind: {
                    path: "$policycarrier",
                    preserveNullAndEmptyArrays: true
                }
            };
            aggregatePipe.push(policycarrierLookup);
            aggregatePipe.push(policyCarrierUnWind);

            const policyCategoryLookup = {
                $lookup: {
                    from: "policycategories",
                    localField: "Policycategory_id",
                    foreignField: "_id",
                    as: "policycategories"
                }
            };
            const policyCategoryUnWind = {
                $unwind: {
                    path: "$policycategories",
                    preserveNullAndEmptyArrays: true
                }
            };
            aggregatePipe.push(policyCategoryLookup);
            aggregatePipe.push(policyCategoryUnWind);

            const accountLookup = {
                $lookup: {
                    from: "accounts",
                    localField: "account_id",
                    foreignField: "_id",
                    as: "accounts"
                }
            };
            const accoundUnWind = {
                $unwind: {
                    path: "$accounts",
                    preserveNullAndEmptyArrays: true
                }
            };
            aggregatePipe.push(accountLookup);
            aggregatePipe.push(accoundUnWind);

            const project = {
                $project: {
                    "_id": 1,
                    "policy_number": 1,
                    "category_name": 1,
                    "start_date": 1,
                    "end_date": 1,
                    "premium_amount": 1,
                    "userName": "$user.firstName",
                    "email": "$user.email",
                    "gender": "$user.gender",
                    "address": "$user.address",
                    "userType": "$user.userType",
                    "zip": "$user.zip",
                    "state": "$user.state",
                    "phoneNumber": "$user.phoneNumber",
                    "agentName": "$agent.agent_name",
                    "policycarrier": "$policycarrier.company_name",
                    "policycategory": "$policycategories.category_name",
                    "account_name": "$accounts.account_name",
                    "account_type": "$accounts.account_type"
                }
            }
            aggregatePipe.push(project);
            const skipPipe = {
                $skip: parseInt(skip)
            };
            const limitPipe = {
                $limit: parseInt(limit)
            };
            aggregatePipe.push(skipPipe);
            aggregatePipe.push(limitPipe);
            const policy = await policyInfo.aggregate(aggregatePipe);
            return res.status(200).send({
                data: policy,
                status: 200
            });
        } catch (e) {
            console.error("policy getFunction", e);
            return res.status(500).send({
                Error: e,
                status: 500
            });
        }

    }
    return policyControl;
}

module.exports = policyController