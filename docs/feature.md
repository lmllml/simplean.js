### 单例

同一DOM元素多次Simplean化，得到同一实例
```
var s1 = Simplean(dom);
var s2 = Simplean(dom);
s1 === s2; // true
```

### 链式调用

Simplean支持链式调用，链式调用可以保证同一个DOM元素的动画线性运行，DOM的Simplean实例会维护一个动画队列，以确保动画的线性执行且不相互影响，动画队列支持FIFO。

```
Simplean(dom).to({
    width: '200px',
    height: '200px'
}).to({
    width: '300px',
    height: '300px'
});
```
