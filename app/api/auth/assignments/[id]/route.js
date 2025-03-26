import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Get user Assignments
export async function GET(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const assignment = await Assignment.findById(params.id).populate("user");

    if (!Assignment) {
      return NextResponse.json({ message: "Assignment not found" }, { status: 404 });
    }

    return NextResponse.json({ assignment }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Edit Assignment
export async function PUT(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const update = await req.json();
    const updatedAssignment = await Assignment.findByIdAndUpdate(params.id, update, { new: true });

    if (!updatedAssignment) {
      return NextResponse.json({ message: "Assignment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Assignment updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete Assignment
export async function DELETE(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const { userId } = await req.json();
    const deletedAssignment = await Assignment.findByIdAndDelete(params.id);

    if (!deletedAssignment) {
      return NextResponse.json({ message: "Assignment not found" }, { status: 404 });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { Assignments: params.id }
    });

    return NextResponse.json({ message: "Assignment deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}