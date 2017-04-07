import { expect, assert } from 'chai';
import 'babel-polyfill';

describe('String test', function() {
	describe('String 模版字符串', function() {
		it('string ', function() {
			let one='1';
			let two='2';
			
			let testString=`${one}${two}`;
			assert.equal(testString,'12');
		})
	})
})