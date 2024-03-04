import { DecodedMap } from './sourcemap/decoder'
import type { ModuleCache } from './types'
import { decodeBase64, isWindows } from './utils'

let SOURCEMAPPING_URL = 'sourceMa'
SOURCEMAPPING_URL += 'ppingURL'

const VITE_RUNTIME_SOURCEMAPPING_URL = `${SOURCEMAPPING_URL}=data:application/json;charset=utf-8`
const VITE_RUNTIME_SOURCEMAPPING_REGEXP = new RegExp(
  `//# ${VITE_RUNTIME_SOURCEMAPPING_URL};base64,(.+)`,
)

export class ModuleCacheMap extends Map<string, ModuleCache> {
  private root: string

  constructor(root: string, entries?: [string, ModuleCache][]) {
    super(entries)
    this.root = withTrailingSlash(root)
  }

  normalize(fsPath: string): string {
    return normalizeModuleId(fsPath, this.root)
  }

  /**
   * Assign partial data to the map
   */
  update(fsPath: string, mod: ModuleCache): this {
    fsPath = this.normalize(fsPath)
    if (!super.has(fsPath)) this.setByModuleId(fsPath, mod)
    else Object.assign(super.get(fsPath) as ModuleCache, mod)
    return this
  }

  setByModuleId(modulePath: string, mod: ModuleCache): this {
    return super.set(modulePath, mod)
  }

  override set(fsPath: string, mod: ModuleCache): this {
    return this.setByModuleId(this.normalize(fsPath), mod)
  }

  getByModuleId(modulePath: string): ModuleCache {
    if (!super.has(modulePath)) this.setByModuleId(modulePath, {})

    const mod = super.get(modulePath)!
    if (!mod.imports) {
      Object.assign(mod, {
        imports: new Set(),
        importers: new Set(),
      })
    }
    return mod as ModuleCache
  }

  override get(fsPath: string): ModuleCache {
    return this.getByModuleId(this.normalize(fsPath))
  }

  deleteByModuleId(modulePath: string): boolean {
    return super.delete(modulePath)
  }

  override delete(fsPath: string): boolean {
    return this.deleteByModuleId(this.normalize(fsPath))
  }

  /**
   * Invalidate modules that dependent on the given modules, up to the main entry
   */
  invalidateDepTree(
    ids: string[] | Set<string>,
    invalidated = new Set<string>(),
  ): Set<string> {
    for (const _id of ids) {
      const id = this.normalize(_id)
      if (invalidated.has(id)) continue
      invalidated.add(id)
      const mod = super.get(id)
      if (mod?.importers) this.invalidateDepTree(mod.importers, invalidated)
      super.delete(id)
    }
    return invalidated
  }

  /**
   * Invalidate dependency modules of the given modules, down to the bottom-level dependencies
   */
  invalidateSubDepTree(
    ids: string[] | Set<string>,
    invalidated = new Set<string>(),
  ): Set<string> {
    for (const _id of ids) {
      const id = this.normalize(_id)
      if (invalidated.has(id)) continue
      invalidated.add(id)
      const subIds = Array.from(super.entries())
        .filter(([, mod]) => mod.importers?.has(id))
        .map(([key]) => key)
      subIds.length && this.invalidateSubDepTree(subIds, invalidated)
      super.delete(id)
    }
    return invalidated
  }

  getSourceMap(moduleId: string): null | DecodedMap {
    const mod = this.get(moduleId)
    if (mod.map) return mod.map
    if (!mod.meta || !('code' in mod.meta)) return null
    const mapString = mod.meta.code.match(
      VITE_RUNTIME_SOURCEMAPPING_REGEXP,
    )?.[1]
    if (!mapString) return null
    const baseFile = mod.meta.file || moduleId.split('?')[0]
    mod.map = new DecodedMap(JSON.parse(decodeBase64(mapString)), baseFile)
    return mod.map
  }
}

function withTrailingSlash(path: string): string {
  if (path[path.length - 1] !== '/') {
    return `${path}/`
  }
  return path
}

// unique id that is not available as "$bare_import" like "test"
const prefixedBuiltins = new Set(['node:test'])

// transform file url to id
// virtual:custom -> virtual:custom
// \0custom -> \0custom
// /root/id -> /id
// /root/id.js -> /id.js
// C:/root/id.js -> /id.js
// C:\root\id.js -> /id.js
function normalizeModuleId(file: string, root: string): string {
  if (prefixedBuiltins.has(file)) return file

  // unix style, but Windows path still starts with the drive letter to check the root
  let unixFile = file
    .replace(/\\/g, '/')
    .replace(/^\/@fs\//, isWindows ? '' : '/')
    .replace(/^node:/, '')
    .replace(/^\/+/, '/')

  if (unixFile.startsWith(root)) {
    // keep slash
    unixFile = unixFile.slice(root.length - 1)
  }

  // if it's not in the root, keep it as a path, not a URL
  return unixFile.replace(/^file:\//, '/')
}
