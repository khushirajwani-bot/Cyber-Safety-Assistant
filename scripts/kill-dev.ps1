# Kill any process using port 3000
$port = 3000
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess
if ($process) {
    Write-Host "Killing process $process on port $port"
    Stop-Process -Id $process -Force
} else {
    Write-Host "No process found on port $port"
}
