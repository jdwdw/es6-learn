import { expect, assert } from 'chai';
import 'babel-polyfill';

describe('proxy test', function() {

	it('proxy 多重拦截', function() {
		let handler = {
			get: function(target, name) {
				if(name === 'prototype') {
					return Object.prototype;
				}
				return name;
			},

			apply: function(targer, thisBinding, argument) {
				return argument[0];
			},

			construct: function(target, argument) {
				return { value: argument[1] };
			}
		};

		let proxy = new Proxy(function(firstArgument, secondArgument) {
			return firstArgument + secondArgument;
		}, handler);

		let firstArgument = 1;
		let secondArgument = 2;
		assert.equal(proxy(firstArgument, secondArgument), firstArgument);
		assert.deepEqual(new proxy(firstArgument, secondArgument), { value: secondArgument });
		assert.isTrue(proxy.prototype === Object.prototype);
		assert.equal(proxy.foo, 'foo');

		'x'.padStart(5, 'abx');
		'dd'.padStart(4, '11');
	});

	it('proxy 实现链式操作', function() {
		let functions = { //代替window
			double: n => n * 2,
			pow: n => n * n,
			reverseInt: n => n.toString().split("").reverse().join("") | 0
		};

		let pipe = (function() {
			return function(value) {
				let functionStack = [];
				let proxy = new Proxy({}, {
					get: function(pipeObject, functionName) {
						if(functionName === 'get') {
							return functionStack.reduce(function(valueInside, functionInside) {
								return functionInside(valueInside);
							}, value);
						}
						functionStack.push(functions[functionName]);
						return proxy;
					}
				});
				return proxy;
			}
		}());

		let equal = pipe(3).double.pow.reverseInt.get;
		assert.equal(equal, 63)

	});

	it('proxy apply拦截', function() {
		let twice = {
			apply() {
				return Reflect.apply(...arguments) * 2;
			}
		};

		function sum(left, right) {
			return left + right;
		};

		let proxy = new Proxy(sum, twice);
		assert.equal(proxy(1, 2), 6);
		assert.equal(proxy.call(null, 5, 6), 22);
		assert.equal(proxy.apply(null, [7, 8]), 30);

	});

	it('proxy ownKeys拦截自身属性的读取操作', function() {
		let target = {
			_bar: 'foo',
			_prop: 'bar',
			prop: 'baz',
		};

		let handler = {
			ownKeys(target) {
				return Reflect.ownKeys(target).filter(key => key[0] !== '_');
			}
		};

		let values = [];
		let proxy = new Proxy(target, handler);
		for(let key of Object.keys(proxy)) {
			values.push(target[key]);
		};

		assert.deepEqual(values, ['baz'])
	});

	it('Proxy.revocabel() 取消Proxy', function() {
		let foo = 'foo';
		let target = {};
		let handler = {};
		let { proxy, revoke } = Proxy.revocable(target, handler);
		proxy.foo = 'foo';
		assert.equal(proxy.foo, 'foo');

		revoke();
		try {
			expect(proxy.foo).to.equal('foo');
			assert.fail();
		} catch(error) {
			if(error instanceof TypeError) {

			} else {
				throw error
			}
		}
	});

	it('proxy 目标内部this会指向Proxy代理', function() {
		const target = {
			testThis: function() {
				return this === proxy;
			},
		}
		const handler = {};
		const proxy = new Proxy(target, handler);
		assert.isFalse(target.testThis())
		assert.isTrue(proxy.testThis());

		const targetBind = new Date('2013-01-01');
		const handlerBind = {
			get(target,property) {
				if(prop ==='getDate'){
					return targetBind.getDate.bind(target);
				}
				return Reflect.get(target,property);
			},
		};

		const proxyBind = new Proxy(targetBind, handlerBind);
		assert.equal(targetBind.getDate(),1);

	});
	
//	it('proxy 实现Web服务的客户端', function() {
//		function createWebService(baseUrl){
//			return new Proxy({},{
//				get(target,propertyKey,receiver){
//					return ()=>httpGet(baseUrl+'/'+propertyKey);
//				}
//			})
//		}
//		
//			const service =createWebService('http://example.com/data');
//			service.employees().then(json=>{
//				const employees=JSON.parse(json);
//			})
//	});
});