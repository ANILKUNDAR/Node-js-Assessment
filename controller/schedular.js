const cron = require('node-cron');
const schedularControl = (app, mongoose, utils) => {
    const collectionOne = mongoose.model("collectionOne");
    const collectionTwo = mongoose.model("collectionTwo");
    const schedularControl = {};
    schedularControl.scheduler = function ({
        _id,
        scheduledAt,
    } = {}) {
        scheduledAt = new Date(scheduledAt);
        let schedulePattern = `${scheduledAt.getSeconds()} ${scheduledAt.getMinutes()} ${scheduledAt.getHours()} ${scheduledAt.getDate()} ${scheduledAt.getMonth() + 1} *`;
        console.log("scheduleAt", scheduledAt, "schedulePattern", schedulePattern);
        var cronJobFunc = async () => {
            try {
                let job = await collectionOne.findOne({
                    _id,
                    isActive: true
                });
                if (!job) throw ({
                    msg: "JOB_HAS_BEEN_REMOVED"
                })
                let {
                    message,
                    scheduledAt
                } = job;
                await collectionTwo.create({
                    message: message,
                    scheduledAt: scheduledAt
                })
                await collectionOne.updateOne({
                    _id: job._id
                }, {
                    $set: {
                        isActive: false
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
        if (scheduledAt < new Date()) cronJobFunc;
        else {
            var cronJob = cron.schedule(schedulePattern, () => {
                cronJobFunc()
                cronJob.destroy();
                cronJob = null;
            })
        }
    }

    schedularControl.schedule = async (req, res) => {
        try {
            let {
                message,
                date
            } = req.body;
            let job = await collectionOne.create({
                message: message,
                scheduledAt: new Date(new Date().setMinutes(new Date().getMinutes() + 1))
            })
            console.log("JOB SCHEDULED", job);
            schedularControl.scheduler(job)
            return res.status(200).send({
                data: "collection one added"
            });

        } catch (e) {
            console.error(e)
            return res.status(500).send({
                message: "Server Error"
            });
        }

    }


    return schedularControl;
}

module.exports = schedularControl