// pipeline {
//   agent 'any'
//   stages {
//     stage('Environment') {
//       steps {
//           echo "PATH = ${PATH}"
//       }
//     }
    
//     stage('Dependencies') {
//       steps {
//         sh(script: 'dotnet restore')
//       }
//     }
    
//     stage('Build') {
//       steps {
//         sh(script: 'dotnet build --configuration Release', returnStdout: true)
//       }
//     }
    
//     stage('Test') {
//       steps {
//         sh(script: 'dotnet test -l:trx || true')        
//       }
//     }
//   }
// }
pipeline {
    agent any
    stages { 
        stage('Example Username/Password') {
            environment {
                SERVICE_CREDS = credentials('my-predefined-username-password')
            }
            steps {
                sh 'echo "Service user is $SERVICE_CREDS_USR"'
                sh 'echo "Service password is $SERVICE_CREDS_PSW"'
                sh 'curl -u $SERVICE_CREDS https://myservice.example.com'
            }
        }
    } 
}
