# GitHub Action to create a task with Microsoft Graph using MSAL

This action creates a planner task and assigns it to a user. This action can be used when say for example a pull request is created and some one has to review it. The task that gets created will have some details about the pull request.

## Pre requisites

This action uses Microsoft Graph to create a task. So please make sure that you [register an application in Azure AD](https://docs.microsoft.com/en-us/graph/auth-register-app-v2), provide that app `Tasks.ReadWrite.All` permissions and create a client secret for that.

In your GitHub repo [create 4 secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) with the following information:

* CLIENT_ID - The Id of the app registration created above
* CLIENT_SECRET - A secret of the app registration created above.
* TENANT_ID - The Id of your Microsoft 365 tenant
* PLAN_ID - The Id planner plan where the task will be created