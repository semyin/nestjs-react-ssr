import { Controller, Get, Req, Request } from "@nestjs/common";

@Controller()
export class AppController {

	@Get("/api/hello")
	async hello() {
		return {
			msg: 'hello world'
		}
	}

	@Get("/api/home")
	async home() {
		return {
			msg: 'this is home page data from backend'
		}
	}

	@Get("/api/about")
	async about() {
		return {
			msg: 'Another page about data from backend'
		}
	}
}
