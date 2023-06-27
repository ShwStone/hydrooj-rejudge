import { definePlugin, Context, Schema } from 'hydrooj';

//require('./scripts/contest').run({cid:'649910d8a8d15a7844440a2e'})

export default definePlugin({
	apply(ctx: Context) {
		ctx.addScript(
			'rejudgeProblem', 'rejudge for a certain problem',
			Schema.object({
				pid: Schema.number(),
				contest: Schema.string()
			}),
			(...args) => require('./scripts/problem').run(...args)
		);
		ctx.i18n.load('zh', {
			'rejudge for a certain problem': '重测一道题目的所有提交'
		});
	}
});

