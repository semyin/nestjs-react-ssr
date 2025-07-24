import { Controller, Get, Req, Request } from "@nestjs/common";
import viteDevServer from "vavite/vite-dev-server";
import { readFile } from 'fs/promises';

@Controller()
export class AppController {
	@Get("/views/*")
	async home(@Req() request: Request) {
		let html: string;
		
		let template: string;
		/** @type {import('./src/entry-server.ts').render} */
		let render;
		if (viteDevServer) {
			template = await readFile('./index.html', 'utf-8')
			template = await viteDevServer.transformIndexHtml(request.url, template)
			render = (await viteDevServer.ssrLoadModule('./entry-server.tsx')).render
		} else {
			template = await readFile('./dist/client/index.html', 'utf-8')
      render = (await import('../entry-server')).render
		}
		const rendered = await render(request.url)
		html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

		return html;
	}
}
