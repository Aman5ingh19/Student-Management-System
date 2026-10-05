# PowerShell helper for running maven
if (-not $env:JAVA_HOME -and (Test-Path "C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot")) {
    $env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot"
}
if ($env:JAVA_HOME) {
    $env:Path = "$env:JAVA_HOME\bin;" + $env:Path
}

$mvnCmd = "mvn"
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    $localMvn = "C:\Users\amans\.m2\wrapper\dists\apache-maven-3.6.3-bin\1iopthnavndlasol9gbrbg6bf2\apache-maven-3.6.3\bin\mvn.cmd"
    if (Test-Path $localMvn) {
        $mvnCmd = $localMvn
    }
}

& $mvnCmd $args
