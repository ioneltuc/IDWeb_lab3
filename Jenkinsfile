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
        bat 'dotnet test %WORKSPACE%\\WebAPI\\ServicesUnitTests\\ServicesUnitTests.csproj --logger "junit"'
        junit allowEmptyResults: true, testResults: '**\\TestResults\\**.xml'
      }  
    }
  
    stage('Release'){
      steps {
	      bat 'dotnet build %WORKSPACE%\\WebAPI\\WebAPI.sln /p:PublishProfile=" %WORKSPACE%\\WebAPI\\WebAPI\\Properties\\PublishProfiles\\JenkinsProfile.pubxml" /p:Platform="Any CPU" /p:DeployOnBuild=true /m'
      }
    }

    stage('Workspace clean'){
      steps{
        script{
          if(CLEAN_WORKSPACE == "true"){
            echo "Dir deleted"
            echo "${CLEAN_WORKSPACE}"
          }
          else{
            echo "Dir not deleted"
            echo "${CLEAN_WORKSPACE}"
          }
        }
      }
    } 

    stage('Testing frontend'){
      steps{
        script{
          if(TESTING_FRONTEND == "true"){
            echo "${TESTING_FRONTEND}"
          }
        }
      }
    }
  } 
}