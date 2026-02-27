$content = Get-Content "bella_bg.txt" -Raw
$length = $content.Length
$chunkSize = 100000
$chunks = [math]::Ceiling($length / $chunkSize)
for ($i = 0; $i -lt $chunks; $i++) {
    $start = $i * $chunkSize
    $chunk = $content.Substring($start, [math]::Min($chunkSize, $length - $start))
    $chunk | Out-File -FilePath "bella_bg_part$i.txt" -Encoding UTF8
}
