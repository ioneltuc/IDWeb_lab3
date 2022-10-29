node {
stage 'Checkout'
    cleanWs()
    checkout scm

stage 'Build'
    bat "\"C:/Program Files/dotnet/dotnet.exe\" restore \"${workspace}/WebAPI.sln\""
    bat "\"C:/Program Files/dotnet/dotnet.exe\" build \"${workspace}/WebAPI.sln\""

stage 'UnitTests'
    bat returnStatus: true, script: "\"C:/Program Files/dotnet/dotnet.exe\" test \"${workspace}/WebAPI.sln\" --logger \"trx;LogFileName=unit_tests.xml\" --no-build"
    step([$class: 'MSTestPublisher', testResultsFile:"**/unit_tests.xml", failOnError: true, keepLongStdio: true])
}
