import base64
import os

artifact_dir = r"C:\Users\Asus\.gemini\antigravity\brain\a8af8a75-4611-49db-aebc-7123ca20bcd3"
pdf_path = os.path.join(artifact_dir, "Charu_Sonker_SDE1_Reliance_Jio_Resume.pdf")
docx_path = os.path.join(artifact_dir, "Charu_Sonker_SDE1_Reliance_Jio_Resume.docx")
zip_path = os.path.join(artifact_dir, "Charu_Sonker_Reliance_Jio_Resume.zip")

pdf_b64 = base64.b64encode(open(pdf_path, "rb").read()).decode("ascii")
docx_b64 = base64.b64encode(open(docx_path, "rb").read()).decode("ascii")
zip_b64 = base64.b64encode(open(zip_path, "rb").read()).decode("ascii")

html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
</head>
<body class="bg-transparent text-[var(--foreground)] antialiased p-4 font-sans">
  <div class="bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-2xl p-6 shadow-md max-w-2xl mx-auto space-y-6">
    <div class="flex items-center justify-between border-b border-[var(--border)] pb-4">
      <div>
        <h2 class="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
          <span>📦</span> Reliance Jio SDE-I Resume Downloads
        </h2>
        <p class="text-xs text-[var(--muted-foreground)] mt-0.5">
          Verified ATS-tailored files (Job ID: 87405934) • Single-page A4 PDF & Editable DOCX
        </p>
      </div>
      <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
        Ready to Download
      </span>
    </div>

    <!-- Download Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      <!-- PDF Card -->
      <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between space-y-3 hover:border-blue-500/50 transition-all">
        <div>
          <div class="w-9 h-9 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-sm mb-2">
            PDF
          </div>
          <h3 class="text-sm font-semibold text-[var(--foreground)]">PDF Resume</h3>
          <p class="text-xs text-[var(--muted-foreground)] mt-0.5">1 Page A4 • 9 Links</p>
          <p class="text-xs text-[var(--muted-foreground)] mt-1 font-mono">~95 KB</p>
        </div>
        <button onclick="downloadFile('pdf')" class="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Download PDF
        </button>
      </div>

      <!-- DOCX Card -->
      <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between space-y-3 hover:border-blue-500/50 transition-all">
        <div>
          <div class="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm mb-2">
            DOCX
          </div>
          <h3 class="text-sm font-semibold text-[var(--foreground)]">Word Document</h3>
          <p class="text-xs text-[var(--muted-foreground)] mt-0.5">Editable • Full Styles</p>
          <p class="text-xs text-[var(--muted-foreground)] mt-1 font-mono">~39 KB</p>
        </div>
        <button onclick="downloadFile('docx')" class="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Download DOCX
        </button>
      </div>

      <!-- ZIP Bundle Card -->
      <div class="p-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 flex flex-col justify-between space-y-3 hover:border-emerald-500/60 transition-all">
        <div>
          <div class="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-sm mb-2">
            ZIP
          </div>
          <h3 class="text-sm font-semibold text-[var(--foreground)]">Complete ZIP</h3>
          <p class="text-xs text-[var(--muted-foreground)] mt-0.5">PDF + DOCX in ZIP</p>
          <p class="text-xs text-[var(--muted-foreground)] mt-1 font-mono">~111 KB</p>
        </div>
        <button onclick="downloadFile('zip')" class="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Download ZIP
        </button>
      </div>
    </div>

    <!-- Details Footer -->
    <div class="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
      <div class="flex items-center gap-1.5">
        <span>✓ 100% verified</span>
        <span>•</span>
        <span>Fruits & Nuts E-commerce added</span>
        <span>•</span>
        <span>SDLC & SQL keywords optimized</span>
      </div>
      <span class="font-mono text-xs">Reliance Jio SDE-I (Job ID: 87405934)</span>
    </div>
  </div>

  <script>
    const files = {{
      pdf: {{
        name: 'Charu_Sonker_SDE1_Reliance_Jio_Resume.pdf',
        type: 'application/pdf',
        b64: '{pdf_b64}'
      }},
      docx: {{
        name: 'Charu_Sonker_SDE1_Reliance_Jio_Resume.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        b64: '{docx_b64}'
      }},
      zip: {{
        name: 'Charu_Sonker_Reliance_Jio_Resume.zip',
        type: 'application/zip',
        b64: '{zip_b64}'
      }}
    }};

    function downloadFile(key) {{
      const item = files[key];
      if (!item) return;
      const byteCharacters = atob(item.b64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {{
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }}
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {{ type: item.type }});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }}
  </script>
</body>
</html>
"""

widget_path = os.path.join(artifact_dir, "download_resume.html")
with open(widget_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"Wrote generative UI widget to {widget_path} ({os.path.getsize(widget_path)} bytes)")
