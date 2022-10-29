pipeline {  
  agent any  
	environment {  
	  dotnet = 'C:\\Program Files\\dotnet\\dotnet.exe'  
 	}  
  stages {    
    stage('Build') {  
  	  steps {  
        bat 'dotnet build %WORKSPACE%\\Lab3\\WebAPI\\WebAPI.sln --configuration Release'
      }  
    } 

    stage('Test') {  
      steps {  
        bat 'dotnet test %WORKSPACE%\\Lab3\\WebAPI\\ServicesUnitTests\\ServicesUnitTests.csproj --logger:trx'
      }  
    }
  
    stage("Release"){
      steps {
	      bat 'dotnet build %WORKSPACE%\\Lab3\\WebAPI\\WebAPI.sln /p:PublishProfile=" %WORKSPACE%\\Lab3\\WebAPI\\WebAPI\\Properties\\PublishProfiles\\JenkinsProfile.pubxml" /p:Platform="Any CPU" /p:DeployOnBuild=true /m'
      }
    }
  
    stage('Deploy') {
      steps {
        // Stop IIS
        bat 'net stop "w3svc"'
    
        // Deploy package to IIS
        //bat '"C:\\Program Files (x86)\\IIS\\Microsoft Web Deploy V3\\msdeploy.exe" -verb:sync -source:package="%WORKSPACE%\\jenkins-demo\\HRM\\HRM.API\\bin\\Debug\\net6.0\\HRM.API.zip" -dest:auto -setParam:"IIS Web Application Name"="HRM.Web" -skip:objectName=filePath,absolutePath=".\\\\PackageTmp\\\\Web.config$" -enableRule:DoNotDelete -allowUntrusted=true'
    
        // Start IIS again
        bat 'net start "w3svc"'
      }
    }
  }  
} 