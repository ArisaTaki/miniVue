# miniVue
响应式模拟
# 这是一个响应式模拟的项目（Vue）
- Vue：
  - 目标：将data数据注入到Vue实例，便于方法内操作
- Observer（发布者）
  - 目标：数据劫持，监听数据变化，并在变化时通知Dep
- Dep（消息中心）
  - 目标：存储订阅者以及管理消息的发送
- Watcher（订阅者）
  - 目标：当订阅数据变化，进行视图更新
- Compiler
  - 目标：解析模板中的指令与插值表达式，并替换成相应的数据
## Vue类
- 功能：
  - 接受配置信息
  - 将data的属性转换为Getter、setter，并且注入到Vue实例中
  - *监听data中所有属性的变化，设置成响应式数据
  - *调用解析功能（解析模板内的插值表达式，指令等等）
  ![1.存储配置选项，2.挂载元素，3.设置数据属性，最后通过proxyData将data属性都设置到vue实例](https://upload-images.jianshu.io/upload_images/24937057-fcec605c342eae6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Observer类
- 功能：
 - 通过数据劫持方式监视data中的属性变化，变化时通知消息中心Dep
  - 需要考虑data的属性也可能为对象，也要转换成响应式数据
![](https://upload-images.jianshu.io/upload_images/24937057-bd9027afb1162440.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Dep类
- Dep是dependency的简写，含义是“依赖”，指的是Dep用于收集与管理订阅者与发布者之间的依赖关系
- 功能：
  - *为每个数据收集对应的依赖，存储依赖
  - 添加并存储订阅者
  - 数据变化时，通知所有的观察者
![](https://upload-images.jianshu.io/upload_images/24937057-00ec457fc5d14fa5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Watcher 类
- 功能：
  - 实例化Watch时，往dep对象中添加自己
  - 当数据变化触发dep，dep通知所有对应的Watcher实例更新视图
![](https://upload-images.jianshu.io/upload_images/24937057-8a15444335278561.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Complier类
- 功能：
  - 进行编译模板，并解析内部指令与插值表达式
  - 进行页面的首次渲染
  - 数据变化后，重新渲染视图
  ![](https://upload-images.jianshu.io/upload_images/24937057-c43582ec8b91afdf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
