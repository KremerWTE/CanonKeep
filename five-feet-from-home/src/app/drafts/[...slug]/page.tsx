import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

interface Props {
  params: Promise<{ slug: string[] }>;
}

async function getDraft(slugParts: string[]) {
  const draftsPath = path.join(process.cwd(), 'drafts');

  let filePath: string;
  if (slugParts.length === 1 && slugParts[0] === 'character-bible') {
    filePath = path.join(draftsPath, 'character-bible.md');
  } else if (slugParts.length === 2 && ['book1', 'book2', 'book3'].includes(slugParts[0])) {
    filePath = path.join(draftsPath, slugParts[0], `${slugParts[1]}.md`);
  } else {
    return null;
  }

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return {
      content,
      html: marked(content),
      wordCount: content.split(/\s+/).length,
      slug: slugParts.join('/')
    };
  } catch (e) {
    return null;
  }
}

export default async function DraftPage({ params }: Props) {
  const { slug } = await params;
  const draft = await getDraft(slug);

  if (!draft) {
    notFound();
  }

  const title = slug[slug.length - 1]
    .replace(/-/g, ' ')
    .replace(/chapter (\d+)/, 'Chapter $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/drafts" className="text-blue-600 hover:underline">
          ← Back to Drafts
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-gray-600">{draft.wordCount.toLocaleString()} words</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/api/drafts/download?format=docx&file=${draft.slug}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Download Word
          </a>
          <a
            href={`/api/drafts/download?format=md&file=${draft.slug}`}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Download MD
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-8">
        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: draft.html }}
        />
      </div>
    </div>
  );
}
