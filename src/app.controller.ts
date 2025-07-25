import { Controller, Get, Req, Request } from "@nestjs/common";

@Controller()
export class AppController {

	@Get("/api/hello")
	async hello() {
		return {
			msg: 'hello world'
		}
	}
}
