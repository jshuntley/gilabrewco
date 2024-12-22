import type { APIRoute } from 'astro';

// Add type for Brewfather API response
interface BrewfatherReading {
  timestamp: string;
  temp: number;
  gravity: number;
  comment?: string;
  device?: string;
}

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  console.log("\n=== Brewfather API Endpoint Start ===");
  
  // Check environment variables
  const userId = import.meta.env.BREWFATHER_USER_ID;
  const apiKey = import.meta.env.BREWFATHER_API_KEY;

  console.log("Environment check:", {
    hasUserId: !!userId,
    hasApiKey: !!apiKey,
    userIdLength: userId?.length,
    apiKeyLength: apiKey?.length,
    envKeys: Object.keys(import.meta.env),
  });

  // Get the batch ID from the request URL
  const url = new URL(request.url);
  const batchId = url.searchParams.get('batchId');
  
  console.log("\nRequest details:", {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    searchParams: url.searchParams.toString(),
    batchId,
  });

  if (!batchId || batchId === 'null') {
    console.error('\nError: No batch ID provided or batch ID is null');
    return new Response(JSON.stringify({ error: 'Valid Brewfather batch ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Construct the Brewfather API URL with the correct endpoint
    const brewfatherUrl = new URL(`https://api.brewfather.app/v2/batches/${batchId}/readings`);
    
    console.log("\n=== Brewfather API Request Details ===");
    console.log("Target URL:", brewfatherUrl.toString());
    
    // Create base64 encoded auth string
    const authString = `${userId}:${apiKey}`;
    const auth = btoa(authString);
    
    console.log("\nAuth details:", {
      format: "Basic base64(userId:apiKey)",
      userIdPreview: `${userId.slice(0, 4)}...`,
      authHeaderPreview: `Basic ${auth.slice(0, 10)}...${auth.slice(-10)}`,
    });

    console.log("\nSending request to Brewfather...");
    
    const response = await fetch(brewfatherUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("\n=== Brewfather API Response ===");
    console.log("Status:", response.status, response.statusText);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response body:", errorText);
      throw new Error(`Brewfather API returned ${response.status}: ${response.statusText}`);
    }

    const rawData = (await response.json()) as BrewfatherReading[];
    
    if (!Array.isArray(rawData)) {
      throw new Error('Unexpected data format from Brewfather API');
    }

    console.log("Raw data from Brewfather:", rawData);

    const processedData = {
      timestamps: rawData.map((m) => new Date(m.timestamp).toLocaleString()),
      temperature: rawData.map((m) => m.temp),
      gravity: rawData.map((m) => m.gravity),
    };

    console.log("Processed data:", processedData);

    return new Response(JSON.stringify(processedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('API Error:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 