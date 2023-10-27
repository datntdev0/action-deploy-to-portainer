import * as core from '@actions/core'
import PortainerApiInstance from './portainer-api'
import { getParameters } from './parameters'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const params = getParameters()
    const apiInstance = new PortainerApiInstance(params)

    // Get existing stack
    core.info('Getting existing stack...')
    const stackList = await apiInstance.getStackListAsync()

    // Delete existing stack
    core.info('Deleting existing stack...')
    const deleteRequests = stackList
      .filter(x => x.Name.includes(params.portainerStackName))
      .map(async x => apiInstance.deleteStackAsync(x.Id))
    await Promise.all(deleteRequests)

    // Deploy new stack
    core.info('Deploying new stack...')
    await apiInstance.postStandaloneStackFromFile()

    core.info('Done!')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
