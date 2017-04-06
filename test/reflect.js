import { expect, assert } from 'chai';

describe('reflect test', function() {

	it('reflect get', function() {
		let myObject = {
			left: 1,
			right: 2,
			get plus() {
				return this.left + this.right;
			},
		}

		assert.equal(Reflect.get(myObject, 'left'), 1);
		assert.equal(Reflect.get(myObject, 'right'), 2);
		assert.equal(Reflect.get(myObject, 'plus'), 3);

		let myReceiverObject = {
			left: 3,
			right: 3,
		};
		assert.equal(Reflect.get(myObject, 'plus', myReceiverObject), 6);

	})

	it('reflect set', function() {
		let myObject = {
			left: 1,
			right: 2,
			set changeRight(value) {
				return this.right = value;
			},
		}

		assert.equal(myObject.left, 1);
		Reflect.set(myObject, 'left', 2);
		assert.equal(myObject.left, 2);

		let myReceiverObject = {
			right: 0,
		};

		Reflect.set(myObject, 'right', 1, myReceiverObject);
		assert.equal(myObject.right, 2);
		assert.equal(myReceiverObject.right, 1);
	})

	it('Reflect.apply ', function() {
		const ages = [11, 33, 12, 54, 18, 96];

		const youngest = Reflect.apply(Math.min, Math, ages);
		assert.equal(youngest, 11);
		const oldset = Reflect.apply(Math.max, Math, ages);
		assert.equal(oldset, 96);
		const type = Reflect.apply(Object.prototype.toString, youngest, []);
		assert.equal(type, '[object Number]');
	})

	it('Reflect.ownKeys ', function() {
		let myObject = {
			left: 1,
			right: 2,
			[Symbol.for('top')]: 3,
			[Symbol.for('bottom')]: 4,
		};

		assert.equal(Object.getOwnPropertyNames(myObject).length, 2);
		assert.equal(Object.getOwnPropertySymbols(myObject).length, 2);
		assert.equal(Reflect.ownKeys(myObject).length, 4);

	})

	it('Reflect 与Proxy 配合使用实现观察者模式',function() {
		
		let times=0;
		const queuedObservers = new Set();
	
		const observe=_function => queuedObservers.add(_function);
		const observable= _object => new Proxy(_object,{set});
		function set(target,key,value,receiver){
			const result =Reflect.set(target,key,value,receiver);
			queuedObservers.forEach(observe=>observe());
			return result;
		}
		
		const person=observable({
			change:false,
			changeOther:true,
		});
		
		function addProxy(){
			times++;
		}
		observe(addProxy);
		person.change=true;
		assert.equal(times,1);
		assert.isTrue(person.change);
		person.changeOther=false;
		person.change=true;
		person.change=false;
		assert.equal(times,4);
		assert.isFalse(person.change);
		assert.isFalse(person.changeOther);
	})

})