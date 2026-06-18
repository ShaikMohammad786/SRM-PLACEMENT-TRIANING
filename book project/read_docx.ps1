$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("m:\MOHAMMAD\Placement Training\MERN STACK\book project\frontend-bookProject.docx")
$text = $doc.Content.Text
$doc.Close()
$word.Quit()
Write-Output $text
