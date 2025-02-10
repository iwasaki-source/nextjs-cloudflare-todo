import { remark } from 'remark';
import html from 'remark-html';
import sanitizeHtml from 'sanitize-html';

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark().use(html).process(markdown);
  const rawHtml = processedContent.toString();

  // XSS対策でサニタイズ（スクリプトの埋め込みを防ぐ）
  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height'],
    },
  });
}