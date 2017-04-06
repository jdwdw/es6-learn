import { expect, assert } from 'chai';
import 'babel-polyfill';

describe('Generator test', function() {

	it('generator 部署Object Iterator接口 ', function() {
		let testObject = {};

		function* interEntries(object) {
			let keys = Object.keys(object);
			for(let index = 0; index < keys.length; index++) {
				let key = keys[index];
				yield [key, object[key]];
			}
		}
		let myObject = { left: 3, right: 7 };

		for(let [key, value] of interEntries(myObject)) {
			let newObject = {
				[key]: value
			};
			Object.assign(testObject, newObject);
		}
		assert.deepEqual(testObject, myObject);
	})

	it('generator 部署Array Iterator接口 ', function() {
		function* makeSimpleGenerator(array) {
			let nextIndex = 0;
			while(nextIndex < array.length) {
				yield array[nextIndex++];
			}
		}

		let generator = makeSimpleGenerator([0, 1]);
		assert.equal(generator.next().value, 0);
		assert.equal(generator.next().value, 1);
		assert.isTrue(generator.next().done);
	})

	it('async ', function() {


	})

})