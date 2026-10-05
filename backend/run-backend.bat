@echo off
setlocal

echo ====================================================
echo Starting Student Management System - Spring Boot Backend
echo ====================================================

:: Detect JAVA_HOME if not already set
if "%JAVA_HOME%"=="" (
    if exist "C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot" (
        set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot"
    ) else if exist "C:\Program Files\Java\jdk-21" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-21"
    ) else if exist "C:\Program Files\Eclipse Adoptium\jdk-21" (
        set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21"
    )
)

if not "%JAVA_HOME%"=="" (
    set "PATH=%JAVA_HOME%\bin;%PATH%"
    echo Using JAVA_HOME: %JAVA_HOME%
)

:: Detect Maven command
set MAVEN_CMD=mvn
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Users\amans\.m2\wrapper\dists\apache-maven-3.6.3-bin\1iopthnavndlasol9gbrbg6bf2\apache-maven-3.6.3\bin\mvn.cmd" (
        set "MAVEN_CMD=C:\Users\amans\.m2\wrapper\dists\apache-maven-3.6.3-bin\1iopthnavndlasol9gbrbg6bf2\apache-maven-3.6.3\bin\mvn.cmd"
    )
)

echo Running: "%MAVEN_CMD%" spring-boot:run
call "%MAVEN_CMD%" spring-boot:run

pause
