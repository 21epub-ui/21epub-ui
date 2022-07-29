import { useRef } from 'react'
import useSWRInfinite from 'swr/infinite'
import type { GetCommentsParams } from '../api/getComments'
import getComments from '../api/getComments'
import type { ResponseData } from '../api/request'
import type { CommentListData } from '../index.types'

const fetcher = (key: string, params: GetCommentsParams) => getComments(params)

const useComments = (params: GetCommentsParams) => {
  const getKey = (
    index: number,
    previousData: ResponseData<CommentListData> | null
  ) => {
    if (previousData === null) return ['comments', params]
    if (previousData.last) return null

    const lastList = previousData.content
    const lastId = lastList.at(-1)?.id

    return ['comments', { ...params, before: lastId }]
  }

  const { data, mutate, size, setSize } = useSWRInfinite(getKey, fetcher)

  const loadPrev = () => {
    mutate(async (data) => {
      const [firstList, ...rest] = data ?? []
      const firstId = firstList?.content.at(0)?.id
      const res = await getComments({
        ...params,
        after: firstId ?? '',
      })

      if (firstId === undefined) return [res]

      return [{ ...res, last: false }, firstList, ...rest]
    })
  }

  const loadNext = () => {
    if (data?.at(size - 1) !== undefined) setSize(size + 1)
  }

  const loadPrevRef = useRef(loadPrev)
  loadPrevRef.current = loadPrev

  const loadNextRef = useRef(loadNext)
  loadNextRef.current = loadNext

  return {
    comments: data,
    mutate,
    loadPrev: loadPrevRef.current,
    loadNext: loadNextRef.current,
  }
}

export default useComments
