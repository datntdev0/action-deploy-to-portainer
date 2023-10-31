# Portainer Deployment Action

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=datntdev0_action-deploy-to-portainer)

![GitHub Super-Linter](https://github.com/datntdev0/action-deploy-to-portainer/actions/workflows/linter.yml/badge.svg)
![CI](https://github.com/datntdev0/action-deploy-to-portainer/actions/workflows/continuous-integration.yml/badge.svg)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=datntdev0_action-deploy-to-portainer&metric=coverage)](https://sonarcloud.io/summary/new_code?id=datntdev0_action-deploy-to-portainer)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=datntdev0_action-deploy-to-portainer&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=datntdev0_action-deploy-to-portainer)

## Overview

“Portainer Deployment Action” is a GitHub Action that automates the deployment of Docker Compose files to Portainer. It ensures consistent, repeatable deployments and reduces the risk of human error. It’s particularly beneficial for maintaining higher environments where manual deployments can be cumbersome. Enjoy seamless deployments with this action! 😊

## Parameters

The action takes the following parameters:

| Parameter | Description | Required |
| --- | --- | --- |
| `portainerHost` | The host URL of the Portainer instance | Yes |
| `portainerApiKey` | The API key for the Portainer instance | Yes |
| `portainerEnvId` | The environment ID in Portainer where the stack will be deployed | Yes |
| `portainerStackName` | The name of the stack to be deployed in Portainer | Yes |
| `portainerFilePath` | The file path of the Docker Compose file to be deployed | Yes |
| `portainerEnvVars` | Environment variables to be passed to the stack | No |

## Usage

Here's an example of how to use this action in a GitHub workflow:

```yaml
name: Deploy to Portainer
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Deploy to Portainer
        uses: datntdev0/action-deploy-to-portainer@v0.1.0
        with:
          portainerHost: ${{ secrets.PORTAINER_HOST }}
          portainerApiKey: ${{ secrets.PORTAINER_API_KEY }}
          portainerEnvId: ${{ secrets.PORTAINER_ENV_ID }}
          portainerStackName: 'my-app'
          portainerFilePath: './docker-compose.yml'
          portainerEnvVars: '[{"name": "name", "value": "value"}]'
```

In this example, the action is triggered whenever there’s a push to the main branch. It checks out your code and then uses your action to deploy a Docker Compose file to Portainer. The necessary parameters are passed to the action, with sensitive information like the host URL and API key being stored as GitHub secrets.
