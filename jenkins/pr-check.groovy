/* JenkinsFile */
def feishuWebhook( String message ) {
    sh """
        curl -X POST -H \"Content-Type: application/json\" \
          -d \'{"msg_type":"text","content":{"text":"$message"}}\' \
        $FEISHU_WEBHOOK
    """
}

def call() {
    ws("/root/jenkins/workspace/eris-pr-check/$env.BUILD_NUMBER") {
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
            stage('Unit Test') {
                sh 'yarn run ut:coverage'
            }
            stage('Build') { 
                sh 'yarn build'
            }
            stage('Visual Test') {
                docker.image('mcr.microsoft.com/playwright:v1.49.1').inside() {
                    sh 'yarn run test-storybook:ci'
                }
            }
            // stage('Storybook Testing') { sh './jenkins/test.sh' }
                
            currentBuild.result = 'SUCCESS'
        } catch (e) {
            if (e.toString() == 'org.jenkinsci.plugins.workflow.steps.FlowInterruptedException') {
                currentBuild.result = 'ABORTED'
            } else {
                currentBuild.result = 'FAILURE'
            }
        } finally {
            sh 'yarn run cp:vt-actual'
            sh 'yarn run reg-cli'
            echo "视觉回归测试报告地址: https://jenkins.xsky.com/job/eris-pr-check/$env.BUILD_NUMBER/execution/node/10/ws/apps/storybook/report/visual-report.html"
            if (currentBuild.result != 'SUCCESS') {
                feishuWebhook("[Jenkins][$env.JOB_NAME] FAILURE: $env.BUILD_URL");
                setGitHubPullRequestStatus context:'eris-pr-check', message:'Failed', state:'FAILURE'
            } else {
                setGitHubPullRequestStatus context:'eris-pr-check', message:'Successful', state:'SUCCESS'
            }
        }
    }
}

return this
