import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Split content by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 leading-relaxed text-[15px] break-words">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          return <CodeBlock key={index} rawBlock={part} />;
        }
        return <FormattedText key={index} text={part} />;
      })}
    </div>
  );
};

const CodeBlock: React.FC<{ rawBlock: string }> = ({ rawBlock }) => {
  const [copied, setCopied] = useState(false);

  // Extract language and code
  const firstLineEnd = rawBlock.indexOf('\n');
  let language = 'code';
  let code = '';

  if (firstLineEnd !== -1) {
    language = rawBlock.slice(3, firstLineEnd).trim() || 'code';
    code = rawBlock.slice(firstLineEnd + 1, -3);
  } else {
    code = rawBlock.slice(3, -3);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/60 text-xs font-mono text-slate-300">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span className="uppercase tracking-wider font-semibold text-slate-300">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-700/70 hover:bg-slate-600 transition text-slate-200 hover:text-white cursor-pointer active:scale-95"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">कॉपी झाले!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed bg-[#0d1117]">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const paragraphs = text.split(/\n\s*\n/);

  return (
    <>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Headings
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={pIdx} className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-3 mb-1.5 flex items-center">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full mr-2 inline-block"></span>
              <InlineText text={trimmed.slice(4)} />
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={pIdx} className="text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2 pb-1 border-b border-slate-200 dark:border-slate-800">
              <InlineText text={trimmed.slice(3)} />
            </h2>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={pIdx} className="text-2xl font-extrabold text-slate-900 dark:text-white mt-5 mb-2.5">
              <InlineText text={trimmed.slice(2)} />
            </h1>
          );
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={pIdx} className="border-l-4 border-amber-500/80 pl-4 py-1.5 my-2 italic bg-amber-500/5 dark:bg-amber-500/10 rounded-r-lg text-slate-700 dark:text-slate-300">
              <InlineText text={trimmed.replace(/^>\s*/gm, '')} />
            </blockquote>
          );
        }

        // Table detection
        if (trimmed.includes('|') && trimmed.includes('\n')) {
          const lines = trimmed.split('\n').filter((l) => l.trim().startsWith('|'));
          if (lines.length >= 2) {
            return <TableRenderer key={pIdx} lines={lines} />;
          }
        }

        // Bullet lists or numbered lists
        const lines = para.split('\n');
        const isList = lines.some((l) => /^\s*([*-]|\d+\.)\s+/.test(l));

        if (isList) {
          return (
            <ul key={pIdx} className="space-y-1.5 my-2 pl-2">
              {lines.map((line, lIdx) => {
                const bulletMatch = line.match(/^\s*([*-]|\d+\.)\s+(.*)/);
                if (bulletMatch) {
                  const isNumbered = /^\d+\./.test(bulletMatch[1]);
                  return (
                    <li key={lIdx} className="flex items-start space-x-2.5">
                      <span className={`inline-flex items-center justify-center font-semibold shrink-0 mt-1 ${isNumbered ? 'text-xs text-amber-600 dark:text-amber-400 w-5 h-5 rounded-full bg-amber-500/10' : 'text-amber-500 dark:text-amber-400 text-sm'}`}>
                        {isNumbered ? bulletMatch[1] : '•'}
                      </span>
                      <span className="flex-1">
                        <InlineText text={bulletMatch[2]} />
                      </span>
                    </li>
                  );
                }
                if (line.trim()) {
                  return (
                    <p key={lIdx} className="ml-6 text-slate-700 dark:text-slate-300">
                      <InlineText text={line} />
                    </p>
                  );
                }
                return null;
              })}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="text-slate-800 dark:text-slate-200">
            <InlineText text={para} />
          </p>
        );
      })}
    </>
  );
};

const TableRenderer: React.FC<{ lines: string[] }> = ({ lines }) => {
  const parseRow = (row: string) =>
    row
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim());

  const headerRow = parseRow(lines[0]);
  const dataRows = lines.slice(2).map(parseRow);

  return (
    <div className="my-3 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            {headerRow.map((h, i) => (
              <th key={i} className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-slate-100">
                <InlineText text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className="border-b border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-3.5 py-2 text-slate-700 dark:text-slate-300">
                  <InlineText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InlineText: React.FC<{ text: string }> = ({ text }) => {
  // Format bold, italics, inline code, and links
  const elements: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      elements.push(
        <strong key={match.index} className="font-bold text-slate-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      elements.push(
        <em key={match.index} className="italic text-slate-800 dark:text-slate-200">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      elements.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-amber-700 dark:text-amber-300 text-[13px] font-mono border border-slate-300/50 dark:border-slate-700/60"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        elements.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 dark:text-amber-400 underline hover:text-amber-700 dark:hover:text-amber-300 transition"
          >
            {linkMatch[1]}
          </a>
        );
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <>{elements}</>;
};
