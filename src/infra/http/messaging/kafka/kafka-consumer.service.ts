import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {


    constructor() {
        super({
            client: {
                clientId: 'notifications',
            brokers: ['square-cat-6486-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'c3F1YXJlLWNhdC02NDg2JHvugOSCWWrMAqmOw7kMQ7VLXiZtYqeCLdHCFzCgS5A',
                    password: 'QI-I9fqqhr9aw8AFicwWS4Z02ryCtJo5EKEgkgnZCZkncSbN8JoqPPmUitAwweURTKHcww=='

                },
                ssl: true,
            }
        })
    }

    async onModuleDestroy(){
        await this.close()
    }

}