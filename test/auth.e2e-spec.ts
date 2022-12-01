import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();
	});

	it('/auth/login (POST) - SUCCESS', async (done) => {
		let loginDto: AuthDto = {
			login: 'Stefan1',
			password: '12342'
		};

		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				const token: string = body.access_token;
				expect(token).toBeDefined();
				done();
			});
	});

	it('/auth/login (POST) - FAIL', () => {
		let loginDto: AuthDto = {
			login: 'Stefan1',
			password: '1234'
		};

		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(401);
	});

	it('/auth/login (POST) - FAIL', () => {
		let loginDto: AuthDto = {
			login: 'Stefan',
			password: '12342'
		};

		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(401);
	});

	afterAll(() => {
		disconnect();
	});

});
