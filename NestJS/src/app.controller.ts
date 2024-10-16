import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NoAuth } from './guard/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @NoAuth()
  // @Render('index')
  getHello(@Res() res: Response) {
  }
}
