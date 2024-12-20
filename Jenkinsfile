pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ahmedhamdo/cinemaapp-frontend:latest'
        SERVER_PORT = '82'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Cloning frontend repository"
                git branch: 'develop',
                    url: 'https://github.com/avdosator/CinemaApp-Frontend.git',
                    credentialsId: 'gh-token2'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building frontend Docker image"
                sh """
                docker build -t ${FRONTEND_IMAGE} .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Pushing frontend Docker image to Docker Hub"
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                    sh "docker push ${FRONTEND_IMAGE}"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Deploying frontend container on port ${SERVER_PORT}"
                sh """
                docker rm -f cinemaapp-frontend || true
                docker run -d --name cinemaapp-frontend \
                    -p ${SERVER_PORT}:80 \
                    ${FRONTEND_IMAGE}
                """
            }
        }
    }

    post {
        success {
            echo "Frontend build, push, and deployment completed successfully!"
        }
        failure {
            echo "Frontend build or deployment failed."
        }
    }
}
