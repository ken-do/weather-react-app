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

    stage('Clean Up') {
      steps {
        sh 'yarn stop:ssr:bg'
        sh 'rm -rf node_modules'
      }
    }

  }
}