import * as core from '@actions/core'
import { run } from '../src/main'
import { Stack } from '../src/models'
import PortainerApiInstance from '../src/portainer-api'

jest.mock('@actions/core')
jest.mock('../src/portainer-api')

describe('run', () => {
  const mockGetInput = jest.spyOn(core, 'getInput')
  const mockSetFailed = jest.spyOn(core, 'setFailed')
  const mockGetStackListAsync = jest.fn()
  const mockDeleteStackAsync = jest.fn()
  const mockPostStandaloneStackFromFile = jest.fn()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parameters: any = {
    portainerHost: 'mock host',
    portainerApiKey: 'mock api key',
    portainerEnvId: 'mock env id',
    portainerStackName: 'mock stack name',
    portainerFilePath: 'mock file path',
    portainerEnvVars: 'mock env vars'
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockGetInput.mockImplementation(name => parameters[name])
    ;(PortainerApiInstance as jest.Mock).mockImplementation(() => ({
      getStackListAsync: mockGetStackListAsync,
      deleteStackAsync: mockDeleteStackAsync,
      postStandaloneStackFromFile: mockPostStandaloneStackFromFile
    }))
  })

  it('should get parameters, get stack list, delete stack, and post standalone stack', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mockStacks: Stack[] = [{ Id: 123, Name: 'mock stack name' }]
    mockGetStackListAsync.mockResolvedValueOnce(mockStacks)

    await run()

    expect(mockGetInput).toHaveBeenCalledTimes(6)
    expect(PortainerApiInstance).toHaveBeenCalledWith(parameters)
    expect(mockGetStackListAsync).toHaveBeenCalledTimes(1)
    expect(mockDeleteStackAsync).toHaveBeenCalledWith(123)
    expect(mockPostStandaloneStackFromFile).toHaveBeenCalledTimes(1)
  })

  it('should set failed when an error occurs', async () => {
    const error = new Error('mock error')
    mockGetStackListAsync.mockRejectedValueOnce(error)

    await run()

    expect(mockSetFailed).toHaveBeenCalledWith(error.message)
  })
})
