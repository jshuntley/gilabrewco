import type { APIRoute } from 'astro';

interface BrewfatherReading {
  type: string;
  id: string;
  temp: number;
  comment?: string;
  time: number;
  sg: number;
  pressure: number;
}

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  console.log("\n=== Brewfather API Endpoint Start ===");
  
  // Check environment variables
  const userId = import.meta.env.BREWFATHER_USER_ID;
  const apiKey = import.meta.env.BREWFATHER_API_KEY;

  // Safe logging that won't break if env vars are undefined
  console.log("Environment check:", {
    hasUserId: Boolean(userId),
    hasApiKey: Boolean(apiKey),
    userIdLength: userId?.length || 0,
    apiKeyLength: apiKey?.length || 0,
  });

  // Get the batch ID from the request URL
  const url = new URL(request.url);
  const batchId = url.searchParams.get('batchId');
  
  console.log("\nRequest details:", {
    url: request.url,
    method: request.method,
    searchParams: url.searchParams.toString(),
    batchId,
  });

  // Early return if missing required data
  if (!userId || !apiKey) {
    console.error('Missing Brewfather credentials');
    return new Response(JSON.stringify({ 
      error: 'Brewfather credentials not configured',
      details: 'Environment variables are missing'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!batchId || batchId === 'null') {
    console.error('No batch ID provided or batch ID is null');
    return new Response(JSON.stringify({ error: 'Valid Brewfather batch ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Construct the Brewfather API URL
    const brewfatherUrl = new URL(`https://api.brewfather.app/v2/batches/${batchId}/readings`);
    
    // Create base64 encoded auth string - only if we have both credentials
    const authString = `${userId}:${apiKey}`;
    const auth = btoa(authString);
    
    console.log("\nAuth details:", {
      format: "Basic base64(userId:apiKey)",
      userIdPreview: userId ? `${userId.slice(0, 4)}...` : 'missing',
      authHeaderPreview: auth ? `Basic ${auth.slice(0, 10)}...${auth.slice(-10)}` : 'missing'
    });

    const response = await fetch(brewfatherUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("\n=== Brewfather API Response ===");
    console.log("Status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brewfather error:', errorText);
      throw new Error(`Failed to fetch Brewfather data: ${response.statusText}`);
    }

    const rawData = await response.json() as BrewfatherReading[];
    
    if (!Array.isArray(rawData)) {
      throw new Error('Unexpected data format from Brewfather API');
    }

    console.log("Raw data from Brewfather:", rawData);

    return new Response(JSON.stringify(rawData), {
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