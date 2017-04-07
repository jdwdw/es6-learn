基于webpack+mocha,利用单例测试来学习ES6的新特性

下载
----

```js
git clone https://github.com/jdwdw/es6-learn.git
cd es6learning
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
cnpm install webpack -g
cnpm install mocha -g
```

运行:
-----

```js
npm test
```

测试es6中的新特性：
-------------------

1.	[Proxy对象 代理器](./test/proxy.js)
2.	[Reflect对象](./test/reflect.js)
3.	[Promise 对象](./test/promise.js)
4.	[Generator对象](./test/generator.js)
5.  [Class对象](./test/class.js)



总结
----

```
ps: .gitignore的 创建用命令 vim .gitignore会乱码，可以使用 touch .gitignore
1. 部分功能Babel默认是没有支持的，必须使用babel-polyfill，为当前环境提供一个垫片。
2. babel的bug（不支持extends内建类型）
3. Decorator 修饰器是ES7的提案要babel默认没有支持，需要装插件   http://www.tuicool.com/articles/yemmmaq
```
