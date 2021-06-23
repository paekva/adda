export const displayAlert = (message: string, sendUpdateMessage: (msg: string | null) => void) => {
    sendUpdateMessage(message);
    setTimeout(() => sendUpdateMessage(null), 5000)
}
