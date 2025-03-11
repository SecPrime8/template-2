import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory storage for arguments
const debateArguments: Record<string, any[]> = {};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Log the request
    console.log("GET arguments request:", {
      id: params.id,
      method: request.method
    });

    // Return the arguments for this debate (or empty array if none exist)
    const debateArgs = debateArguments[params.id] || [];
    
    return NextResponse.json(debateArgs);
  } catch (error) {
    console.error("Error fetching arguments:", {
      error,
      id: params.id
    });

    return NextResponse.json(
      { error: "Failed to fetch arguments" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Log incoming request
    console.log("Incoming POST request:", {
      id: params.id,
      method: request.method
    });

    // Parse the body
    const body = await request.json();

    // Create new argument
    const newArgument = {
      id: Math.random().toString(36).substr(2, 9),
      content: body.content.trim(),
      userId: "user1",
      createdAt: new Date(),
      evidence: body.evidence,
      type: body.type
    };

    // Store the argument in our temporary storage
    if (!debateArguments[params.id]) {
      debateArguments[params.id] = [];
    }
    debateArguments[params.id].push(newArgument);

    // Log the successful creation
    console.log("New argument created:", {
      id: params.id,
      argument: newArgument
    });

    return NextResponse.json(newArgument, { status: 201 });
  } catch (error) {
    // Log the detailed error
    console.error("Error creating argument:", {
      error,
      id: params.id
    });

    return NextResponse.json(
      { error: "Failed to create argument. Please try again." },
      { status: 500 }
    );
  }
}
