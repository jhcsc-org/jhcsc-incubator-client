/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SensorsImport } from './routes/sensors'
import { Route as RelaysImport } from './routes/relays'
import { Route as IndexImport } from './routes/index'
import { Route as SettingsIndexImport } from './routes/settings/index'
import { Route as SettingsLogsImport } from './routes/settings/logs'
import { Route as SettingsConfigureImport } from './routes/settings/configure'

// Create/Update Routes

const SensorsRoute = SensorsImport.update({
  id: '/sensors',
  path: '/sensors',
  getParentRoute: () => rootRoute,
} as any)

const RelaysRoute = RelaysImport.update({
  id: '/relays',
  path: '/relays',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsIndexRoute = SettingsIndexImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsLogsRoute = SettingsLogsImport.update({
  id: '/settings/logs',
  path: '/settings/logs',
  getParentRoute: () => rootRoute,
} as any)

const SettingsConfigureRoute = SettingsConfigureImport.update({
  id: '/settings/configure',
  path: '/settings/configure',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/relays': {
      id: '/relays'
      path: '/relays'
      fullPath: '/relays'
      preLoaderRoute: typeof RelaysImport
      parentRoute: typeof rootRoute
    }
    '/sensors': {
      id: '/sensors'
      path: '/sensors'
      fullPath: '/sensors'
      preLoaderRoute: typeof SensorsImport
      parentRoute: typeof rootRoute
    }
    '/settings/configure': {
      id: '/settings/configure'
      path: '/settings/configure'
      fullPath: '/settings/configure'
      preLoaderRoute: typeof SettingsConfigureImport
      parentRoute: typeof rootRoute
    }
    '/settings/logs': {
      id: '/settings/logs'
      path: '/settings/logs'
      fullPath: '/settings/logs'
      preLoaderRoute: typeof SettingsLogsImport
      parentRoute: typeof rootRoute
    }
    '/settings/': {
      id: '/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/relays': typeof RelaysRoute
  '/sensors': typeof SensorsRoute
  '/settings/configure': typeof SettingsConfigureRoute
  '/settings/logs': typeof SettingsLogsRoute
  '/settings': typeof SettingsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/relays': typeof RelaysRoute
  '/sensors': typeof SensorsRoute
  '/settings/configure': typeof SettingsConfigureRoute
  '/settings/logs': typeof SettingsLogsRoute
  '/settings': typeof SettingsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/relays': typeof RelaysRoute
  '/sensors': typeof SensorsRoute
  '/settings/configure': typeof SettingsConfigureRoute
  '/settings/logs': typeof SettingsLogsRoute
  '/settings/': typeof SettingsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/relays'
    | '/sensors'
    | '/settings/configure'
    | '/settings/logs'
    | '/settings'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/relays'
    | '/sensors'
    | '/settings/configure'
    | '/settings/logs'
    | '/settings'
  id:
    | '__root__'
    | '/'
    | '/relays'
    | '/sensors'
    | '/settings/configure'
    | '/settings/logs'
    | '/settings/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  RelaysRoute: typeof RelaysRoute
  SensorsRoute: typeof SensorsRoute
  SettingsConfigureRoute: typeof SettingsConfigureRoute
  SettingsLogsRoute: typeof SettingsLogsRoute
  SettingsIndexRoute: typeof SettingsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  RelaysRoute: RelaysRoute,
  SensorsRoute: SensorsRoute,
  SettingsConfigureRoute: SettingsConfigureRoute,
  SettingsLogsRoute: SettingsLogsRoute,
  SettingsIndexRoute: SettingsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/relays",
        "/sensors",
        "/settings/configure",
        "/settings/logs",
        "/settings/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/relays": {
      "filePath": "relays.tsx"
    },
    "/sensors": {
      "filePath": "sensors.tsx"
    },
    "/settings/configure": {
      "filePath": "settings/configure.tsx"
    },
    "/settings/logs": {
      "filePath": "settings/logs.tsx"
    },
    "/settings/": {
      "filePath": "settings/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
