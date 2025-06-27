type GlobalStore = Record<string, unknown>;

const globals: GlobalStore = {};

export function setGlobal<T>(key: string, value: T): void {
  // console.log(`Setting global key: ${key}`, value);
  globals[key] = value;
}

export function getGlobal<T>(key: string): T | undefined {
  console.log(Object.keys(globals));

  return globals[key] as T | undefined;
}

export function hasGlobal(key: string): boolean {
  return key in globals;
}

export function removeGlobal(key: string): void {
  delete globals[key];
}
