pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest' // 本地 Docker 镜像名称
        DOCKER_IMAGE_FILE = 'react-app.tar' // 导出的 Docker 镜像文件名
        TEST_SERVER = 'cx-cicd1' // 替换为测试服务器地址
        GITHUB_TOKEN = credentials('wwwin-github-1') // GitHub 访问令牌 
        NPM_PROXY = 'http://proxy.esl.cisco.com:80' // 替换为实际的 npm 代理地址
        GITHUB_REPO = 'https://wwwin-github.cisco.com/api/v3/repos/CX-GC-Automation-Dev-Team/cicd-poc' // 替换为实际的 GitHub 仓库地址
    }
    stages {
        stage('Verify Git Tag') {
            steps {
                script {
                    // 获取当前的 Git tag
                    def gitTag = sh(script: "git describe --tags --exact-match || echo ''", returnStdout: true).trim()
                    if (!gitTag.startsWith('v')) {
                        error "This pipeline only runs for tags starting with 'v'. Current tag: '${gitTag}'"
                    }
                    echo "Triggered by tag: ${gitTag}"
                    env.GIT_TAG = gitTag // 将 Git tag 存储到环境变量中
                }
            }
        }
        stage('Test and Build') {
            agent {
                docker {
                    image "jacoblincool/playwright:all"
                    args "-u root"
                    reuseNode true
                }
            }
            steps {
                // 打包vue组件
                dir('vue-web-component') {
                    // 安装依赖并构建
                    sh "npm config set proxy ${NPM_PROXY}"
                    sh "npm config set https-proxy ${NPM_PROXY}"
                    sh 'npm install'
                    sh 'npm run build'
                }

                // 对react项目进行lint检查
                dir('react-app') {
                    sh "npm install"
                    sh 'npm run lint'
                }

                // 对react项目进行单元测试
                dir('react-app') {
                    sh 'npm run test'
                }

                // 对react项目进行playwright测试
                // dir('react-app') {
                //     sh 'npm run test:playwright'
                // }

                // 对react项目进行全面测试
                // dir('react-app') {
                //     sh 'npm run test:all'
                // }

                // 对react项目进行打包
                dir('react-app') {
                    sh 'CI=false npm run build'
                    sh 'ls -l'
                    sh 'ls -l public'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                dir('react-app') {
                    // 创建一个简单的 npm web server Dockerfile
                    writeFile file: 'Dockerfile', text: """
                    FROM node:20.18
                    WORKDIR /app
                    COPY public /app
                    RUN npm config set proxy ${NPM_PROXY}
                    RUN npm config set https-proxy ${NPM_PROXY}
                    RUN npm install -g serve
                    CMD ["serve", "-p", "5000", "-s", "."]
                    EXPOSE 5000
                    """
                    // 构建 Docker 镜像
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }
        stage('Export Docker Image') {
            steps {
                // 导出 Docker 镜像为文件
                sh "docker save -o ${DOCKER_IMAGE_FILE} ${DOCKER_IMAGE}"
            }
        }
        stage('Transfer Docker Image to Test Server And Run') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: '${TEST_SERVER}', // Jenkins 中配置的服务器名称
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "${DOCKER_IMAGE_FILE}", // 本地文件路径（支持通配符）
                                    remoteDirectory: '.',        // 远程目录（相对于配置的根目录）
                                    execCommand: """
                                        docker load -i ~/${DOCKER_IMAGE_FILE} &&
                                        docker stop react-app || true &&
                                        docker rm react-app || true &&
                                        docker run -d --name react-app -p 5000:5000 ${DOCKER_IMAGE}
                                    """                            // 远程执行的命令
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
    post {
        always {
            // 清理工作区
            cleanWs()
        }
    }
}