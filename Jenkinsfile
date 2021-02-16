pipeline {
  agent any
 
  tools {nodejs "node"}
  
  stages {
    stage('Prepare') {
      steps {
        sh 'yarn install --mutex network'
      }
    }

    stage('Unit Tests') {
      parallel {
        stage('Logic') {
          steps {
            sh 'yarn test --watchAll=false'
          }
        }

        stage('Syntax & Naming') {
          steps {
            sh 'yarn lint:all'
          }
        }
      }
    }

    stage('Build & Launch') {
      steps {
        sh 'yarn build'
        sh 'yarn build:ssr'
        sh 'yarn start:ssr:bg'
      }
    }

    stage('E2E Tests') {
      steps {
        sh 'yarn e2e'
      }
    }
  }
  post {
    always {
      script {
        try {
          sh 'yarn stop:ssr:bg'
        } catch (err) {
          echo 'Application has already been terminated.'
        }
      }
      script {
        sh 'rm -rf build'
        sh 'rm -rf build-server'
        sh 'rm -rf node_modules'
      }
    }
  }
}