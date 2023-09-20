import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart';
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { randomUUID } from "node:crypto";
import { prisma } from "../lib/prisma";

const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_848_576 * 25, // 25mb
        }
    })

    app.post('/videos', async (request, response) => {
        const data = await request.file()

        if (!data) {
            return response.status(400).send({ error: 'Missing file input.' })
        }

        const extension = path.extname(data.filename);

        if (extension !== '.mp3') {
            return response.status(400).send({ error: 'Invalid input type, please upload a MP3.' })
        }

        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))
    })
}