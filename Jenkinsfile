pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'id_github', url: 'https://github.com/nirajgeorgian/opscale.git']]])
                sh 'ls -la'
            }
        }
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Run') {
            steps {
                echo 'here we have to run build.'
            }
        }
    }
		post {
			success {
				sh 'echo Build and deploy success'
			}
		}
}
