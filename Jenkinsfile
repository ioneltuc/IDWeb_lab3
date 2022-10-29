pipeline {
  agent 'any'
  stages {
    stage('Environment') {
      steps {
          echo "PATH = ${PATH}"
      }
    }

    stage('Build') {
      steps {
        sh(script: 'dotnet build --configuration Release', returnStdout: true)
      }
    }
    
    stage('Test') {
      steps {
        sh(script: 'dotnet test -l:trx || true')        
      }
    }
  }
}
