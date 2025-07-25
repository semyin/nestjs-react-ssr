import { NestFactory } from "@nestjs/core";
import type { Express } from "express";
import express from 'express';
import { IncomingMessage, ServerResponse } from "node:http";
import { AppModule } from "./app.module";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Alternative to getting __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
	
bootstrap();

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	
	// Set static file directory
  app.useStaticAssets(join(__dirname, '..', 'client/assets'), {
		prefix: '/assets/'
	});

	// Set vite.svg as static file
  app.use('/vite.svg', express.static(join(__dirname, '..', 'client/vite.svg')));

	await app.init();

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
