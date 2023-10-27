/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Stack {
  Id: number
  Name: string
  Type: number
  EndpointId: number
  SwarmId: string
  EntryPoint: string
  Env: Env[]
  ResourceControl: ResourceControl
  Status: number
  ProjectPath: string
  CreationDate: number
  CreatedBy: string
  UpdateDate: number
  UpdatedBy: string
  AdditionalFiles: any
  AutoUpdate: any
  Option: any
  GitConfig: any
  FromAppTemplate: boolean
  Namespace: string
  IsComposeFormat: boolean
}

export interface Env {
  name: string
  value: string
}

export interface ResourceControl {
  Id: number
  ResourceId: string
  SubResourceIds: any[]
  Type: number
  UserAccesses: any[]
  TeamAccesses: any[]
  Public: boolean
  AdministratorsOnly: boolean
  System: boolean
}
