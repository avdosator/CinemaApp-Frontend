pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ahmedhamdo/team3-frontend:latest'
        SERVER_PORT = '8087'
        DOCKER_NETWORK = 'team3-network'
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

        stage('Create .env File') {
            steps {
                echo "Creating .env file in frontend root directory"
                sh """
                echo "VITE_API_BASE_URL=http://63.176.2.136:8082/api" > .env
                """
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
                docker rm -f team3-frontend || true
                docker run -d --name team3-frontend \
                    --network ${DOCKER_NETWORK} \
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
            echo "Frontend build or deployment failed. Check the logs for more details."
        }
    }
}
