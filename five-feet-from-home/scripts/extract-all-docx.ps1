# PowerShell script to extract text from all docx files
param(
    [string]$OutputDir = "extracted_docs"
)

$ErrorActionPreference = "Continue"

# Create output directory
$baseDir = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $baseDir $OutputDir
if (-not (Test-Path $outputPath)) {
    New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
}

# Function to extract text from docx
function Extract-DocxText {
    param([string]$DocxPath)

    try {
        $word = New-Object -ComObject Word.Application
        $word.Visible = $false
        $doc = $word.Documents.Open($DocxPath, $false, $true)
        $text = $doc.Content.Text
        $doc.Close($false)
        $word.Quit()
        [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
        return $text
    }
    catch {
        # Fallback: try to extract from XML directly
        try {
            $tempDir = Join-Path $env:TEMP "docx_extract_$(Get-Random)"
            Expand-Archive -Path $DocxPath -DestinationPath $tempDir -Force
            $xmlPath = Join-Path $tempDir "word\document.xml"
            if (Test-Path $xmlPath) {
                $xml = [xml](Get-Content $xmlPath -Raw)
                $ns = @{w = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
                $texts = Select-Xml -Xml $xml -XPath "//w:t" -Namespace $ns | ForEach-Object { $_.Node.InnerText }
                Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue
                return ($texts -join " ")
            }
            Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue
        }
        catch {
            return $null
        }
    }
    return $null
}

# Find all docx files
$docxFiles = Get-ChildItem -Path $baseDir -Filter "*.docx" -Recurse | Where-Object { $_.FullName -notlike "*node_modules*" }

Write-Host "Found $($docxFiles.Count) docx files to process"
Write-Host ""

$processed = 0
foreach ($file in $docxFiles) {
    $relativePath = $file.FullName.Substring($baseDir.Length + 1)
    $outputFileName = ($relativePath -replace "\\", "_" -replace "\.docx$", ".txt")
    $outputFilePath = Join-Path $outputPath $outputFileName

    Write-Host "Processing: $relativePath"

    $text = Extract-DocxText -DocxPath $file.FullName

    if ($text) {
        $text | Out-File -FilePath $outputFilePath -Encoding UTF8
        $processed++
        Write-Host "  -> Extracted to: $outputFileName"
    }
    else {
        Write-Host "  -> FAILED to extract"
    }
}

Write-Host ""
Write-Host "Processed $processed of $($docxFiles.Count) files"
Write-Host "Output directory: $outputPath"
