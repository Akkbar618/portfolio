import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Security Headers', () => {
  it('should have Content Security Policy in index.html', () => {
    // Assuming run from root
    const indexPath = path.resolve(process.cwd(), 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf-8');

    // Check for CSP meta tag presence
    expect(indexContent).toContain('http-equiv="Content-Security-Policy"');

    // Check for critical directives
    expect(indexContent).toContain("default-src 'self'");
    expect(indexContent).toContain("object-src 'none'");
    expect(indexContent).toContain("base-uri 'self'");
  });
});
