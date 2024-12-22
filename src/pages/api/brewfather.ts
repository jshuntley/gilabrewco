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
  const userId = import.meta.env.PUBLIC_BREWFATHER_USER_ID;
  const apiKey = import.meta.env.PUBLIC_BREWFATHER_API_KEY;

  const url = new URL(request.url);
  const batchId = url.searchParams.get('batchId');

  if (!userId || !apiKey) {
    return new Response(JSON.stringify({ 
      error: 'Brewfather credentials not configured',
      details: 'Environment variables are missing'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!batchId || batchId === 'null') {
    return new Response(JSON.stringify({ error: 'Valid Brewfather batch ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const brewfatherUrl = new URL(`https://api.brewfather.app/v2/batches/${batchId}/readings`);
    const authString = `${userId}:${apiKey}`;
    const auth = btoa(authString);

    const response = await fetch(brewfatherUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Brewfather data: ${response.statusText}`);
    }

    const rawData = await response.json() as BrewfatherReading[];
    
    if (!Array.isArray(rawData)) {
      throw new Error('Unexpected data format from Brewfather API');
    }

    return new Response(JSON.stringify(rawData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 