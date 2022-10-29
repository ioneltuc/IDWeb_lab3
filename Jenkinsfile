pipeline {  
  agent any  
	environment {  
	  dotnet = 'C:\\Program Files\\dotnet\\dotnet.exe'  
 	}  
  stages {    
    stage('Build') {  
  	  steps {  
        bat 'dotnet build %WORKSPACE%\\WebAPI\\WebAPI.sln --configuration Release'
      }  
    } 

    stage('Test') {  
      steps {  
        bat 'dotnet test %WORKSPACE%\\WebAPI\\ServicesUnitTests\\ServicesUnitTests.csproj --logger "junit;LogFilePath=TestResults\\testResults.xml"'
      }  
    }
  
    stage("Release"){
      steps {
	      bat 'dotnet build %WORKSPACE%\\WebAPI\\WebAPI.sln /p:PublishProfile=" %WORKSPACE%\\WebAPI\\WebAPI\\Properties\\PublishProfiles\\JenkinsProfile.pubxml" /p:Platform="Any CPU" /p:DeployOnBuild=true /m'
      }
    }
  }  
} 