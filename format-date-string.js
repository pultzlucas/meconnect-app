export default function formatDateString(date) {
    return String(date).replace('T', ' ').replace('.000000Z', '').replace(/-/g, '/')
}