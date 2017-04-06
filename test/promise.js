import { expect, assert } from 'chai';

describe('promise test', function() {

	it('promise resolve', function(done) {
		let promiseArray=[];
		setTimeout(function(){
			promiseArray.push(3);
			assert.deepEqual(promiseArray,[1,2,3]);
			done();
		},0);
		Promise.resolve().then(function(){
			promiseArray.push(2);
		});
		promiseArray.push(1);
		
	})
})