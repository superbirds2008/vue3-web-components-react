pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest' // 本地 Docker 镜像名称
        DOCKER_IMAGE_FILE = 'react-app.tar' // 导出的 Docker 镜像文件名
        TEST_SERVER = 'your-test-server' // 替换为测试服务器地址
        // GITHUB_TOKEN = credentials('wwwin-personal-token') // GitHub 访问令牌 
        NPM_PROXY = 'http://proxy.esl.cisco.com:80' // 替换为实际的 npm 代理地址
        GITHUB_REPO = 'https://wwwin-github.cisco.com/GX-GC-Automation-Dev-Team/cicd-poc' // 替换为实际的 GitHub 仓库地址
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
        stage('Build Vue Web Component') {
            steps {
                dir('vue-web-component') {
                    // 安装依赖并构建
                    sh "npm config set proxy ${NPM_PROXY}"
                    sh "npm config set https-proxy ${NPM_PROXY}"
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        // stage('Upload Vue Release to GitHub') {
        //     steps {
        //         script {
        //             // 创建一个压缩包
        //             sh 'mkdir -p release'
        //             sh 'tar -czf release/vue-web-component-${GIT_TAG}.tar.gz -C vue-web-component/dist .'

        //             // 上传到 GitHub Release
        //             sh """
        //             curl -H "Authorization: token ${GITHUB_TOKEN}" \
        //                  -H "Content-Type: application/json" \
        //                  -X POST \
        //                  -d '{
        //                      "tag_name": "${GIT_TAG}",
        //                      "target_commitish": "main",
        //                      "name": "${GIT_TAG}",
        //                      "body": "Release for ${GIT_TAG}",
        //                      "draft": false,
        //                      "prerelease": false
        //                  }' \
        //                  https://api.github.com/repos/<your-username>/<your-repo>/releases
        //             """

        //             // 获取 Release ID
        //             def releaseId = sh(script: """
        //             curl -H "Authorization: token ${GITHUB_TOKEN}" \
        //                  -H "Content-Type: application/json" \
        //                  https://api.github.com/repos/<your-username>/<your-repo>/releases/tags/${GIT_TAG} | jq -r '.id'
        //             """, returnStdout: true).trim()

        //             // 上传文件到 Release
        //             sh """
        //             curl -H "Authorization: token ${GITHUB_TOKEN}" \
        //                  -H "Content-Type: application/gzip" \
        //                  --data-binary @release/vue-web-component-${GIT_TAG}.tar.gz \
        //                  https://uploads.github.com/repos/<your-username>/<your-repo>/releases/${releaseId}/assets?name=vue-web-component-${GIT_TAG}.tar.gz
        //             """
        //         }
        //     }
        // }
        // stage('Build React App') {
        //     steps {
        //         dir('react-app') {
        //             // 安装依赖并构建
        //             sh 'npm install'
        //             sh 'npm run build'
        //         }
        //     }
        // }
        // stage('Build Docker Image') {
        //     steps {
        //         dir('react-app') {
        //             // 创建一个简单的 npm web server Dockerfile
        //             writeFile file: 'Dockerfile', text: '''
        //             FROM node:16-alpine
        //             WORKDIR /app
        //             COPY dist /app
        //             RUN npm install -g serve
        //             CMD ["serve", "-s", "."]
        //             EXPOSE 5000
        //             '''
        //             // 构建 Docker 镜像
        //             sh "docker build -t ${DOCKER_IMAGE} ."
        //         }
        //     }
        // }
        // stage('Export Docker Image') {
        //     steps {
        //         // 导出 Docker 镜像为文件
        //         sh "docker save -o ${DOCKER_IMAGE_FILE} ${DOCKER_IMAGE}"
        //     }
        // }
        // stage('Transfer Docker Image to Test Server') {
        //     steps {
        //         // 将导出的 Docker 镜像文件传输到测试服务器
        //         sshagent(['your-ssh-credentials-id']) {
        //             sh "scp ${DOCKER_IMAGE_FILE} user@${TEST_SERVER}:/tmp/"
        //         }
        //     }
        // }
        // stage('Load and Run Docker Image on Test Server') {
        //     steps {
        //         // 在测试服务器上加载并运行 Docker 镜像
        //         sshagent(['your-ssh-credentials-id']) {
        //             sh """
        //             ssh user@${TEST_SERVER} "
        //                 docker load -i /tmp/${DOCKER_IMAGE_FILE} &&
        //                 docker stop react-app || true &&
        //                 docker rm react-app || true &&
        //                 docker run -d --name react-app -p 5000:5000 ${DOCKER_IMAGE}
        //             "
        //             """
        //         }
        //     }
        // }
    }
    // post {
    //     always {
    //         // 清理工作区
    //         cleanWs()
    //     }
    // }
}