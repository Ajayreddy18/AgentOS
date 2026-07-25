import { Download } from "lucide-react";

export function ExportButton() {
  function handleExport() {
    alert("Export functionality will be implemented in the next version.");
  }

  return (
    <button
      onClick={handleExport}

      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
    >
      <Download className="h-4 w-4" />
      Export
    </button>
  );
}
