node {
stage 'Checkout'
    cleanWs()
    checkout scm

stage 'Build'
    bat "\"C:/Program Files/dotnet/dotnet.exe\" restore "C:\Users\tenti\Desktop\AngularDotnetCore\WebAPI\WebAPI.sln""
    bat "\"C:/Program Files/dotnet/dotnet.exe\" build "C:\Users\tenti\Desktop\AngularDotnetCore\WebAPI\WebAPI.sln""

stage 'UnitTests'
    bat returnStatus: true, script: "\"C:/Program Files/dotnet/dotnet.exe\" test "C:\Users\tenti\Desktop\AngularDotnetCore\WebAPI\WebAPI.sln" --logger \"trx;LogFileName=unit_tests.xml\" --no-build"
    step([$class: 'MSTestPublisher', testResultsFile:"**/unit_tests.xml", failOnError: true, keepLongStdio: true])
}
