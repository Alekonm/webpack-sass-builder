type BuildMode = 'development' | 'production';

export interface BuildEnv {
  mode: BuildMode;
  port: number;
}
export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  src: string;
  nodeModules: string;
}
export interface BuildOptions {
  mode: BuildMode;
  isDev: boolean;
  port: number;
  paths: BuildPaths;
  version: string;
}
