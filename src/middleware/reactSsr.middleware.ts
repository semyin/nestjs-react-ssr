import { Request, Response, NextFunction } from 'express';
import { readFile } from 'fs/promises';
import viteDevServer from 'vavite/vite-dev-server';

async function reactSsrMiddleware(req: Request, res: Response, next: NextFunction) {
  // if API request, skip SSR
  if (req.url.startsWith('/api')) {
    return next();
  }
  
  const url = req.originalUrl;
  
  let html: string;
  let template: string;
  let render;
  
  try {
    if (viteDevServer) {
      template = await readFile('./index.html', 'utf-8');
      template = await viteDevServer.transformIndexHtml(url, template);
      render = (await viteDevServer.ssrLoadModule('./entry-server.tsx')).render;
    } else {
      template = await readFile('./dist/client/index.html', 'utf-8');
      render = (await import('../../entry-server')).render;
    }
    
    const rendered = await render(url);
    
    // add performance optimization response headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    
    html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');
   
    res.status(200).send(html);
  } catch (error) {
    console.error('SSR Error:', error);
    // return basic HTML when error
    res.status(500).send('<!DOCTYPE html><html><head><title>Error</title></head><body><h1>Server Error</h1></body></html>');
  }
}

export { reactSsrMiddleware };