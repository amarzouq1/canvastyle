# Safe Vercel deploy routine for ivermectin-combo-sim.
# Fixes the recurring "page not found" cause: zombie deployments stealing the alias.
# Usage:  powershell -File deploy.ps1
# What it does:
#   1. Deploys this folder to production.
#   2. Finds the NEWEST HEALTHY deployment (200 + real content).
#   3. Pins ALL aliases to that healthy deployment.
#   4. Verifies every alias serves the real page.
#   5. Deletes zombie deployments (404 ones) so they can't steal aliases again.

param([string[]]$Aliases = @("ivermectin-combo-sim.vercel.app", "ivm-sim.vercel.app"))
$ErrorActionPreference = "Continue"
Set-Location $PSScriptRoot

Write-Host "== 1/5 deploying ==" -ForegroundColor Cyan
$out = (vercel --prod --yes 2>&1 | Out-String)
$candidates = [regex]::Matches($out, "https://[a-z0-9-]+-[a-z0-9]+-the-duke-enodowment\.vercel\.app") |
  ForEach-Object { $_.Value } | Select-Object -Unique
if (-not $candidates) {
  $ls = (vercel ls 2>&1 | Out-String)
  $candidates = [regex]::Matches($ls, "https://[a-z0-9-]+-[a-z0-9]+-the-duke-enodowment\.vercel\.app") |
    ForEach-Object { $_.Value } | Select-Object -Unique
}
Write-Host "candidate deployments: $($candidates.Count)"

Write-Host "== 2/5 finding newest HEALTHY deployment ==" -ForegroundColor Cyan
$good = $null
foreach ($u in $candidates) {
  try {
    $r = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 25
    if ($r.StatusCode -eq 200 -and $r.Content -match "Ivermectin Combination Simulator") {
      $good = $u; Write-Host "healthy: $u" -ForegroundColor Green; break
    } else { Write-Host "unhealthy content: $u" -ForegroundColor Yellow }
  } catch { Write-Host "unhealthy (HTTP error): $u" -ForegroundColor Yellow }
}
if (-not $good) { Write-Error "No healthy deployment found - DO NOT trust any alias. Inspect manually."; exit 1 }

Write-Host "== 3/5 pinning aliases ==" -ForegroundColor Cyan
foreach ($a in $Aliases) {
  vercel alias set $good $a 2>&1 | Out-Null
  Write-Host "pinned $a -> $good"
}
Start-Sleep -Seconds 4

Write-Host "== 4/5 verifying aliases ==" -ForegroundColor Cyan
$fail = $false
foreach ($a in $Aliases) {
  try {
    $r = Invoke-WebRequest -Uri "https://$a" -UseBasicParsing -TimeoutSec 25
    if ($r.StatusCode -eq 200 -and $r.Content -match "Ivermectin Combination Simulator") {
      Write-Host "OK  https://$a (200, content verified)" -ForegroundColor Green
    } else { Write-Host "BAD https://$a - wrong content" -ForegroundColor Red; $fail = $true }
  } catch { Write-Host "BAD https://$a - $($_.Exception.Message)" -ForegroundColor Red; $fail = $true }
}

Write-Host "== 5/5 removing zombie deployments ==" -ForegroundColor Cyan
$ls = (vercel ls 2>&1 | Out-String)
$all = [regex]::Matches($ls, "https://[a-z0-9-]+-[a-z0-9]+-the-duke-enodowment\.vercel\.app") |
  ForEach-Object { $_.Value } | Select-Object -Unique
foreach ($u in $all) {
  if ($u -eq $good) { continue }
  try {
    $c = curl.exe -s -o NUL -w "%{http_code}" --max-time 15 $u
    if ($c -eq "404") {
      Write-Host "removing zombie: $u" -ForegroundColor Yellow
      vercel rm $u --yes 2>&1 | Out-Null
    }
  } catch {}
}

if ($fail) { Write-Error "Verification failed - see above."; exit 1 }
Write-Host "== DONE - aliases pinned to verified healthy deployment ==" -ForegroundColor Green
Write-Host "Primary: https://$($Aliases[0])"
