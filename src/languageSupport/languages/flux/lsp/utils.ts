import {
  ProtocolRequestType,
  ProtocolNotificationType,
} from 'vscode-languageserver-protocol'
import * as MonacoTypes from 'monaco-editor/esm/vs/editor/editor.api'
import {FluxDocs} from 'src/types'

export const makeRequestType = (method: string) => {
  return new ProtocolRequestType<any, any, any, any, any>(method)
}

export const makeNotificationType = (method: string) => {
  return new ProtocolNotificationType<any, any>(method)
}

const JSONRPC = '2.0',
  FLUXLANGID = 'flux'

const createNotification = (method: string, params: object = {}) => {
  return {
    jsonrpc: JSONRPC,
    method,
    params,
  }
}

export const didChange = (uri: string, text: string, version: number) => {
  return createNotification(Methods.didChange, {
    contentChanges: [{text}],
    textDocument: {
      uri,
      version,
    },
  })
}

export const didOpen = (uri: string, text: string, version: number) => {
  return createNotification(Methods.didOpen, {
    textDocument: {
      uri,
      languageId: FLUXLANGID,
      version,
      text,
    },
  })
}

interface ExecuteCommandParams {
  textDocument: {
    uri: string
    position: MonacoTypes.Position
  }
}

export interface ExecuteCommandInjectTag extends ExecuteCommandParams {
  name: string
  bucket?: string
}

export interface ExecuteCommandInjectTagValue extends ExecuteCommandInjectTag {
  value: string
}

export type ExecuteCommandInjectField = ExecuteCommandInjectTag

// TODO: LSP contract is not yet decided to this one.
export interface ExecuteCommandInjectFunction extends ExecuteCommandParams {
  data: FluxDocs
}

export type ExecuteCommandArgument =
  | ExecuteCommandInjectTag
  | ExecuteCommandInjectTagValue
  | ExecuteCommandInjectField
  | ExecuteCommandInjectFunction

export const executeCommand = (
  command: ExecuteCommand,
  arg: ExecuteCommandArgument
) => {
  return createNotification(Methods.ExecuteCommand, {
    command,
    arguments: [arg],
    workDoneProgressParams: {
      workDoneToken: null,
    },
  })
}

export enum Methods {
  Initialize = 'initialize',
  Initialized = 'initialized',
  CompletionResolve = 'completionItem/resolve',
  Completion = 'textDocument/completion',
  Definition = 'textDocument/definition',
  didChange = 'textDocument/didChange',
  didOpen = 'textDocument/didOpen',
  didSave = 'textDocument/didSave',
  Highlight = 'textDocument/documentHighlight',
  Symbol = 'textDocument/documentSymbol',
  FoldingRange = 'textDocument/foldingRange',
  Hover = 'textDocument/hover',
  References = 'textDocument/references',
  Rename = 'textDocument/rename',
  ExecuteCommand = 'workspace/executeCommand',
}

// TODO: import from LSP?
export enum ExecuteCommand {
  InjectFunction = 'injectFunction',
  // InjectionBucket = 'injectBucket',
  // InjectCsvSample = 'injectCsvSample',
  // InjectionMeasurement = 'injectMeasurement',
  InjectField = 'injectFieldFilter',
  InjectTag = 'injectTagFilter',
  InjectTagValue = 'injectTagValueFilter',
}
