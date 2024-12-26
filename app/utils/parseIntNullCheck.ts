export default function parseIntNullCheck(value: any) {
  if (!value || typeof value !== "string") return value
  return parseInt(value)
}
