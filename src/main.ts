import { NestFactory } from "@nestjs/core";
import {
  NestFastifyApplication,
  FastifyAdapter,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { join } from "path";
import { connectToDatabase } from "./mongodb";
import { ConfigService } from "@nestjs/config";
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors();

  // Load environment variables from .env file
  // app.use(ConfigModule.forRoot());

  const configService = app.get(ConfigService);
  const mongodbURI = configService.get<string>("MONGODB_URI");
  console.log(`MONGODB_URI is ${mongodbURI}`);
  console.log(process.env.MONGODB_URI);

  await connectToDatabase();

  app.useStaticAssets({
    root: join(__dirname, "..", "public"),
    prefix: "/public/",
  });
  app.setViewEngine({
    engine: {
      handlebars: require("handlebars"),
    },
    templates: join(__dirname, "..", "views"),
  });

  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(
    3000
    // If you want to accept connections on other hosts, you should specify '0.0.0.0'
  );
}

bootstrap();
