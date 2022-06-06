import {
  ProtocolRequestType,
  ProtocolNotificationType,
} from 'vscode-languageserver-protocol'
import * as MonacoTypes from 'monaco-editor/esm/vs/editor/editor.api'
import {Fluxdocs} from 'src/client/fluxdocsdRoutes'

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

export const executeCommand = (
  command: ExecuteCommand,
  arg: {data: LspInjectPayload; position: MonacoTypes.Position}
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
// TODO: will we have fields and tags as separate inject commands?
export enum ExecuteCommand {
  InjectFunction = 'injectFunction',
  InjectionBucket = 'injectBucket',
  InjectCsvSample = 'injectCsvSample',
  InjectionMeasurement = 'injectMeasurement',
  InjectTag = 'injectTag',
  InjectTagValue = 'injectTagValue',
}

export type LspInjectPayload = Fluxdocs
