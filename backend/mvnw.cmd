@echo off
setlocal

:: Set JAVA_HOME if not already in environment
if "%JAVA_HOME%"=="" (
    if exist "C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot" (
        set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot"
    )
)

if not "%JAVA_HOME%"=="" (
    set "PATH=%JAVA_HOME%\bin;%PATH%"
)

:: Locate Maven executable
set "MVN_EXE=mvn"
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Users\amans\.m2\wrapper\dists\apache-maven-3.6.3-bin\1iopthnavndlasol9gbrbg6bf2\apache-maven-3.6.3\bin\mvn.cmd" (
        set "MVN_EXE=C:\Users\amans\.m2\wrapper\dists\apache-maven-3.6.3-bin\1iopthnavndlasol9gbrbg6bf2\apache-maven-3.6.3\bin\mvn.cmd"
    )
)

call "%MVN_EXE%" %*
