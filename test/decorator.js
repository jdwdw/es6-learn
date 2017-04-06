import { expect, assert } from 'chai';
import 'babel-polyfill';

describe('Decorator test ', function() {
	describe('类的修饰 ', function() {
		it('类添加静态属性', function() {
			function testable(target) {
				target.isTestable = true;
			}

			@testable
			class MyTestableClass {}

			assert.isTrue(MyTestableClass.isTestable);

		})

		it('类添加静态属性-带参数', function() {
			function testable(isTestabel) {
				return function(target) {
					target.isTestable = isTestabel;
				}
			}

			@testable(true)
			class MyTestableClass {}
			assert.isTrue(MyTestableClass.isTestable);

			@testable(false)
			class MyClass {}
			assert.isFalse(MyClass.isTestable);

		})

		it('类添加动态属性', function() {
			function testable(target) {
				target.prototype.isTestable = true;
			}

			@testable
			class MyTestableClass {}

			let object = new MyTestableClass();
			assert.isTrue(object.isTestable);

		})
	})

	describe('方法的修饰 ', function() {
		it('修饰类方法', function() {
			class Person {
				@readonly
				name() {}
			}

			function readonly(target, name, descriptor) {
				descriptor.writable = false;
				return descriptor;
			}

			let descriptor={
				value: 'specifiedFunction',
				enumerable: false,
				configurable: true,
				writable: true
			};
			assert.isFalse(readonly(Person.prototype, 'name', descriptor).writable)

			
		})
	})
})