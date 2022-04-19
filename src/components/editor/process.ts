import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { Processor } from "unified";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
// import rehypeHighlight from 'rehype-highlight';

export interface MdPlugin {
  remark?: (p: Processor) => Processor;
  rehype?: (p: Processor) => Processor;
}

export function getProcessor({ plugins }: { plugins?: MdPlugin[] | undefined }) {
  let processer: Processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })

    .use(rehypeSanitize);
  // .use(rehypeHighlight)

  plugins?.forEach(({ rehype }) => {
    if (rehype) rehype(processer);
  });

  return processer.use(rehypeStringify);
}
