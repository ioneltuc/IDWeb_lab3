pipeline {  

  agent any  

	environment {  
    ON_SUCCESS_SEND_EMAIL = "true"
    ON_FAILURE_SEND_EMAIL = "true"
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
            deleteDir()
          }
        }
      }
    } 

    stage('Testing frontend'){
      steps{
        script{
          if(TESTING_FRONTEND == "true"){
            echo "TESTING_FRONTEND: ${TESTING_FRONTEND}"
          }
        }
      }
    }

    stage('Email send'){
      steps{
        script{
          if(currentBuild.result == null || currentBuild.result == 'SUCCESS' ){
            ON_FAILURE_SEND_EMAIL = "false"
          }
          else{
            ON_SUCCESS_SEND_EMAIL = "false"
          }

          if(ON_SUCCESS_SEND_EMAIL == "true"){
            echo "email: build succes ${JOB_NAME}, ${BUILD_NUMBER}, ${BUILD_URL}"
          }else if(ON_FAILURE_SEND_EMAIL == "true"){
            echo "email: build fail ${JOB_NAME}, ${BUILD_NUMBER}, ${BUILD_URL}"
          }
        } 
      }
    }
    
  } 
}