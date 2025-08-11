#!/usr/bin/env groovy

def feishuWebhook( String message ) {
    sh """
        curl -X POST -H \"Content-Type: application/json\" \
          -d \'{"msg_type":"text","content":{"text":"$message"}}\' \
        $FEISHU_WEBHOOK
    """
}

def setBuildStatus( String message, String state, String context) {
    step([
      $class: 'GitHubCommitStatusSetter',
      reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.xsky.com/front-end/eris'],
      contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: context],
      errorHandlers: [[$class: 'ChangingBuildStatusErrorHandler', result: 'UNSTABLE']],
      statusResultSource: [ $class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: message, state: state]] ]
  ])
}

def call() {
    try {
        stage('Pre-Building') {
            cleanWs()
            checkout scm
        }
        stage('Boost node_modules') {
            docker.image('harbor.xsky.com/pluto/node:18-alpine').inside("-v $JENKINS_HOME:$JENKINS_HOME -e JENKINS_HOME") {
                sh './jenkins/boost-node-modules.sh'
            }
        }
        stage('Build') {
            sh 'yarn build && cp -r apps/storybook/storybook-static apps/web/public/'
        }
        // stage('Test') { sh './jenkins/test.sh' }

        stage('Release') {
            sshagent(credentials: ['liu.zhen-xsky-git']) {
                sh """
                    export FEISHU_WEBHOOK=$FEISHU_WEBHOOK
                    git config --global user.name "jenkins"
                    git config --global user.email "liu.zhen@xsky.com"
                    yarn release
                """
            }
        }

        stage('Deploy website') {
            sshagent(credentials: ['2f2f4657-e721-4018-8398-b18587498621', 'liu.zhen-xsky-git']) {
                // TODO: 使用 docker 镜像部署
                sh """
                    # 使用 rsync 将当前目录下的所有文件同步到远程服务器的指定目录，并删除目标目录中已不存在的文件
                    rsync -avzq --delete -e "ssh -o StrictHostKeyChecking=no" ./ root@10.16.187.2:~/eris/

                    # 在服务器上重启服务
                    ssh -o StrictHostKeyChecking=no root@10.16.187.2 'cd ~/eris && yarn && pm2 restart eris-website'
                """
            }
        }

        currentBuild.result = 'SUCCESS'
    } catch (e) {
        if (e.toString() == 'org.jenkinsci.plugins.workflow.steps.FlowInterruptedException') {
            currentBuild.result = 'ABORTED'
        } else {
            currentBuild.result = 'FAILURE'
        }
    } finally {
        if (currentBuild.result != 'SUCCESS') {
            feishuWebhook("[Jenkins][$env.JOB_NAME] FAILURE: $env.BUILD_URL")
            setBuildStatus('Failed', 'FAILURE', 'eris-deploy')
        } else {
            setBuildStatus('Successful', 'SUCCESS', 'eris-deploy')
        }
    }
}

return this
