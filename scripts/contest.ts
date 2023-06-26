import { RecordModel } from 'hydrooj';

export async function run({cid}, report: Function) {
	
	const records = RecordModel.coll.find(pid == -111 ? {} : {pid: pid}, {_id: true,domainId: true, pid: true});
	records.forEach((record) => {
		if (record.pid != -1) {
			report({message: record._id.toString()});
			RecordModel.reset(record.domainId, record._id, true);
			RecordModel.judge(record.domainId, record._id);
		}
	});
}
