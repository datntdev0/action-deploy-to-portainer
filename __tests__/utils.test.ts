import { Blob } from 'buffer'
import { getFileBlob } from '../src/utils'

describe('getFileBlob', () => {
  beforeEach(() => {
    process.env.GITHUB_WORKSPACE = process.cwd()
  })

  it('should return a Blob with file data', () => {
    const blob = getFileBlob('__tests__/docker-compose.yml')
    expect(blob).toBeInstanceOf(Blob)
  })
})
