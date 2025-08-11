node(label: 'Eris') {
    checkout scm
    if (env.JOB_NAME.contains('eris-pr-check')) {
        load('jenkins/pr-check.groovy')()
    } else if (env.JOB_NAME.contains('eris-deploy')) {
        load('jenkins/deploy.groovy')()
    }
}
