import { 
    AuthenticationResult, 
    ClientCredentialRequest, 
    ConfidentialClientApplication, 
    Configuration 
} from "@azure/msal-node";
import * as core from '@actions/core';

export default class Auth {
    private config: Configuration;
    private cca: ConfidentialClientApplication;

    constructor(clientId: string, clientSecret: string, tenantId: string) {
        this.config = {
            auth: {
                clientId,
                clientSecret,
                authority: `https://login.microsoftonline.com/${tenantId}/`
            }
        }
        this.cca = new ConfidentialClientApplication(this.config);
    }

    async getAccessToken(): Promise<string> {
        core.info("Getting access token..");

        try{
            const clientCredentialRequest: ClientCredentialRequest = {
                scopes: ["https://graph.microsoft.com/.default"],
                skipCache: true
            };
            const response: AuthenticationResult = await this.cca.acquireTokenByClientCredential(clientCredentialRequest);
            const accessToken: string = response?.accessToken;
            core.info("Got access token");
            // core.info(`Access token: ${accessToken}`);
            return accessToken;
        } catch (error) {
            core.error("Error in getAccessToken function.");
            core.error(error);
            core.setFailed(error.errorMessage);
            return null;
        }
    }
}