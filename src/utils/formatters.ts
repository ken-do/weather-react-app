export const dateToFriendlyDate = (date: string) =>
    new Date(date).toDateString()

export const UTCStringToHours = (time: string) =>
    new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })
