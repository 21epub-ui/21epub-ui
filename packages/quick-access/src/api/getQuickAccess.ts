import postReviewTask from './postReviewTask'
import type { ResponseBody } from './api'
import api from './api'

const getQuickAccess = async (id: string, type: string) => {
  const baseUri = `/v3/${type}`
  const res = await api
    .get(`${type}/works/${id}/`)
    .json<ResponseBody<{ uuid: string; review_task?: string }[]>>()

  const { uuid, review_task } = res.data.results[0]

  const reviewTask = review_task ?? (await postReviewTask(uuid)).id

  return [
    { id: 'edit', title: '作品设置', url: `${baseUri}/${id}/edit` },
    {
      id: 'publish',
      title: '发布管理',
      url: `${baseUri}/${reviewTask}/publish`,
    },
    {
      id: 'version',
      title: '版本管理',
      url: `${baseUri}/${id}/version-control`,
    },
    {
      id: 'list',
      title: '作品列表',
      url: `${baseUri}`,
    },
    {
      id: 'home',
      title: '返回首页',
      url: '/',
    },
  ]
}

export default getQuickAccess
