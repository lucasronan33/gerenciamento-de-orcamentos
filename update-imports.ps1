$srcPath = "c:\Users\Lucas Torres\Documents\Cursos\curso JS\gerenciamento-de-orcamentos\src"
$jsxFiles = Get-ChildItem -Path $srcPath -Filter "*.jsx" -Recurse
$totalUpdates = 0

foreach ($file in $jsxFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Padrao 1: ./arquivo.js
    $content = $content -replace 'from\s+([''"])(\./[^''"]*)\.js\1', 'from $1$2.jsx$1'
    
    # Padrao 2: ../arquivo.js  
    $content = $content -replace 'from\s+([''"])(\.\./[^''"]*)\.js\1', 'from $1$2.jsx$1'
    
    # Padrao 3: ../../../arquivo.js (multiplos ..)
    $content = $content -replace 'from\s+([''"])((?:\.\./)+[^''"]*)\.js\1', 'from $1$2.jsx$1'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        $totalUpdates++
    }
}

Write-Host "Atualizados: $totalUpdates arquivos .jsx"
