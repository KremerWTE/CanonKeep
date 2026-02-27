import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';

interface Props {
  params: Promise<{ id: string }>;
}

async function getDocument(id: string) {
  const document = await prisma.document.findUnique({
    where: { id },
    include: {
      blocks: {
        orderBy: { blockIndex: 'asc' },
        take: 500, // Limit to first 500 blocks
      },
      _count: {
        select: { blocks: true }
      }
    }
  });

  return document;
}

export default async function DocumentDetailPage({ params }: Props) {
  const { id } = await params;
  const document = await getDocument(id);

  if (!document) {
    notFound();
  }

  // Group blocks by section
  const sections = new Map<string, typeof document.blocks>();
  for (const block of document.blocks) {
    const section = block.sectionHeading || 'Introduction';
    if (!sections.has(section)) {
      sections.set(section, []);
    }
    sections.get(section)!.push(block);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/documents" className="text-blue-600 hover:underline text-sm">
          ← Back to Documents
        </Link>
        <h1 className="text-3xl font-bold mt-2">{document.fileName}</h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>Type: docx</span>
          <span>•</span>
          <span>{document._count.blocks.toLocaleString()} content blocks</span>
          <span>•</span>
          <span>Ingested: {new Date(document.ingestedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Table of Contents */}
      {sections.size > 1 && (
        <div className="bg-gray-50 rounded-lg border p-4 mb-6">
          <h2 className="font-semibold text-gray-700 mb-2">Sections ({sections.size})</h2>
          <div className="flex flex-wrap gap-2">
            {Array.from(sections.keys()).map((section) => (
              <a
                key={section}
                href={`#${section.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-sm bg-white px-2 py-1 rounded border hover:bg-gray-100"
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-8">
        {Array.from(sections.entries()).map(([sectionName, blocks]) => (
          <section
            key={sectionName}
            id={sectionName.replace(/\s+/g, '-').toLowerCase()}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
              {sectionName}
            </h2>
            <div className="space-y-4">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={`${
                    block.styleType === 'heading'
                      ? 'font-semibold text-gray-800'
                      : 'text-gray-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{block.rawText}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {document._count.blocks > 500 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-yellow-800">
            Showing first 500 of {document._count.blocks.toLocaleString()} blocks.
            Full content available in database.
          </p>
        </div>
      )}
    </div>
  );
}
