# Simplean.js 0.0.5

[![npm](https://img.shields.io/badge/npm-0.0.5-orange.svg)](https://www.npmjs.com/package/simplean.js)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/liyandalmllml/simplean.js/blob/dev/LICENSE)

## Contents
- [Overview](#introduce)
- [Quick start](#quick-start)
- [API](#all-api)
  - [Simplean#to](#api-to)
  - [Simplean#addClass](#api-add-class)
  - [Simplean#removeClass](#api-remove-class)
- [jQuery or Zepto](#jq)
- [Compatibility](#compatibility)
- [BUG](#bug)
- [Changelog](#changeLog)
- [LICENSE](#license)

<a name="introduce"></a>
## Overview
* Focus on mobile browser and advanced browser
* Focus on dom animation
* Only provide three api: to, addClass, removeClass

<a name="quick-start"></a>
## Quick start
1. 下载simplean.js文件到项目中

2. 页面中引入simplean.js脚本

    `<script type="text/javascript" src="***/simplean.js"></script>`

3. 初始化Simplean实例
    
    ```
    var dom = document.querySelector('div.animation');
    var sp = Simplean(dom);
    ```

4. 配置你想要的动画效果
 ```
  sp.to({
    width: '200px',
    height: '200px',
    border-radius: '50px'
  });
 ```

<a name="all-api"></a>

## API

<a name="api-to"></a>
### Simplean#to(styles[, options])
````
    Simplean(dom).to({
        width: 200px;
        background-color: red;
    });
````
````
    Simplean(dom).to({
        height: 200px;
        border-radius: 50px;
    }, {
        ease: 'ease-out'
    });
````

<a name="api-add-class"></a>
### Simplean#addClass(classNames[, options])
````
    .highlight {
        color: red;
        background: blue;
    }

    Simplean(dom).addClass('highlight', {
        ease: 'ease-in-out',
        onStart: function () {
            console.log('I will be highlight');
        },
        onStop: function () {
            console.log('I\'m be highlight');
        }
    });
````

<a name="api-remove-class"></a>
### Simplean#removeClass(classNames[, options])
````
    .rotate-30 {
        transform: rotate(30deg)
    }

    Simplean(dom).removeClass('rotate-30', {
        ease: 'ease-in',
    });
````

<a name="jq"></a>
## jQuery or Zepto
如果你的项目中有jQuery或者Zepto，Simplean会自动提供相应插件，插件注册anTo、anAddClass、anRemoveClass三个API，分别与to、addClass、removeClass相对应，简单示例:
````
    .rotate-30 {
        transform: rotate(30deg)
    }

    $(dom).anRemoveClass('rotate-30', {
        ease: 'ease-in',
    });
````

如果$(dom)是一个列表，那么会遍历列表中所有元素来调用相应API。
<a name="compatibility"></a>

## Compatibility
Support IOS6.0+、Android4.0+。

<a name="bug"></a>
## BUG
Post a issue and we will deal with immediately.

<a name="changeLog"></a>
## Changelog
[show detail](http://liyandalmllml.github.io/simplean.js)

<a name="license"></a>
## LICENSE
MIT

