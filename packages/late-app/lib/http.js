
/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return [
    {
      name:'vue3-ts-webpack5',
      url:'https://github.com/laterly/vue3-ts-webpack5.git'
    },
    {
      name:'react-ts-webpack5',
      url:'https://github.com/laterly/react-ts-webpack5.git'
    },
  ]
}

module.exports = {
  getRepoList
}