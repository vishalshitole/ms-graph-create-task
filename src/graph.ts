import "isomorphic-fetch";
import { AuthProvider, Client, Options } from "@microsoft/microsoft-graph-client";
import { Event, PlannerTask } from "@microsoft/microsoft-graph-types";
import Auth from './auth';
import * as core from '@actions/core';

export default class Graph {

    private auth: Auth;

    constructor(clientId: string, clientSecret: string, tenantId: string) {
        this.auth = new Auth(clientId, clientSecret, tenantId);
    };

    async createTask(task: PlannerTask): Promise<any> {
        const client: Client = await this.getClient();

        if (client) {
            core.info("Creating task...");
            try {
                const result: any = await client
                    .api(`/planner/tasks`)
                    .post(task);

                if (result) {
                    core.info("Task created");
                    console.log(result);
                } else {
                    core.warning("There was an error creating the task");
                }
                return result;
            } catch (error) {
                core.error("Error in createTask function.");
                core.error(error);
                core.setFailed(error);
                return null;
            }
        }
        return null;
    };

    //get graph client
    private async getClient(): Promise<Client> {
        const accessToken: string = await this.auth.getAccessToken();
        if (accessToken) {
            const authProvider: AuthProvider = (done) => {
                done(null, accessToken)
            };
            const options: Options = {
                authProvider
            };
            const client: Client = Client.init(options);
            return client;
        }
        return null;
    };
}