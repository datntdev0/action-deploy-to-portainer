/* eslint-disable @typescript-eslint/ban-ts-comment */
import PortainerApiInstance from '../src/portainer-api'
import { Stack } from '../src/models'
import { Parameters } from '../src/parameters'
import * as utils from '../src/utils'

jest.mock('../src/utils')

describe('PortainerApiInstance', () => {
  const parameters: Parameters = {
    portainerHost: 'mock host',
    portainerApiKey: 'mock api key',
    portainerEnvId: 'mock env id',
    portainerStackName: 'mock stack name',
    portainerFilePath: 'mock file path',
    portainerEnvVars: 'mock env vars'
  }

  const mockFetch = jest.fn()
  global.fetch = mockFetch

  const mockGetFileBlob = jest.spyOn(utils, 'getFileBlob')
  mockGetFileBlob.mockReturnValue(new Blob(['mock file data']))

  const instance = new PortainerApiInstance(parameters)

  it('should get stack list', async () => {
    // @ts-ignore
    const mockStacks: Stack[] = [{}]
    mockFetch.mockResolvedValueOnce({
      json: async () => Promise.resolve(mockStacks)
    })

    const stacks = await instance.getStackListAsync()

    expect(stacks).toEqual(mockStacks)
    expect(mockFetch).toHaveBeenCalledWith(
      `${parameters.portainerHost}/api/stacks?filters={"EndpointID":2,"IncludeOrphanedStacks":true}`,
      expect.anything()
    )
  })

  it('should delete stack', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true })

    await instance.deleteStackAsync(123)

    expect(mockFetch).toHaveBeenCalledWith(
      `${parameters.portainerHost}/api/stacks/123?endpointId=${parameters.portainerEnvId}`,
      expect.objectContaining({ method: 'DELETE' })
    )
  })

  it('should post standalone stack from file', async () => {
    // @ts-ignore
    const mockStack: Stack = {}
    mockFetch.mockResolvedValueOnce({
      json: async () => Promise.resolve(mockStack)
    })

    const stack = await instance.postStandaloneStackFromFile()

    expect(stack).toEqual(mockStack)
    expect(mockFetch).toHaveBeenCalledWith(
      `${parameters.portainerHost}/api/stacks/create/standalone/file?endpointId=${parameters.portainerEnvId}`,
      expect.objectContaining({ method: 'POST' })
    )
    expect(mockGetFileBlob).toHaveBeenCalledWith(parameters.portainerFilePath)
  })
})
