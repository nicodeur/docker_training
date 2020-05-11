
def buildAndPushDocker(workingdir, appname) {
    withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB_CREDENTIAL', passwordVariable: 'DOCKER_HUB_PWD', usernameVariable: 'DOCKER_HUB_LOGIN')]) {
        sh "cd $workingdir && docker build -t $appname . && " +
                "docker tag $appname $DOCKER_HUB_LOGIN/$appname:latest && " +
                "docker login --username $DOCKER_HUB_LOGIN --password $DOCKER_HUB_PWD && " +
                "docker push $DOCKER_HUB_LOGIN/$appname:latest"
    }
}

def helm(opt, namespace) {
    withCredentials([file(credentialsId: 'CONFIG_K8S', variable: 'CONFIG_K8S')]) {
        sh "mkdir ~/.kube"
        dir('/root/~/.kube') {
            sh "use $CONFIG_K8S && ls"
        }
        sh "helm $opt"
    }
}


def deploy() {
    helm("upgrade tuto-helm tuto-helm", 'nicolas')
}

pipeline {
    agent none
    stages {
        stage("Build Docker") {
            parallel {
                stage('database') {
                    agent any
                    steps {
                        buildAndPushDocker('bdd', 'k8s-bdd')
                    }
                }
                stage('api') {
                    agent any
                    steps {
                        buildAndPushDocker('tutoapi', 'k8s-api')
                    }
                }
            }
        }

        stage('Deploy on K8s') {
            agent {
                docker {
                    image 'alpine/helm:latest'
                    args '--entrypoint ""'
                }
            }
            steps {
                deploy()
            }
        }
    }
}
