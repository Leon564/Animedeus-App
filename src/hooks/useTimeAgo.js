import { useEffect, useState } from "react"
import { formatDistanceToNowStrict } from "date-fns"
import { es } from "date-fns/locale"

export default function useTimeAgo(timestamp) {
    const [timeAgo, setTimeAgo] = useState(() => formatDistanceToNowStrict(timestamp, {locale: es}))

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeAgo = formatDistanceToNowStrict(timestamp, {locale: es})
            setTimeAgo(newTimeAgo)
        }, 5000)

        return () => clearInterval(interval)
    }, [timestamp])

    return timeAgo
}


/*
const DATE_UNITS = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
]

const getDateDiffs = timestamp => {
    const now = Date.now()
    const elapsed = (timestamp - now) / 1000

    for (const [unit, secondsInUnit] of DATE_UNITS) {
        if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
            const value = Math.floor(elapsed / secondsInUnit)
            return { value, unit }
        }
    }
}

export default function useTimeAgo(timestamp) {
    const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeAgo = getDateDiffs(timestamp)
            setTimeago(newTimeAgo)
        }, 5000)

        return () => clearInterval(interval)
    }, [timestamp])

    const rtf = new Intl.RelativeTimeFormat('en', { style: 'short' })

    const { value, unit } = timeago
    return rtf.format(value, unit)
}
*/