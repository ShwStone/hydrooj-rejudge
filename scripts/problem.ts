import { RecordDoc, RecordModel } from 'hydrooj';

export async function run({pid, contest}, report: Function) {
	let filter = {};
	
	if (pid && contest) filter = { pid: pid, contest: contest };
	else if (pid) filter = { pid: pid };
	else if (contest) filter = { contest: contest };
	else filter = {};

	const records = await RecordModel.coll.find(filter, { _id: true, domainId: true, pid: true });

	for await (const record of records) {
		if (record.pid != -1) {
			try {
				await RecordModel.reset(record.domainId, record._id, true);
			} catch(e) {
				report({ message: e });
				continue;
			}

			try {
				await RecordModel.judge(record.domainId, record._id);
			} catch(e) {
				report({ message: e });
				continue;
			}

			report({ message: record._id.toString() + " finished."});
		}
	}
}
