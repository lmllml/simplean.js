#Simplean.js
  * Focus on dom animation 
  * Focus on mobile browser and advanced browser
  * Simple api: to, addClass, removeClass

## Usage
````
    .rect-200 {
        width: 200px;
        height: 200px;
    }

    Simplean(dom).addClass('rect-200', {
        duration: 500,
        delay: 100,
        onStart: function () {
            // do something
        },
        onStop: function () {
            // do something
        }
    });
````
## API

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

### Simplean#removeClass(classNames[, options])
````
    .rotate-30 {
        transform: rotate(30deg)
    }

    Simplean(dom).removeClass('rotate-30', {
        ease: 'ease-in',
    });
````

## OPTIONS

 All api in Simplean.js has a argument that is options which make the process of animation controable. Options is a object has five property: delay, duration, ease, onStart, onStop. 
 * delay
 Delay means animation wait some time for starting.The default value is 0ms.
 * duration
 Duration means animation running time.The default value is 300ms.
 * ease
 Ease means animation timing function.In simple term, timing function is a function that caculate the instant status  as time passing.The default is linear.
 * onStart
 The function invoked before animation starting.
 * onStop
 The function invoked after animation stopping.
 
