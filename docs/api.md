##.to(styles[, options])
### 简单用法
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

### OPTIONS
OPTIONS最多可以有5个参数，分别为 *delay*、*duration*、*ease*、*onStart*、 *onStop*
####delay
delay配置动画延迟多长时间开始执行，默认值为0。支持两种类型的值，string和number

*string*
```
{
    delay: '200ms' // 200ms
}
{
    delay: '3s' // 3s
}
```

*int*

当为int时，单位为ms
```
{
    delay: 200 // 200ms
}
{
    delay: 3000 // 3000ms
}
```

####duration
duration配置动画执行时长，默认值为300ms。支持两种类型的值，string和number

*string*
```
{
    duration: '500ms' // 500ms
}
{
    duration: '4s' // 4s
}
```

*int*

当为int时，单位为ms
```
{
    duration: 500 // 500ms
}
{
    duration: 4000 // 4000ms
}
```


####ease
ease配置动画的变换曲线函数，对应于transitionTimingFunction，支持*linear*、*ease-in*、*ease-out*、*ease-in-out*、*cubic-bezier*，默认值为*linear*。
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
#### onStart([elem])
onStart在动画开始执行前被调用，执行上下文(this)为Simplean
实例，即Simplean(dom)，接受一个参数elem，为执行这个动画的dom元素。
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
#### onStop([elem])
onStop在动画执行之后被调用，和onStart一样的，执行上下文(this)为Simplean
实例，即Simplean(dom)，接受一个参数elem，为执行这个动画的dom元素。
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


##.addClass(classNames[, options])]

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

##.removeClass(classNames[, options])

    .rotate-30 {
        transform: rotate(30deg)
    }

    Simplean(dom).removeClass('rotate-30', {
        ease: 'ease-in',
    });