import path from 'path'
import fs from 'fs'

/**
 * This function takes a relative file path, constructs the absolute path by joining it with the GITHUB_WORKSPACE environment variable,
 * reads the file from the constructed path, and returns a new Blob object containing the file data.
 *
 * @param {string} relativePath - The relative path of the file.
 * @returns {Blob} - A Blob object containing the file data.
 */
export function getFileBlob(relativePath: string): Blob {
  const filePath = path.join(
    process.env.GITHUB_WORKSPACE as string,
    relativePath
  )
  return new Blob([fs.readFileSync(filePath)])
}
