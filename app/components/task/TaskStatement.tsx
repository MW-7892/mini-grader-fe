import Markdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export default function TaskStatement({
  full_name,
  time_limit,
  memory_limit,
  statement,
}: {
  full_name: string
  time_limit: number
  memory_limit: number
  statement?: string | null
}) {
  const ONE_GIGABYTE = 1024
  const formatMemoryLimit = (memory: number) => {
    if (memory > ONE_GIGABYTE * 3) return `${(memory / ONE_GIGABYTE).toPrecision(3)} GB`
    return `${memory} MB`
  }

  return (
    <div className="markdown relative">
      <h1>{full_name}</h1>
      <div
        className="lg:absolute lg:top-0 lg:right-0 bg-gray-100 rounded-full px-3 py-1 m-2
          text-sm ml-0 mb-3"
      >
        {time_limit / 1000} {time_limit === 1000 ? "second" : "seconds"} {" / "}
        {formatMemoryLimit(memory_limit)}
      </div>
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "")

            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                customStyle={{
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  marginBottom: "1rem",
                  backgroundColor: "#F3F4F6",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {statement}
      </Markdown>
    </div>
  )
}
