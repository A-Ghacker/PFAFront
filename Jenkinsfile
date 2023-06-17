pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('self monitoring') {
            steps {
                sh 'pwd'
                sh 'ls -alihs'
                sh 'node -v'
                sh "printenv | sort"
            }
        }
        stage('Build') {
            steps {
                sh 'npm i --legacy-peer-deps'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('start'){
            steps {
                sh 'npm start'
            }
        }
    }
    
    triggers {
        pollSCM('*/5 * * * *') // Vérifie les modifications du référentiel toutes les 5 minutes
    }
    
    post {
        always {
            emailext body: "Le build Jenkins a été effectué avec succès.", 
                     subject: "Build Jenkins réussi",
                     to: "anaskmiha52@gmail.com"
        }
        failure {
            emailext body: "Le build Jenkins a échoué. Veuillez vérifier les erreurs.", 
                     subject: "Échec du build Jenkins",
                     to: "anaskmiha52@gmail.com"
        }
    }
}
