import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import hudson.tasks.test.AbstractTestResultAction;
import hudson.model.Actionable;


pipeline {
  agent any
  stages {
    stage('Environment Setup') {
      steps {
        script {
          echo "Loading Environment variables from file pipeline-conf.yml ..."
          pipelineConf = readYaml file: "pipeline-conf.yml"
          for(envVar in pipelineConf.envVars) {
            env.setProperty(envVar.key, envVar.value)
            echo "${envVar.key} - ${envVar.value}"
          }


          sh 'env'
        }

      }
    }

    stage('Build') {
      when {
        expression {
          !params.SKIP_BUILD
        }
      }
      steps {
        script {
          echo "Clean ..."
          sh "npm prune"
          echo "Install dependency ..."
          sh "npm install --unsafe-perm"
          echo "Building project"
          sh "npm run build --if-present"
        }

      }
    }

    stage('Unit test') {
      steps {
        echo "Test ${env.PROJECT_NAME}..."
      }
    }

    stage('Deploy') {
      steps {
         echo "Deploy ${env.PROJECT_NAME}..."
      }
    }

  }    
  post {
        always {
            script { 

                def buildStatus = currentBuild.result == null ? "SUCCESS" : currentBuild.result.toUpperCase()
                def commit = sh(returnStdout: true, script: 'git rev-parse HEAD')
                def author = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${commit}").trim()
                def commitMsg = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
                def title = "Job ${env.JOB_NAME} - Build: ${env.BUILD_NUMBER}"
                def title_link = "${env.RUN_DISPLAY_URL}"
                def subject = "*${buildStatus}:* `${env.JOB_NAME} #${env.BUILD_NUMBER}` (<${env.RUN_DISPLAY_URL}|Open>) (<${env.RUN_CHANGES_DISPLAY_URL}|  Changes>)"
                def branchName = "${env.BRANCH_NAME}"

                if (buildStatus == 'SUCCESS') {
                        color = 'good'
                } else if (buildStatus == 'ABORTED') {
                        color = 'warning'
                } else {
                        color = 'danger'
                }

                JSONObject attachment = new JSONObject();
                attachment.put('title', title.toString());
                attachment.put('title_link',title_link.toString());
                attachment.put('text', subject.toString());
                attachment.put('color',color);
                attachment.put('mrkdwn_in', ["fields"])
                // JSONObject for branch
                JSONObject branch = new JSONObject();
                branch.put('title', 'Branch');
                branch.put('value', branchName.toString());
                branch.put('short', true);
                // JSONObject for author
                JSONObject commitAuthor = new JSONObject();
                commitAuthor.put('title', 'Author');
                commitAuthor.put('value', author.toString());
                commitAuthor.put('short', true);
                // JSONObject for branch
                JSONObject commitMessage = new JSONObject();
                commitMessage.put('title', 'Commit Message');
                commitMessage.put('value', commitMsg.toString());
                commitMessage.put('short', false);
                    
                attachment.put('fields', [branch, commitAuthor, commitMessage]);
                JSONArray attachments = new JSONArray();
                attachments.add(attachment);
                    
                slackSend (message: subject, attachments: attachments.toString(), channel: '#deploy')
            }
        }
     }  
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
    timeout(time: 2, unit: 'HOURS')
  }
  parameters {
    booleanParam(name: 'SKIP_BUILD', defaultValue: false, description: 'Skip gradle build stage ?')
    booleanParam(name: 'SKIP_UNIT_TESTS', defaultValue: false, description: 'Skip unit tests ?')
    booleanParam(name: 'SKIP_DEPLOY', defaultValue: false, description: 'Skip deploy stage ?')
    booleanParam(name: 'DRY_RUN', defaultValue: false, description: 'Enable release step')
  }
}