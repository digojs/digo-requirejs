# digo-requirejs
[digo](https://github.com/digojs/digo) 插件：使用 [requirejs](https://github.com/jrburke/requirejs) 打包 AMD 模块。

## 安装
```bash
npm install digo-requirejs -g
```

## 用法
### 打包 AMD 模块
```js
digo.src("entry1.js", "entry2.js").pipe("digo-requirejs");
```

### 源映射(Source Map)
本插件支持生成源映射，详见 [源映射](https://github.com/digojs/digo/wiki/源映射)。

## 选项
```js
digo.src("entry1.js", "entry2.js").pipe("digo-requirejs", {
	baseUrl: "", 				// 模块基路径。*
	generateSourceMaps: false, 	// 是否生成源映射。
	paths: { }, 				// 定义各别名模块路径。
	shim: {}, 					// 手动指定模块。如 { backbone: { deps: ['underscore', 'jquery'], exports: 'Backbone' }}。
	bundles: {}, 				// 手动指定模块的加载项。
	map: {}, 					// 模块映射表。
	config: null, 				// 传递给模块的选项。
	enforceDefine: false, 		// 强制要求用法 define 定义模块。
	has: {}, 					// 定义全局常量。
	name: "", 					// 手动指定模块名。*
});
```

> *: 插件内部已重设了此选项的默认值。

另参考: http://requirejs.org/docs/api.html#config