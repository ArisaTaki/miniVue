class Watcher {
  constructor (vm, key, cb) {
    // 当前vue实例
    this.vm = vm
    // key：订阅的属性名
    this.key = key
    // 数据变化后要执行的回调
    this.cb = cb

    // 触发getter钱，将当前订阅者实例存储给Dep类
    Dep.target = this
    // 记录属性更新之前的值，用于进行更新状态监测（导致了属性Getter的触发）
    this.oldValue = vm[key]
    // 操作完毕后清除target，用于存储下一个watcher实例
    Dep.target = null
  }
  // 封装数据变化时，更新视图的功能
  update () {
    const newValue = this.vm[this.key]
    // 数据不变，无需更新
    if (newValue === this.oldValue) return
    // 数据改变，调用更新后的回调
    this.cb(newValue)
  }
}