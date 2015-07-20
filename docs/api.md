# API

## .to(styles[, options])

    // 在300ms内将dom的宽度平滑变换为200px，背景颜色平滑变换为红色。
    // 变换函数(transitionTimingFunction)为'linear'
    var dom = document.querySelector(selector);

    Simplean(dom).to({
        width: 200px;
        background-color: red;
    });

    // 在300ms内将dom的高度平滑变换为200px，圆角平滑变换为50px。
    // 变换函数(transitionTimingFunction)为'ease-out'(先快后慢)
    var dom = document.querySelector(selector);

    Simplean(dom).to({
        height: 200px;
        border-radius: 50px;
    }, {
        ease: 'ease-out'
    });

#### OPTIONS

OPTIONS支持5个参数，分别为 *delay*、*duration*、*ease*、*onStart*、 *onStop*

**delay**

支持类型: *string*、*number*

设置动画延迟多长时间开始执行，默认值为0ms。

参数为*string*类型:

```
{
    delay: '200ms' // 200ms
}
{
    delay: '3s' // 3s
}
```

参数为*int*类型：

```
{
    delay: 200 // 200ms
}
{
    delay: 3000 // 3000ms
}
```

** duration **

支持类型: *string*、*number*

设置动画执行时长，默认值为300ms。

参数为*string*类型:

```
{
    duration: '500ms' // 500ms
}
{
    duration: '4s' // 4s
}
```

参数为*int*类型:

```
{
    duration: 500 // 500ms
}
{
    duration: 4000 // 4000ms
}
```


** ease **

支持类型：*string*

设置动画的变换曲线函数，对应于transitionTimingFunction。

支持*linear*、*ease-in*、*ease-out*、*ease-in-out*、*cubic-bezier*，默认值为*linear*。

```
{
    delay: 200, // 动画延迟200ms执行
    duration: 300, // 动画执行300ms
    ease: 'linear' // 动画线性变换
}
```
```
{
    delay: 500, // 动画延迟500ms执行
    duration: 500, // 动画执行500ms
    ease: 'cubic-bezier(.17, .67, .83, .67)' // 动画以cubic-bezier(.17, .67, .83, .57)生成的贝塞尔曲线来执行
}
```

** onStart([elem]) **

支持类型： *function*

在动画开始前被调用，开始前还包含动画的延迟时间(delay)，接受一个参数elem，即运行这个动画的DOM元素， this为Simplean(elem)。
```
{
    delay: 200, // 动画延迟200ms执行
    duration: 300, // 动画执行300ms
    ease: 'ease-in', // 动画先快后慢
    onStart: function (elem) {
        // 在动画开始运行前调用
        console.log(elem); // elem为执行这个动画的dom元素
        console.log(this); // this为这个dom元素的Simplean实例，即Simplean(dom)
    }
}
```

** onStop([elem]) **

在动画运行结束之后被调用，接受一个参数elem，即运行这个动画的DOM元素， this为Simplean(elem)。
```
{
    delay: 200, // 动画延迟200ms执行
    duration: 300, // 动画执行300ms
    ease: 'ease-in', // 动画先快后慢
    onStop: function (elem) {
        // 在动画执行结束后调用
        console.log(elem); // elem为执行这个动画的dom元素
        console.log(this); // this为这个dom元素的Simplean实例，即Simplean(dom)
    }
}
```


## .addClass(classNames[, options])]

    .highlight {
        color: red;
        background: blue;
    }

    var dom = document.querySelector(selector);
    Simplean(dom).addClass('highlight', {
        ease: 'ease-in-out',
        onStart: function () {
            console.log('I will be highlight');
        },
        onStop: function () {
            console.log('I\'m be highlight');
        }
    });

## .removeClass(classNames[, options])

    .rotate-30 {
        transform: rotate(30deg)
    }

    Simplean(dom).removeClass('rotate-30', {
        ease: 'ease-in',
    });