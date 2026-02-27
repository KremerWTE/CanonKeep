$word = New-Object -ComObject Word.Application
$word.Visible = $false

$doc = $word.Documents.Open("C:\Users\Chris Kremer\Documents\GitHub\five-feet-from-home\Harper COO transition story.docx")
$text = $doc.Content.Text
$doc.Close()

Write-Output "===== HARPER COO TRANSITION STORY ====="
Write-Output $text
Write-Output ""

$doc = $word.Documents.Open("C:\Users\Chris Kremer\Documents\GitHub\five-feet-from-home\Harper Story ideas.docx")
$text = $doc.Content.Text
$doc.Close()

Write-Output "===== HARPER STORY IDEAS ====="
Write-Output $text
Write-Output ""

$doc = $word.Documents.Open("C:\Users\Chris Kremer\Documents\GitHub\five-feet-from-home\Bella's Background Pre-BSS.docx")
$text = $doc.Content.Text
$doc.Close()

Write-Output "===== BELLA'S BACKGROUND PRE-BSS ====="
Write-Output $text
Write-Output ""

$doc = $word.Documents.Open("C:\Users\Chris Kremer\Documents\GitHub\five-feet-from-home\Bella work schedule.docx")
$text = $doc.Content.Text
$doc.Close()

Write-Output "===== BELLA WORK SCHEDULE ====="
Write-Output $text

$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
