pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Run') {
            steps {
                echo 'docker-compose up -d'
            }
        }
    }
		post {
			success {
				sh 'echo Build and deploy success'
			}
		}
}
