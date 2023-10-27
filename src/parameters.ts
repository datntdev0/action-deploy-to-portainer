import * as core from '@actions/core'

export type Parameters = {
  portainerHost: string
  portainerApiKey: string
  portainerEnvId: string
  portainerStackName: string
  portainerEnvVars: string
  portainerFilePath: string
}

/**
 * This function retrieves the input parameters required for the action from the GitHub Actions environment.
 * It uses the @actions/core library's getInput method to read these parameters.
 * The 'required' option is set to true for all parameters except 'portainerEnvVars', which is optional.
 *
 * @returns {Parameters} An object containing all the input parameters.
 */
export function getParameters(): Parameters {
  return {
    portainerHost: core.getInput('portainerHost', { required: true }),
    portainerApiKey: core.getInput('portainerApiKey', { required: true }),
    portainerEnvId: core.getInput('portainerEnvId', { required: true }),
    portainerStackName: core.getInput('portainerStackName', { required: true }),
    portainerFilePath: core.getInput('portainerFilePath', { required: true }),
    portainerEnvVars: core.getInput('portainerEnvVars', { required: false })
  }
}
