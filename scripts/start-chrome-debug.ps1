# Launch Chrome with remote debugging for TensorTonic scrapers (port 9222).
# Close ALL other Chrome windows first, or use a dedicated profile (recommended).

$chrome = @(
  "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chrome) {
  Write-Error "Chrome not found. Install Google Chrome or edit this script with your chrome.exe path."
  exit 1
}

$profile = Join-Path $env:LOCALAPPDATA "TensorTonicChromeDebug"
New-Item -ItemType Directory -Force -Path $profile | Out-Null

Write-Host "Starting Chrome with remote debugging on port 9222..."
Write-Host "Profile: $profile"
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Sign in at https://www.tensortonic.com"
Write-Host "  2. Open any problem (e.g. /problems/transformers-tokenization)"
Write-Host "  3. In TensorTonic folder run: npm run scrape:research-cdp"
Write-Host ""

Start-Process $chrome -ArgumentList @(
  "--remote-debugging-port=9222",
  "--user-data-dir=$profile",
  "https://www.tensortonic.com/login"
)
