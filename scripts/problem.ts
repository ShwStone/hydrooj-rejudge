import { Schema, RecordModel, problem } from 'hydrooj';
import { ObjectId } from 'mongodb';

export async function run({pid, contest}, report: Function) {
	let filter = Schema.object();
	
	if (pid && contest) filter = Schema.object({ pid: pid, contest: ObjectId(contest) });
	else if (pid) filter = Schema.object({ pid: pid });
	else if (contest) filter = Schema.object({ contest: ObjectId(contest) });
	else filter = Schema.object();

	const records = await RecordModel.coll.find(filter, { _id: true, domainId: true, pid: true });

	for await (const record of records) {
		if (record.pid != -1) {
			try {
				await RecordModel.reset(record.domainId, record._id, true);
			} catch(e) {
				report({ message: e });
				continue;
			}
			
			const isContest = record.contest && record.contest.toString() !== '000000000000000000000000';

			try {
				await RecordModel.judge(record.domainId, record._id, -20, isContest ? { detail: false } : {});
			} catch(e) {
				report({ message: e });
				continue;
			}

			report({ message: record._id.toString() + " finished."});
		}
	}
}
