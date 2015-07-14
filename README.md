#Simplean.js
*language：[English](README.en-us.md)*

## 目录
- [简介](#introduce)
- [快速开始](#quick-start)
- [API](#all-api)
  - [Simplean#to](#api-to)
  - [Simplean#addClass](#api-add-class)
  - [Simplean#removeClass](#api-remove-class)
- [兼容性](#compatibility)
- [BUG](#bug)

<a name="introduce"></a>
## 简介
* 专注于移动端与高级浏览器
* 专注于DOM动画
* 专注于简单的特性，只提供三个API：to、addClass、removeClass

<a name="quick-start"></a>
## 快速开始
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
<a name="compatability"></a>
## 兼容性
支持IOS6.0+、Android4.0+。

<a name="bug"></a>
## BUG
发一个issue，我们会快速响应。
