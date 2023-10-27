import * as core from '@actions/core'
import { getParameters } from '../src/parameters'

jest.mock('@actions/core')

describe('getParameters', () => {
  it('should return parameters from core inputs', () => {
    const mockGetInput = jest.spyOn(core, 'getInput')
    mockGetInput.mockImplementation(name => `mock value for ${name}`)

    const parameters = getParameters()

    expect(parameters).toEqual({
      portainerHost: 'mock value for portainerHost',
      portainerApiKey: 'mock value for portainerApiKey',
      portainerEnvId: 'mock value for portainerEnvId',
      portainerStackName: 'mock value for portainerStackName',
      portainerFilePath: 'mock value for portainerFilePath',
      portainerEnvVars: 'mock value for portainerEnvVars'
    })

    expect(mockGetInput).toHaveBeenCalledTimes(6)
    expect(mockGetInput).toHaveBeenCalledWith('portainerHost', {
      required: true
    })
    expect(mockGetInput).toHaveBeenCalledWith('portainerApiKey', {
      required: true
    })
    expect(mockGetInput).toHaveBeenCalledWith('portainerEnvId', {
      required: true
    })
    expect(mockGetInput).toHaveBeenCalledWith('portainerStackName', {
      required: true
    })
    expect(mockGetInput).toHaveBeenCalledWith('portainerFilePath', {
      required: true
    })
    expect(mockGetInput).toHaveBeenCalledWith('portainerEnvVars', {
      required: false
    })

    expect(parameters.portainerHost).toBe('mock value for portainerHost')
    expect(parameters.portainerApiKey).toBe('mock value for portainerApiKey')
    expect(parameters.portainerEnvId).toBe('mock value for portainerEnvId')
    expect(parameters.portainerStackName).toBe(
      'mock value for portainerStackName'
    )
    expect(parameters.portainerFilePath).toBe(
      'mock value for portainerFilePath'
    )
    expect(parameters.portainerEnvVars).toBe('mock value for portainerEnvVars')
  })
})
