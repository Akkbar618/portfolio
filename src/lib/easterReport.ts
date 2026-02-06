export type EasterReportData = {
  manualVersion: string;
  reportBody: string;
};

export const parseEasterReport = (
  reportMarkdown: string,
  fallbackVersion: string
): EasterReportData => {
  const lines = reportMarkdown.replace(/\r\n/g, "\n").split("\n");
  const firstLine = lines[0]?.trim() ?? "";
  const versionMatch = firstLine.match(/^version\s*:\s*(.+)$/i);

  if (!versionMatch) {
    return {
      manualVersion: fallbackVersion,
      reportBody: reportMarkdown,
    };
  }

  return {
    manualVersion: versionMatch[1]?.trim() || fallbackVersion,
    reportBody: lines.slice(1).join("\n").replace(/^\n+/, ""),
  };
};
