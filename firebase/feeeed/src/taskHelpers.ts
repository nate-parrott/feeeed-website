export const getFunctionUrl = async (name: string, location = "us-central1") => {
    const { GoogleAuth } = require("google-auth-library");
    const gAuth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform"
    });
    const projectId = await gAuth.getProjectId();
  
    const url =
      "https://cloudfunctions.googleapis.com/v2beta/" +
      `projects/${projectId}/locations/${location}/functions/${name}`;
  
    const client = await gAuth.getClient();
    const res = await client.request({ url });
    const uri = res.data?.serviceConfig?.uri;
    if (!uri) {
      throw new Error(`Unable to retreive uri for function at ${url}`);
    }
  
    console.log("Function URL for Task:", name, uri);
  
    return uri;
  };
