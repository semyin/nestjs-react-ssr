import { Request, Response, NextFunction } from 'express';
import { readFile } from 'fs/promises';
import viteDevServer from 'vavite/vite-dev-server';

async function reactSsrMiddleware(req: Request, res: Response, next: NextFunction) {
  // 如果是 API 请求，跳过 SSR 处理
  if (req.url.startsWith('/api')) {
    return next();
  }
  
  const url = req.originalUrl;
  console.log('reactSsrMiddleware', req.originalUrl);
  
  let html: string;
  let template: string;
  let render;
  
  if (viteDevServer) {
    template = await readFile('./index.html', 'utf-8');
    template = await viteDevServer.transformIndexHtml(url, template);
    render = (await viteDevServer.ssrLoadModule('./entry-server.tsx')).render;
  } else {
    template = await readFile('./dist/client/index.html', 'utf-8');
    render = (await import('../../entry-server')).render;
  }
  
  const rendered = await render(url);
  html = template
    .replace(`<!--app-head-->`, rendered.head ?? '')
    .replace(`<!--app-html-->`, rendered.html ?? '');
 
  res.send(html);
}

export { reactSsrMiddleware };