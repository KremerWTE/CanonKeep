$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("C:\Users\Chris Kremer\Documents\GitHub\five-feet-from-home\Bella's Background Pre-BSS.docx")
$text = $doc.Content.Text
$doc.Close()
$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
$text | Out-File -FilePath "C:\Users\Chris Kremer\Documents\GitHub\five-feet-from-home\bella_bg.txt" -Encoding UTF8
