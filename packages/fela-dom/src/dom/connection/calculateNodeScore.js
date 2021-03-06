/* @flow */
import { FONT_TYPE, STATIC_TYPE, KEYFRAME_TYPE, RULE_TYPE } from 'fela-utils'

import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

function getRuleScore(
  baseScore: number,
  media: string = '',
  mediaQueryOrder: Array<string> = []
) {
  if (media.length === 0) {
    return baseScore
  }

  const mediaIndex = mediaQueryOrder.indexOf(media) + 1
  if (mediaIndex) {
    return baseScore + mediaIndex * 2
  }

  return 9999
}

export default function calculateNodeScore(
  { type, support, media }: NodeAttributes,
  mediaQueryOrder: Array<string>
) {
  switch (type) {
    case FONT_TYPE:
      return 0
    case STATIC_TYPE:
      return 1
    case KEYFRAME_TYPE:
      return 2
    case RULE_TYPE:
      return getRuleScore(support ? 4 : 3, media, mediaQueryOrder)
    default:
      // TODO: warning
      return 9999
  }
}
