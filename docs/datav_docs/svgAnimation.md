# svg动画


## transform 变换

### translate 位移
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="50" height="50" transform="translate(10,10)" />
</svg>
```

### rotate 旋转
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="50" height="50" transform="translate(50,50) rotate(30)" />
</svg>
```

### skewX 和 skewY 斜切
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="50" height="50" transform="translate(50,50) skewX(30)" />
</svg>
```

### scale 缩放
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="50" height="50" transform="translate(50,50) scale(.5)" />
</svg>
```

### matrix 复杂变形
```html
<svg viewBox="0 0 200 200">
  <rect x="10" y="10" width="30" height="20" fill="green" />
 
  <!--
  In the following example we are applying the matrix:
  [a c e]    [3 -1 30]
  [b d f] => [1  3 40]
  [0 0 1]    [0  0  1]

  which transform the rectangle as such:

  top left corner: oldX=10 oldY=10
  newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 10 + 30 = 50
  newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 10 + 40 = 80

  top right corner: oldX=40 oldY=10
  newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 10 + 30 = 140
  newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 10 + 40 = 110

  bottom left corner: oldX=10 oldY=30
  newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 30 + 30 = 30
  newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 30 + 40 = 140

  bottom right corner: oldX=40 oldY=30
  newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 30 + 30 = 120
  newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 30 + 40 = 170
  -->
  <rect x="10" y="10" width="30" height="20" fill="red"
        transform="matrix(3 1 -1 3 30 40)" />
</svg>
```
