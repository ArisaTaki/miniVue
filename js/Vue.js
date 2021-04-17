class Vue {
  constructor (options) {
    // 1.存储属性
    this.$options = options || {}
    this.$data = options.data || {}
    // 判断el的取值的类型，并且进行相应处理
    const { el } = options
    this.$el =  typeof el === 'string' ? document.querySelector(el) : el

    // 2.将data属性注入到Vue实例中
    _proxyData(this, this.$data)

    // *3.创建observer实例监视data的属性变化
    new Observer(this.$data)

    // *4.调用compiler
    new Compiler(this)
  }
}

// 将data的属性注入到Vue实例
function _proxyData (target, data) {
  Object.keys(data).forEach(key => {
    Object.defineProperty(target, key,{
      enumerable: true,
      configurable: true,
      get () {
        return data[key]
      },
      set (newValue) {
        data[key] = newValue
      }
    })
  })
}