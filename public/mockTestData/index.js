import Mock from 'mockjs'
const Random = Mock.Random
/**
 * Create by GengHH on 2020/11/30
 * 创建开发时需要的模拟数据
 */
const testData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'text': Random.county(true)
  }]
})

export { testData }