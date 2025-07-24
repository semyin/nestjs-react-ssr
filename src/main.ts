import { NestFactory } from "@nestjs/core";
import type { Express } from "express";
import { IncomingMessage, ServerResponse } from "node:http";
import { AppModule } from "./app.module";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 在 ES Modules 中获取 __dirname 的替代方案
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

bootstrap();

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	
	await app.init();

	// 设置静态文件目录
  app.useStaticAssets(join(__dirname, '..', 'dist', 'client'));
	resolveHandler(await app.getHttpAdapter().getInstance());
}

let resolveHandler: (value: Express) => void;
let expressHandler: Express | Promise<Express> = new Promise((resolve) => {
	resolveHandler = resolve;
});

export default async function handler(
	request: IncomingMessage,
	reply: ServerResponse,
) {
	if (expressHandler instanceof Promise) {
		expressHandler = await expressHandler;
	}

	expressHandler(request, reply);
}
