## 介绍
Simplean.js是一个基于javascript的DOM动画库，目的是为了能够快速简单的创造出高性能、模块化的动画组件，随着便携式设备硬件性能的不断提升以及前端技术不断地推陈出新，Web Application体验会越来越好，但是距离Native App的交互体验还有一段距离，这种差距有一部分就体现在交互流畅性以及动画效果上，Simplean.js不仅仅是为了简单地创造动画组件，更重要的让你的Web Application具有交互上的流畅感。

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

## 兼容性