import { useEffect, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import type { GetCommentsParams } from '../api/getComments'
import getComments from '../api/getComments'
import type { Response } from '../api/request'
import type { CommentData } from '../index.types'

const useComments = (params: GetCommentsParams) => {
  const getKey = (
    index: number,
    previousData: Response<CommentData> | null
  ) => {
    if (previousData === null) return { ...params }
    if (previousData.last) return null

    const lastList = previousData.content
    const lastId = lastList[lastList.length - 1].id

    return { ...params, before: lastId }
  }

  const { data, mutate, size, setSize } = useSWRInfinite<Response<CommentData>>(
    getKey,
    getComments
  )

  const refresh = () => {
    mutate(async (data) => {
      const [firstList, ...rest] = data ?? []
      const firstId = firstList?.content.at(0)?.id
      const res = await getComments({
        ...params,
        after: firstId,
      })
      return [res, ...rest]
    })
  }

  const loadMore = () => {
    if (data?.at(size - 1) !== undefined) setSize(size + 1)
  }

  const refreshRef = useRef(refresh)
  refreshRef.current = refresh

  const loadMoreRef = useRef(loadMore)
  loadMoreRef.current = loadMore

  return { data, refresh: refreshRef.current, loadMore: loadMoreRef.current }
}

export default useComments
