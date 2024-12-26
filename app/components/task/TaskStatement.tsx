import Markdown from "react-markdown";

export default function TaskStatement({
  full_name,
  time_limit,
  memory_limit,
  statement
}: {
  full_name: string
  time_limit: number
  memory_limit: number
  statement?: string | null
}) {
  const ONE_GIGABYTE = 1024
  const formatMemoryLimit = (memory_limit: number) => {
    if (memory_limit > ONE_GIGABYTE * 3) return `${(memory_limit / ONE_GIGABYTE).toPrecision(3)} GB` 
    return `${memory_limit} MB` 
  }
  return (
    <div className="markdown relative">
      <h1>{ full_name }</h1>
      <div
        className="absolute top-0 right-0 bg-gray-100 rounded-full px-3 py-1 m-2
          text-sm"
      >
        { time_limit / 1000 } { time_limit === 1000 ? "second" : "seconds" } { " / " }
        { formatMemoryLimit(memory_limit) }
      </div>
      <Markdown>{ statement }</Markdown>
    </div>
  )
}
