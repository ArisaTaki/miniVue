class Observer {
  // 接收传入的对象，对这个对象的属性转换为Getter和Setter
  constructor (data) {
    this.data = data
    // 遍历数据
    this.walk(data)
  }
  // 用于数据遍历的方法
  walk (data) {
    // 将遍历后的属性都转为getter与setter
    Object.keys(data).forEach(key => this.convert(key, data[key]))
  }
  // 用于封装将对象转换为响应式数据的方法
  convert (key, value) {
    defineReactive(this.data, key, value)
  }
}

// 用于为对象定义一个响应式的属性
function defineReactive (data, key, value) {
  // 创建消息中心
  const dep = new Dep()
  // 检测是否为对象，如果是，创建一个新的observer实例进行管理
  observer(value)
  // 进行数据劫持
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      console.log('获取了属性')
      // *在触发Getter时添加订阅者
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set (newValue) {
      console.log('设置了属性')
      if (newValue === value) return
      value = newValue
      observer(value)

      // *当数据变化时，通知消息中心
      dep.notify()
    }
  })
}

function observer (value) {
  if (typeof value === 'object' && value !== null) {
    return new Observer(value)
  }
}