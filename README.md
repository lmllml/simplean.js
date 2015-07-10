#Simplean.js
*language：[English](README.en-us.md)*
* 专注于移动端与高级浏览器
* 专注于DOM动画
* 专注于简单的特性，只提供三个API：to、addClass、removeClass

## 目录
- [快速开始](#quick-start)
- [所有API](#all-api)
  - Simplean#to(#api-to)
  - Simplean#addClass(#api-add-class)
  - Simplean#removeClass(#api-remove-class
- [BUG](#bug)

<a name="quick-start"></a>
## 快速开始
<a name="all-api"></a>
## 所有API
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

<a name="bug"></a>
## BUG
发一个issue，我们会快速响应。
