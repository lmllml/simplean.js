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