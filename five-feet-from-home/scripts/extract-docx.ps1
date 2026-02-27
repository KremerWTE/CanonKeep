$ErrorActionPreference = 'SilentlyContinue'
$baseDir = "C:\Users\Chris Kremer\Documents\GitHub\five-feet-from-home"
$outputDir = Join-Path $baseDir "extracted_docs"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

# Get all docx files
$files = Get-ChildItem -Path $baseDir -Filter "*.docx" -Recurse | Where-Object { $_.FullName -notlike "*node_modules*" }

Write-Host "Found $($files.Count) docx files"

$count = 0
foreach ($file in $files) {
    $name = $file.Name -replace '.docx$', '.txt'
    $outPath = Join-Path $outputDir $name

    try {
        $tempDir = Join-Path $env:TEMP ("docx_" + (Get-Random))
        Expand-Archive -Path $file.FullName -DestinationPath $tempDir -Force
        $xmlPath = Join-Path $tempDir "word\document.xml"

        if (Test-Path $xmlPath) {
            $content = Get-Content $xmlPath -Raw -Encoding UTF8
            # Remove XML tags but keep text
            $content = $content -replace '<w:p[^>]*>', "`n"
            $content = $content -replace '</w:p>', ""
            $content = $content -replace '<[^>]+>', ''
            $content = [System.Web.HttpUtility]::HtmlDecode($content)
            $content = $content -replace '\s+', ' '
            $content = $content -replace ' \n', "`n"
            $content | Out-File $outPath -Encoding UTF8
            $count++
            Write-Host "OK: $($file.Name)"
        }
        Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue
    } catch {
        Write-Host "FAIL: $($file.Name) - $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "Extracted $count files to: $outputDir"
