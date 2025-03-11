import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Welcome to the Parle API",
    version: "1.0.0",
    endpoints: {
      debates: {
        list: "GET /api/debates - List all debates",
        create: "POST /api/debates - Create a new debate",
        get: "GET /api/debates/[id] - Get a specific debate",
        arguments: {
          create: "POST /api/debates/[id]/arguments - Submit a new argument",
          list: "GET /api/debates/[id]/arguments - List all arguments for a debate"
        }
      }
    }
  });
} 