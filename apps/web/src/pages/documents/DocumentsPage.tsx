export function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documents</h1>

        <p className="mt-2 text-muted-foreground">
          This feature will allow you to upload documents that are automatically
          processed and converted into searchable knowledge for your AI agents.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Planned Features</h2>

        <ul className="mt-4 space-y-3">
          <li>✓ PDF Upload</li>

          <li>✓ Markdown Upload</li>

          <li>✓ Word Documents</li>

          <li>✓ Automatic Chunking</li>

          <li>✓ Embedding Generation</li>

          <li>✓ Background Processing</li>
        </ul>
      </div>

      <div className="rounded-lg border border-dashed bg-muted/40 p-8 text-center">
        <h3 className="text-xl font-semibold">Coming Soon</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Document ingestion will be added in a future release. Once available,
          uploaded files will be automatically parsed, chunked, embedded, and
          indexed for semantic retrieval.
        </p>
      </div>
    </div>
  );
}
