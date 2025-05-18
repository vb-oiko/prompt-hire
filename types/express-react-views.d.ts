declare module "express-react-views" {
  interface EngineOptions {
    beautify?: boolean;
    transformViews?: boolean;
    babel?: any;
  }

  export function createEngine(options?: EngineOptions): any;
}
