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
  } 

  post{
    failure{
      script{
        ON_SUCCESS_SEND_EMAIL = "false"
      }
    }
    success{
      script{
        ON_FAILURE_SEND_EMAIL = "false"
      }
    }
    cleanup{
      script{
        if(ON_SUCCESS_SEND_EMAIL == "true"){
          mail body: "Project name: ${env.JOB_NAME}<br>Build number: ${env.BUILD_NUMBER}<br>Build URL: ${env.BUILD_URL}", 
          charset: 'UTF-8', 
          mimeType: 'text/html', 
          subject: "Jenkins - build was successful", 
          to: "tentiuc.ion@mail.ru";
        }
        else if(ON_FAILURE_SEND_EMAIL == "true"){
          mail body: "Project name: ${env.JOB_NAME}<br>Build number: ${env.BUILD_NUMBER}<br>Build URL: ${env.BUILD_URL}",
          charset: 'UTF-8', 
          mimeType: 'text/html', 
          subject: "Jenkins - build failed", 
          to: "tentiuc.ion@mail.ru";
        }
      }
    }
  }
}