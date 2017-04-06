import { expect, assert } from 'chai';
import 'babel-polyfill';

describe('Class test', function() {
	class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		getPosition() {
			return { x: this.x, y: this.y };
		}
	};

	class ColorPoint extends Point {
		constructor(x, y, color) {
			super(x, y);
			this.color = color;
		}

		getPosition() {
			return { x: this.x, y: this.y, color: this.color };
		}
	};

	it('class 用Symbol实现私有方法', function() {
		const priviteFunction = Symbol('privite');
		const priviteArgument = Symbol('priviteArgument');

		class MyClass {
			publiceFunction(testArgument) {
				this[priviteFunction](testArgument);
			}

			[priviteFunction](testArgument) {
				return this[priviteArgument] = testArgument;
			}

			getPriviteArgument() {
				return this[priviteArgument];
			}
		};

		let testClass = new MyClass();
		testClass.publiceFunction(1);
		assert.equal(testClass[priviteArgument], 1);

		try {
			testClass.priviteArgument(2)
			assert.fail();
		} catch(error) {
			if(error instanceof TypeError) {

			} else {
				throw error
			}
		}

		testClass.priviteArgument = 3;
		assert.equal(testClass.getPriviteArgument(), 1);

	})

	it('class 继承的实现', function() {

		let colorPoint = new ColorPoint(1, 2, 'red');
		assert.deepEqual(colorPoint.getPosition(), { x: 1, y: 2, color: 'red' });

		assert.isTrue(colorPoint instanceof ColorPoint);
		assert.isTrue(colorPoint instanceof Point);
	})

	it('class 的prototype属性和__proto__属性', function() {
		class Parent {

		};

		class Child extends Parent {

		};

		assert.isTrue(Child.__proto__ === Parent);
		assert.isTrue(Child.prototype.__proto__ === Parent.prototype)
	})

	it('class super作为对象时,用在静态方法时super指向父类而不是父类原型对象', function() {
		class Parent {
			static method() {
				return false;
			}

			method() {
				return true;
			}
		};

		class Child extends Parent {
			static method() {
				return super.method();
			}

			method() {
				return super.method();
			}
		};

		assert.isFalse(Child.method());
		let child = new Child();
		assert.isTrue(child.method())
	})

	it('class实例的__proto__属性', function() {
		let point = new Point(1, 2);
		let colorPoint = new ColorPoint(1, 2, 'red');

		assert.isFalse(colorPoint.__proto__ === point.__proto__);
		assert.isTrue(colorPoint.__proto__.__proto__ === point.__proto__);
	})

		it('原生构造函数的继承', function() {
			class VersionedArray extends Array {
				constructor() {
					super();
					this.history = [
						[]
					];
				}
				
	
				commit() {
					this.history.push(this.slice());
				}
	
				revert() {
					this.splice(0, this.length, ...this.history[this.history.length - 1]);
				}
				
			}
	
			let newArray = new VersionedArray();
			newArray.push(0);
			newArray.push(1);
			//assert.equal(newArray.length, 2);
			//console.log(newArray['commit'])
			console.log(newArray.commit)
			newArray.commit();
			newArray.push(3);
			newArray
			//assert.equal(newArray.length, 3);
	
		})

	it('class getter 和setter', function() {
		class MyClass {
			constructor(count) {
				this.count = count;
			}

			get countNumber() {
				return this.count;
			}

			set countNumber(count) {
				this.count = count;
			}

			getNumber() {

			}
		}

		let myObject = new MyClass(0);
		assert.equal(myObject.countNumber, 0);
		myObject.countNumber = 2;
		assert.equal(myObject.countNumber, 2);

	})

//	it('class 的Generator方法', function() {
//		class MyClass{
//			constructor(...inputArguments){
//				this.inputArguments=inputArguments;
//			}
//			
//			*[]
//		}
//
//	})
})