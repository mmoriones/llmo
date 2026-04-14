import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import useDarkMode from "../hooks/useDarkMode";

function MarkdownMessage({ content }) {

  const isDark = useDarkMode();

  return (
    <div className="
      prose max-w-none
      prose-gray
      dark:prose-invert
      ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {

            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");

            if (!inline && match) {
              return (
                <div className="relative w-full">
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="absolute right-2 top-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors"
                  >
                    Copy
                  </button>

                  <SyntaxHighlighter
                    style={isDark ? vscDarkPlus : vs}
                    language={match[1] || "text"}
                    PreTag="div"
                    className="rounded-lg text-sm overflow-x-auto"
                    {...props}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className="bg-gray-300 dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                px-1.5 py-0.5
                rounded">
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownMessage;
