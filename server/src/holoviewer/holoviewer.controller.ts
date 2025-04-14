import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { HoloviewerService } from './holoviewer.service';

@Controller('holoviewer')
export class HoloviewerController {
  constructor(private readonly holoviewerService: HoloviewerService) {}

  @Get()
  checkService() {
    return '/:ok';
  }

  @Get('preview')
  async preview(@Query('originalName') originalName: string, @Query('downloadUrl') downloadUrl: string, @Res() res: Response) {
    try {
      // 这里应该实现实际的3D预览逻辑
      // 目前只是一个示例，返回一个简单的HTML页面
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>3D Viewer - ${originalName}</title>
          <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            .container { display: flex; flex-direction: column; height: 100vh; }
            .header { background: #333; color: white; padding: 10px; }
            .content { flex: 1; display: flex; justify-content: center; align-items: center; }
            .placeholder { text-align: center; }
            .placeholder h2 { margin-bottom: 20px; }
            .placeholder p { color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>3D Viewer</h1>
            </div>
            <div class="content">
              <div class="placeholder">
                <h2>3D Preview for: ${originalName}</h2>
                <p>This is a placeholder for the actual 3D viewer.</p>
                <p>Download URL: ${downloadUrl}</p>
                <p>In a real implementation, this would load a 3D model viewer.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      console.error('Error in 3D preview:', error);
      res.status(500).send('Error generating 3D preview');
    }
  }
} 