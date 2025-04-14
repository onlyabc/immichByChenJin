import { Module } from '@nestjs/common';
import { HoloviewerController } from './holoviewer.controller';
import { HoloviewerService } from './holoviewer.service';

@Module({
  controllers: [HoloviewerController],
  providers: [HoloviewerService],
  exports: [HoloviewerService],
})
export class HoloviewerModule {} 