import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Your code hit the service."', () => {
      const res = {
        render: jest.fn(() => 'Your code hit the service.'),
      } as any;
      const result = appController.root(res);
      expect(result).toBeDefined();
      expect(result).toBe('Your code hit the service.');
    });
  });
});
